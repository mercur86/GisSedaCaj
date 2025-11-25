import { Dropdown } from 'primereact/dropdown';
import React from 'react';

export default (props) => (
    <Dropdown
        className="p-fluid d-flex flex-row-reverse"
        inputClassName="form-control form-control-sm"
        {...props}
    />
)