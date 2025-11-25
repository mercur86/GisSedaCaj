import React from 'react';
import { LISTA_PARAMETROS_CALIDAD } from '../FAPuntosControlCalidad/queries';
import AutocompleteWithQuery from './AutocompleteWithQuery';
import Calendar from '../../../global/components/Calendar';


export default ({
    parametro,
    valorMinimo,
    valorMaximo,
    fechaInfLectura,
    fechaSupLectura,
    onChange
}) => {
    return (
        <div className="form">
            <div className="form-group">
                <label className="font-weight-bold">Parámetro</label>
                <AutocompleteWithQuery
                    query={LISTA_PARAMETROS_CALIDAD}
                    valuesProperty="operaciones.listaParametrosCalidad"
                    name="parametro"
                    value={parametro}
                    onChange={onChange}
                />
            </div>
            <div className="form-row">
                <div className="form-group col-6">
                    <label className="font-weight-bold">Valor mínimo</label>
                    <input
                        className="form-control form-control-sm"
                        name="valorMinimo"
                        value={valorMinimo}
                        onChange={onChange}
                        type="number"
                    />
                </div>
                <div className="form-group col-6">
                    <label className="font-weight-bold">Valor máximo</label>
                    <input
                        className="form-control form-control-sm"
                        name="valorMaximo"
                        value={valorMaximo}
                        onChange={onChange}
                        type="number"
                    />
                </div>
            </div>
            <label className="font-weight-bold">Fecha de lectura</label>
            <div className="form-row">
                <div className="form-group col-6">
                    <label className="font-weight-bold">Entre</label>
                    <Calendar
                        name="fechaInfLectura"
                        value={fechaInfLectura}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group col-6">
                    <label className="font-weight-bold">Hasta</label>
                    <Calendar
                        name="fechaSupLectura"
                        value={fechaSupLectura}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    )
}