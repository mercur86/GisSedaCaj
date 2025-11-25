import React from 'react';

export const Label = ({ children }) =>
    <strong className="col-sm-auto col-form-label">
        {children}
    </strong>

export const Data = ({ children }) => <div className="col-sm-auto">
    <p className="form-control-plaintext">{children}</p>
</div>