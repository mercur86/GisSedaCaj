import React, { useState } from "react";
import Select from "../../global/components/Select";
import { withStore } from "../../../pages/Mapa/store/Store";

const reportes = [
    {
        id: 1,
        variable: "Consumo",
        casos: [
            {
                idReporte: 1,
                elemento: "Usuarios",
                titulo: "Consumo de usuarios"
            },
            {
                idReporte: 2,
                elemento: "Habilitaciones Urbanas",
                titulo: "Consumo de habilitaciones urbanas"
            }
        ]
    }
]

const NuevoReporte = ({
    storeContext: { reportesEstadisticosApi, store }
}) => {

    const [variable, setVariable] = useState(1);
    const [idReporte, setIdReporte] = useState(1);
    const casos = reportes.find((r) => r.id === variable).casos;

    function handleOpenReport() {
        reportesEstadisticosApi.cerrarReporte(store.reportes.length - 1);
        const { idReporte: id, titulo } = casos.find(c => c.idReporte === parseInt(idReporte));
        reportesEstadisticosApi.abrirReporte({ id, titulo });
    }

    return (
        <div className="form">
            <div className="form-group">
                <label className="font-weight-bold">Variable</label>
                <Select
                    className="form-control form-control-sm"
                    lista={reportes}
                    nameFieldName="variable"
                    value={variable}
                    onChange={(e) => {
                        setVariable(e.target.value);
                    }} />
            </div>
            <div className="form-group">
                <label className="font-weight-bold">Elemento</label>
                <Select
                    className="form-control form-control-sm"
                    lista={casos}
                    valueFieldName="idReporte"
                    nameFieldName="elemento"
                    value={idReporte}
                    onChange={(e) => {
                        setIdReporte(e.target.value);
                    }} />
            </div>
            <button
                className="btn btn-primary btn-sm btn-block"
                onClick={handleOpenReport}>
                <i className="fas fa-play mr-2"></i>
                    Empezar
            </button>
        </div>
    );
}

export default withStore(NuevoReporte);