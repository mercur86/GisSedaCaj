import React from 'react';
import { LABEL_ESTADO_USUARIO_I3 } from '../values';
import { LISTA_ESTADOS_USUARIO_I3 } from '../FAProblemas/queries';
import AutocompleteWithQuery from './AutocompleteWithQuery';

export default ({ estadoUsuarioI3, onChange }) => {
    return (
        <div className="form">
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_ESTADO_USUARIO_I3}</label>
                <AutocompleteWithQuery
                    query={LISTA_ESTADOS_USUARIO_I3}
                    valuesProperty="operaciones.listaEstadosUsuarioI3"
                    name="estadoUsuarioI3"
                    value={estadoUsuarioI3}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}