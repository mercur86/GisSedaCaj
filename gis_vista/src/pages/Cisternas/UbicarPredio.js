import React, { useState } from 'react';

const UbicarPredio = ({ onRequest }) => {

    const [suministro, setSuministro] = useState("");

    return (
        <form
            className="form"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (suministro) {
                    onRequest && onRequest(suministro);
                }
            }}
        >
            <div className="form-group">
                <label className="font-weight-bold">N° Suministro</label>
                <input
                    id="inputSuministro"
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Ingrese suministro"
                    value={suministro}
                    maxLength={8}
                    onChange={(e) => {
                        if (!isNaN(e.target.value)) setSuministro(e.target.value);
                    }}
                />
                <small className="form-text text-muted">
                    Encuentre su suministro en la parte superior de su recibo.
                    </small>
            </div>
            <button
                type="submit"
                className="btn btn-primary btn-sm btn-block"
            >
                Ubicar mi predio
                </button>
        </form>
    );
};

export default UbicarPredio;