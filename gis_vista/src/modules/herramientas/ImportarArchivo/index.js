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

    useEffect(() => {
        setCapaSeleccionada(capa);
    }, [capa]);

    // ---------------------------
    // CAPA
    // ---------------------------

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
        const headers = lineas[0].split(",").map(h => h.trim());

        const data = lineas.slice(1).map(line => {
            const values = line.split(",").map(v => v.trim());
            const obj = {};
            headers.forEach((h, i) => {
                obj[h] = values[i] ?? null;
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

            console.log("JSON a enviar:", jsonData);

            await importarCapa({
                variables: {
                    capaId: parseInt(capaSeleccionada.get("id")),
                    data: jsonData
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
                    console.log(resp)
                    setMensaje({
                        texto:resp.sistema.importarCapa.mensaje,
                        tipo: TIPO_ALERTA.EXITO
                    });
                }}
                onError={(err) => {
                    setMensaje({ texto: err.message, tipo: TIPO_ALERTA.ERROR });
                }}
            >
                {(importarCapa, { loading }) => (
                    <form onSubmit={(e) => handleSubmitImportar(e, importarCapa)}>

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
