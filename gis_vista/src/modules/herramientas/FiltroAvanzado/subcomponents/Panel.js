import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { MinusIcon } from '../../../../lib/icons';
import classnames from 'classnames';

export default forwardRef(({ className, id, title, children, open: show }, ref) => {

    const isOpen = useCallback(() => document.getElementById(id).classList.contains("show"), [id]);
    const toggle = useCallback(() => document.querySelector(`*[data-target='#${id}']`).click(), [id]);

    useImperativeHandle(ref, () => ({
        open: () => {
            if (!isOpen()) toggle();
        },
        close: () => {
            if (isOpen()) toggle();
        }
    }));

    return (
        <div className={`card mb-1 border-filtro ${className}`}>
            <div className="card-header p-1 font-size-titulo">
                <strong>{title}</strong>
                <div className="card-header-actions">
                    <span className="cursor-pointer card-header-action btn-minimize text-dark m-1" data-toggle="collapse"
                        data-target={`#${id}`} aria-expanded="false" aria-controls={id}>
                        <MinusIcon />
                    </span>
                </div>
            </div>
            <div className={classnames("card-body p-2 collapse", { show })} id={id}>
                {children}
            </div>
        </div>
    )
});