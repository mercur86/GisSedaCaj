import React from 'react';

const Entrada = ({ label, value, longText }) => {
    return (
        <div className="form-group form-row">
            <label className="col-sm-4 col-form-label font-weight-bold">{label}</label>
            <div className="col-sm-8">
                {!longText ?
                    <input readOnly className="form-control-plaintext" defaultValue={value} />
                    : <textarea readOnly className="form-control-plaintext" defaultValue={value} />
                }
            </div>
        </div>
    )
};

export default Entrada;