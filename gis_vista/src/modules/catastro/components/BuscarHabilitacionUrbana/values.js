import React from 'react';
import ButtonAction from "../../../global/components/ButtonAction";
import { PlaneIcon } from "../../../../lib/icons";
import { type } from '../../../global/values';
import { LABEL_LOCALIZAR } from '../../../values';

export const MSJ_HABILITACION_URBANA_NO_SE_LOCALIZO = 'La habilitacion urbana no se pudo localizar';

export const PCHR_INGRESAR_HABILITACION_URBANA = 'Ingrese nombre de la habilitación urbana';

export const generarColumnasPaHabilitacionesUrbanas = (handleSearchButtonClick) => [
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