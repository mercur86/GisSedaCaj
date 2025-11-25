import { useState, useEffect } from 'react';

export const labelPattern = /^(label)\d?$/;
const addPixelUnits = (str) => `${str}px`;
const removePixelUnits = (str) => str.slice(0, -2);

export const serializeEnv = ({
    stroke,
    strokeWidth,
    fill,
    fillOpacity,
    mark,
    markSize,
    label,
    fontSize,
    bold,
    italic,
    labelOffset
}) => {
    const envObj = {};
    if (stroke) Object.assign(envObj, { stroke: `#${stroke}` });
    if (strokeWidth) Object.assign(envObj, { strokeWidth: addPixelUnits(strokeWidth) });
    if (fill) Object.assign(envObj, { fill: `#${fill}` });
    if (fillOpacity) Object.assign(envObj, { fillOpacity: parseFloat((fillOpacity / 100).toFixed(2)) });
    if (mark) Object.assign(envObj, { mark });
    if (markSize) Object.assign(envObj, { markSize: addPixelUnits(markSize) });
    if (label) Object.assign(envObj, { ...label });
    if (fontSize) Object.assign(envObj, { fontSize: addPixelUnits(fontSize) });
    if (bold) Object.assign(envObj, { fontWeight: bold ? 'bold' : 'normal' });
    if (italic) Object.assign(envObj, { fontStyle: italic ? 'italic' : 'normal' });
    if (labelOffset) Object.assign(envObj, { labelOffset: addPixelUnits(labelOffset) });

    return Object.entries(envObj).map(p => p.join(':')).join(';');
};

export const unserializeEnv = (env = '') => {
    /* 
        le da a la configuración de la variable de entorno del servidor,
        el formato que se usan dentro del componente 'Estilos'
    */
    let initEnvObj = env;
    if (typeof initEnvObj === 'string') {
        initEnvObj = env.split(';').map(p => p.split(':')).reduce((acc, [key, value]) => {
            if (labelPattern.test(key)) return { ...acc, label: { ...acc.label, [key]: value } }
            return { ...acc, [key]: value }
        }, {});
    }
    const {
        stroke,
        strokeWidth,
        fill,
        fillOpacity,
        mark,
        markSize,
        label,
        fontSize,
        fontStyle,
        fontWeight,
        labelOffset
    } = initEnvObj;

    const envObj = {};

    if (stroke) Object.assign(envObj, { stroke: stroke.slice(1) });
    if (strokeWidth) Object.assign(envObj, { strokeWidth: removePixelUnits(strokeWidth) });
    if (fill) Object.assign(envObj, { fill: fill.slice(1) });
    if (fillOpacity) Object.assign(envObj, { fillOpacity: parseInt(fillOpacity * 100) });
    if (mark) Object.assign(envObj, { mark });
    if (markSize) Object.assign(envObj, { markSize: removePixelUnits(markSize) });
    if (label) Object.assign(envObj, { label });
    if (fontSize) Object.assign(envObj, { fontSize: removePixelUnits(fontSize) });
    if (fontWeight) Object.assign(envObj, { bold: fontWeight === 'bold' });
    if (fontStyle) Object.assign(envObj, { italic: fontStyle === 'italic' });
    if (labelOffset) Object.assign(envObj, { labelOffset: removePixelUnits(labelOffset) });
    return envObj;
}

// custom Hook 2
const initialStateEnvConfigHook = { loading: true, error: null, data: null };

export const useGetStyleEnvConfiguration = (gslayer, styleName) => {
    const [state, setState] = useState(initialStateEnvConfigHook);
    useEffect(() => {
        setState(initialStateEnvConfigHook);
        getEnvConfigDeEstilo(gslayer, styleName)
            .then(serverEnvConfig => {
                const fmtdServerEnvConfig = unserializeEnv(serverEnvConfig),
                    fmtdLocalEnvConfig = unserializeEnv(gslayer.get('estilos')[styleName]);
                const envConfig = { ...fmtdServerEnvConfig, ...fmtdLocalEnvConfig };
                setState(prevState => ({ ...prevState, loading: false, data: { envConfig } }))
            })
            .catch(error => setState(prevState => ({ ...prevState, loading: false, error })));

    }, [gslayer, styleName]);
    return state;
};

// Hook 2 helper functions
const getEnvConfigDeEstilo = (gslayer, style) => {
    const styleURL = gslayer.getSource().getUrls()[0].replace(/(wms)/, 'rest').concat(`/styles/${style}.css`);
    const req = new Request(styleURL);
    return fetch(req)
        .then(res => res.text())
        .then(parseEstilo);
};

const parseEstilo = (styleDefinition) => {
    const declarationPattern = /env\([^()]*\)/g,
        keyValuePattern = /\('([^,']+)'[ ]*,[ ]*'?([^,']+)'?\)/;
    const envDeclarations = styleDefinition.match(declarationPattern) || [];
    const keyValuePairs = envDeclarations.map(dec => dec.match(keyValuePattern).slice(1))
    const envObj = keyValuePairs.reduce((acc, [key, value]) => {
        if (labelPattern.test(key)) return { ...acc, label: { ...acc.label, [key]: value } }
        return { ...acc, [key]: value }
    }, {});
    return envObj;
}

// custom Hook 1
export const useLayerInfo = (gslayer) => {
    const [state, setState] = useState(hook1InitialState);
    useEffect(() => {
        setState(hook1InitialState);
        gslayer.getDefinition()
            .then(lyDef => {
                return gslayer.getFeatureTypeDescription()
                    .then(lyAttrs => {
                        const { properties } = lyAttrs.featureTypes[0];
                        return { layerDefinition: lyDef.layer, properties };
                    });
            })
            .then(response => {
                setState(prevState => ({ ...prevState, loading: false, data: response }))
            })
            .catch(error => setState(prevState => ({ ...prevState, loading: false, error })));
    }, [gslayer])

    return state;
};

// Hook 1 helper functions
const hook1InitialState = {
    loading: true,
    error: null,
    data: null
};