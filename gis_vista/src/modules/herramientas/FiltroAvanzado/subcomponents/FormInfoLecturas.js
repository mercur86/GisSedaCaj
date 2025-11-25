import React from 'react';

const FormInfoLecturas = ({ variacionLectura, onChange }) => {

    return (
        <div className="form">
            <div className="form-group mb-2">
                <label className="font-weight-bold">Variación de lecturas</label>
                <select
                    className="form-control form-control-sm"
                    name="variacionLectura"
                    value={variacionLectura}
                    onChange={onChange}
                >
                    <option value="">- Seleccionar -</option>
                    <option value="1">AUMENTO</option>
                    <option value="-1">DISMINUCIÓN</option>
                    <option value="0">SIN VARIACIÓN</option>
                    <option value="2">NO DISPONIBLE</option>
                </select>
                <small className="form-text text-muted">Diferencia entre la lectura correspondiente al presente mes y la lectura anterior. (Lecturas sujetas a disponibilidad)</small>
            </div>
        </div>
    );

}

export default FormInfoLecturas;