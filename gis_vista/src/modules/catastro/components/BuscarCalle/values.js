import React from 'react';
import ButtonAction from '../../../global/components/ButtonAction';
import { type } from '../../../global/values';
import { PlaneIcon } from '../../../../lib/icons';
import { LABEL_LOCALIZAR } from '../../../values';

export const MSJ_CALLE_NO_SE_LOCALIZO = 'La calle no se pudo localizar';
// PLACEHOLDER
export const PCHR_INGRESAR_CALLE = 'Ingrese nombre de la calle';
export const generarColumnasPaCalles = (handleSearchButtonClick) => [
    {
        headerName: "Nombre",
        field: "nombre",
        width: 325,
        minWidth: 325
    },
    {
        headerName: "Opción",
        width: 80,
        minWidth: 80,
        cellClass: 'text-md-center',
        cellRendererFramework: (params) => {
            return (<ButtonAction type={type.button} title={LABEL_LOCALIZAR} className={"btn btn-sm btn-link text-body"}
                onClickButton={handleSearchButtonClick.bind(null, params.data.id)}>
                <PlaneIcon />
            </ButtonAction>);
        }
    }
];