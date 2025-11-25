import React from 'react';
import { LISTAR_ORIGEN_CONSUMO } from '../FAUsuario/queries';
import ListWithQuery from './ListWithQuery';

const FormInfoConexionI3 = ({ origenConsumo, minConsumo, maxConsumo, onChange }) => {
    return (
        <div className="form">
            <div className="form-group mb-2">
                <label className="font-weight-bold mb-0">Consumo (m3)</label>
                <small className="form-text text-muted">Correspondiente al presente mes (si está disponible)</small>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label className="font-weight-bold">Mín</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        name="minConsumo"
                        value={minConsumo}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label className="font-weight-bold">Max</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        name="maxConsumo"
                        value={maxConsumo}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="font-weight-bold">Origen del consumo</label>
                <ListWithQuery
                    query={LISTAR_ORIGEN_CONSUMO}
                    valuesProperty="catastro.tiposOrigenConsumo"
                    name="origenConsumo"
                    value={origenConsumo}
                    onChange={onChange}
                />
                <small className="form-text text-muted">Correspondiente al presente mes (si está disponible)</small>
            </div>
        </div>
    );
}

export default FormInfoConexionI3;