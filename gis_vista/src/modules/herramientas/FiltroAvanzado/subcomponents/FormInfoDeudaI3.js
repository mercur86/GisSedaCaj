import React from 'react';

const FormInfoDeudaI3 = ({ minMontoDeuda, maxMontoDeuda, minMesDeuda, maxMesDeuda, onChange }) => {
    return (
        <div className="form">
            <div className="form-group mb-2">
                <label className="font-weight-bold mb-0">Monto Deuda</label>
                <small className="form-text text-muted">Rango del monto de la deuda del usuario</small>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label className="font-weight-bold">Mín</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        name="minMontoDeuda"
                        value={minMontoDeuda}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label className="font-weight-bold">Max</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        name="maxMontoDeuda"
                        value={maxMontoDeuda}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group mb-2">
                <label className="font-weight-bold mb-0">Mes Deuda</label>
                <small className="form-text text-muted">Rango de cantidad de meses de la deuda del usuario</small>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label className="font-weight-bold">Mín</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        name="minMesDeuda"
                        value={minMesDeuda}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label className="font-weight-bold">Max</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        name="maxMesDeuda"
                        value={maxMesDeuda}
                        onChange={onChange}
                    />
                </div>
            </div>
            {/* <div className="form-group">
                <label className="font-weight-bold">Origen del consumo</label>
                <ListWithQuery
                    query={LISTAR_ORIGEN_CONSUMO}
                    valuesProperty="catastro.tiposOrigenConsumo"
                    name="origenConsumo"
                    value={origenConsumo}
                    onChange={onChange}
                />
                <small className="form-text text-muted">Correspondiente al presente mes (si está disponible)</small>
            </div> */}
        </div>
    );
}

export default FormInfoDeudaI3;