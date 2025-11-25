import React from 'react';
import { Clipboard } from '../../../../lib/icons';

export const LABEL_NOTA_REPORTES = 'Los resultados de los reportes varían de acuerdo al contenido visible de la capa o los filtros que tenga.';

export const generarColumnasPaReportes = (history) => [
    {
        headerName: "Nombre",
        field: "titulo",
        width: 325,
        minWidth: 325
    },
    {
        headerName: "Opción",
        width: 80,
        minWidth: 80,
        cellClass: 'text-md-center',
        cellRendererFramework: (params) => {
            return (
                <button
                    className="btn btn-sm btn-link text-body"
                    title="Ver reporte"
                    onClick={() => {
                        history.push(`/reports/${params.data.id}`, params.data)
                    }}
                >
                    <Clipboard />
                </button>
            );
        }
    }
];