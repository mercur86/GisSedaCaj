import React from 'react';
import { LABEL_ESTADO_DEL_PREDIO, LABEL_CATEGORIA_PREDIO, LABEL_TIPO_SERVICIO, LABEL_TIPO_CONSTRUCCION } from '../FAUsuario/values';
import ListWithQuery from './ListWithQuery';
import { LISTAR_ESTADO_PREDIO, LISTAR_CATEGORIA_PREDIO, LISTAR_TIPO_SERVICIO, LISTAR_TIPO_CONSTRUCCION } from '../FAUsuario/queries';

export default ({ estado, categoria, tipoServicio, tipoConstruccion, onChange }) => {
    return (
        <div className="form">
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_ESTADO_DEL_PREDIO}</label>
                <ListWithQuery
                    query={LISTAR_ESTADO_PREDIO}
                    valuesProperty="catastro.listaEstadoPredio"
                    name="estadoPredio"
                    value={estado}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_CATEGORIA_PREDIO}</label>
                <ListWithQuery
                    query={LISTAR_CATEGORIA_PREDIO}
                    valuesProperty="catastro.listaCategoriaPredio"
                    name="categoriaPredio"
                    value={categoria}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_TIPO_SERVICIO}</label>
                <ListWithQuery
                    query={LISTAR_TIPO_SERVICIO}
                    valuesProperty="catastro.listaTipoServicio"
                    name="tipoServicio"
                    value={tipoServicio}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_TIPO_CONSTRUCCION}</label>
                <ListWithQuery
                    query={LISTAR_TIPO_CONSTRUCCION}
                    valuesProperty="catastro.listaTipoConstruccion"
                    name="tipoConstruccion"
                    value={tipoConstruccion}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}