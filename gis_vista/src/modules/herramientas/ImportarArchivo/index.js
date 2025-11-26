import React, { useState, useEffect } from 'react';
import AutoCompleteCapas from '../../global/components/AutoCompleteCapas';
import classnames from 'classnames';
import ButtonAction from '../../global/components/ButtonAction';
import ProgressBarAnimated from '../../global/components/ProgressbarAnimated';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../lib/alerts';
import { type } from '../../global/values';
import { FileImport } from '../../../lib/icons';
import { withStore } from '../../../pages/Mapa/store/Store';
import { Mutation } from "react-apollo";

import {
    LISTA_FORMATO,
    EXTENSION_FORMATO,
    archivoInicial
} from './values';

import { IMPORTAR_CAPA } from './mutatios';

const capaInputId = 'capaImportar';

const ImportarArchivo = ({ capa, storeContext: { map } }) => {

    const [capaSeleccionada, setCapaSeleccionada] = useState(capa);

    // IMPORTAR
    const [archivo, setArchivo] = useState(null);

    // EXPORTAR
    const [formato] = useState(LISTA_FORMATO[0].id);
    const [urlArchivo, setUrlArchivo] = useState(null);
    const [archivoExportar, setArchivoExportar] = useState(archivoInicial);

    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [srid, setSrid] = useState("4326");
    useEffect(() => {
        setCapaSeleccionada(capa);
    }, [capa]);


    function handleCapaSelect(e) {
        const capaSel = map.getCapaById(e.value.id);
        setCapaSeleccionada(capaSel);
    }

    function handleCapaChange() {
        setCapaSeleccionada(null);
    }

    // ---------------------------
    // ARCHIVO A IMPORTAR
    // ---------------------------

    function handleArchivoChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        const maxSize = 2 * 1024 * 1024; // 5 MB en bytes
        if (file.size > maxSize) {
            setMensaje({
                texto: 'El archivo supera el límite de 2 MB.',
                tipo: TIPO_ALERTA.ADVERTENCIA
            });
            return; 
        }

        setArchivo(file);

        setMensaje({
            texto: 'Archivo seleccionado: ' + file.name,
            tipo: TIPO_ALERTA.INFORMACION
        });
    }


    // ---------------------------
    // CONVERTIR CSV → JSON
    // ---------------------------

    function csvToJson(csvText) {
        const lineas = csvText.split("\n").filter(l => l.trim() !== "");
        // Limpia comillas de los headers
        const headers = lineas[0]
            .split(",")
            .map(h => h.trim().replace(/^"|"$/g, ''));

        const data = lineas.slice(1).map(line => {
            const values = line.split(",").map(v => v.trim().replace(/^"|"$/g, ''));
            const obj = {};
            headers.forEach((h, i) => {
                obj[h] = values[i] === "" ? null : values[i];
            });
            return obj;
        });

        return data;
    }


    // ---------------------------
    // SUBMIT IMPORTAR (Mutation)
    // ---------------------------

    async function handleSubmitImportar(e, importarCapa) {
        e.preventDefault();

        setMensaje(mensajeInicial);

        if (!capaSeleccionada) {
            setMensaje({ texto: 'Seleccione una capa.', tipo: TIPO_ALERTA.ADVERTENCIA });
            return;
        }

        if (!archivo) {
            setMensaje({ texto: 'Seleccione un archivo para importar.', tipo: TIPO_ALERTA.ADVERTENCIA });
            return;
        }

        try {
            setCargando(true);

            const text = await archivo.text();
            const jsonData = csvToJson(text);
            await importarCapa({
                variables: {
                    capaId: parseInt(capaSeleccionada.get("id")),
                    data: jsonData,
                    srid: parseInt(srid)
                }
            });

        } catch (error) {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        } finally {
            setCargando(false);
        }
    }

    const capaInputText = capaSeleccionada ? capaSeleccionada.get('nombre') : '';

    return (
        <div className="p-2">

            <Mutation
                mutation={IMPORTAR_CAPA}
                onCompleted={(resp) => {

                    if (resp.sistema.importarCapa.ok) {
                        setMensaje({
                            texto: resp.sistema.importarCapa.mensaje,
                            tipo: TIPO_ALERTA.EXITO
                        });
                    } else {
                        setMensaje({
                            texto: resp.sistema.importarCapa.mensaje,
                            tipo: TIPO_ALERTA.ADVERTENCIA
                        });
                    }

                }}
                onError={(err) => {
                    setMensaje({ texto: err.message, tipo: TIPO_ALERTA.ERROR });
                }}
            >
                {(importarCapa, { loading }) => (
                    <form onSubmit={(e) => handleSubmitImportar(e, importarCapa)}>
                        <div className="mb-2">
                            <label htmlFor="sridSelect">Tipo de coordenadas</label>
                            <select
                                id="sridSelect"
                                className="form-control"
                                value={srid}
                                onChange={(e) => setSrid(e.target.value)}
                            >
                                <option value="4326">EPSG:4326 (Lat/Lon)</option>
                                <option value="32717">EPSG:32717 (UTM Zona 17S)</option>
                            </select>
                        </div>

                        <AutoCompleteCapas
                            value={capaInputText}
                            inputId={capaInputId}
                            inputClassName={classnames({ 'is-invalid': !capaSeleccionada })}
                            onSelect={handleCapaSelect}
                            onChange={handleCapaChange}
                            autoFocus={true}
                        />

                        {/* INPUT ARCHIVO */}
                        <div className="mb-2">
                            <label htmlFor="fileInput" className="upload-btn grupo-item">
                                <i className="fa fa-upload"></i> Seleccionar archivo
                            </label>

                            <input
                                id="fileInput"
                                type="file"
                                accept=".csv"
                                style={{ display: 'none' }}
                                onChange={handleArchivoChange}
                            />
                        </div>

                        {mensaje.texto && (
                            <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>
                        )}

                        <ButtonAction
                            type={type.submit}
                            title="Importar"
                            className="btn btn-sm btn-primary mb-2"
                        >
                            <FileImport /> Guardar
                        </ButtonAction>

                        {(cargando || loading) && (
                            <ProgressBarAnimated titulo="Procesando..." />
                        )}
                    </form>
                )}
            </Mutation>
        </div>
    );
};

export default withStore(ImportarArchivo);
