import React, { useEffect, useState } from 'react';

const Radio = ({ id, label, ...restProps }) => (
    <div className="form-check">
        <input className="form-check-input" type="radio" id={id} {...restProps} />
        <label className="form-check-label" htmlFor={id}>
            {label}
        </label>
    </div>
);

const ConfigCisternas = ({ visibilityFilter, onChange }) => {

    const [filter, setFilter] = useState(visibilityFilter);

    useEffect(() => {
        setFilter(visibilityFilter);
    }, [visibilityFilter]);

    function handleChange(e) {
        setFilter(e.target.value);
    }

    return (
        <div className="form">
            <Radio
                id="cOption1"
                name="filtroCisternas"
                label="Que están abasteciendo ahora."
                value="0"
                checked={filter === "0"}
                onChange={handleChange}
            />
            <Radio
                id="cOption2"
                name="filtroCisternas"
                label="Todas."
                value="1"
                checked={filter === "1"}
                onChange={handleChange}
            />
            <button
                className="btn btn-primary btn-sm btn-block mt-3"
                onClick={() => {
                    onChange && onChange(filter);
                }}
            >
                Ver cisternas
            </button>
        </div>
    );
}

export default ConfigCisternas;