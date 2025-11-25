import React from 'react';
import { LABEL_TIPO_RECLAMO, LABEL_ESTADO_RECLAMO } from '../values';
import { LISTA_TIPO_RECLAMO_PROBLEMAS, LISTA_ESTADO_RECLAMO_PROBLEMAS } from '../FAReclamos/queries';
import AutocompleteWithQuery from './AutocompleteWithQuery';
import Calendar from '../../../global/components/Calendar';

export default ({ tipoReclamo, estadoReclamo, onChange, periodoRegistroFechaInf, periodoRegistroFechaSup }) => {

    return (
        <div className="form">
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_TIPO_RECLAMO}</label>
                <AutocompleteWithQuery
                    query={LISTA_TIPO_RECLAMO_PROBLEMAS}
                    valuesProperty="operaciones.listaTipoReclamoProblema"
                    name="tipoReclamo"
                    value={tipoReclamo}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_ESTADO_RECLAMO}</label>
                <AutocompleteWithQuery
                    query={LISTA_ESTADO_RECLAMO_PROBLEMAS}
                    valuesProperty="operaciones.listaEstadoReclamoProblema"
                    name="estadoReclamo"
                    value={estadoReclamo}
                    onChange={onChange}
                />
            </div>
            <label className="font-weight-bold">Fecha de registro</label>
            <div className="form-row">
                <div className="form-group col-6">
                    <label className="font-weight-bold">Entre</label>
                    <Calendar
                        name="periodoRegistroFechaInf"
                        value={periodoRegistroFechaInf}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group col-6">
                    <label className="font-weight-bold">Hasta</label>
                    <Calendar
                        name="periodoRegistroFechaSup"
                        value={periodoRegistroFechaSup}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
}