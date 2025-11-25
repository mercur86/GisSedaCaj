import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';
import { getContextMenuItems, localeText } from './config';
import classnames from 'classnames';

const TopBarWrapper = styled.div`
    border: solid 1px;
    border-color: #babfc7;
    background-color: #f8f8f8;
    border-bottom: 0px;
`;

const ActionButton = ({ children, ...restProps }) =>
    <button type="button" className="card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0" {...restProps}>{children}</button>

const TopBarMenu = ({ title, selected, actionsDef = [], onAction }) => {

    const title_ = selected.length ? `${selected.length} seleccionado(s)` : title;
    const actions = selected.length ? actionsDef : actionsDef.filter((e) => e.fixed);

    return (
        <div className='d-flex flex-row-reverse'>
            <section>
                {actions.map((def, index) => {
                    return (<ActionButton key={index} title={def.title} onClick={onAction.bind(null, def.id)}>
                        <i className={def.icon} />
                    </ActionButton>)
                })}
            </section>
            <strong className="flex-grow-1">{title_}</strong>
        </div>
    );
}

const AgGridContainer = styled.div`
    width: 100%;
`;

export default ({
    className,
    actionsDef = [],
    barTitle,
    onBarMenuAction,
    selectedRows = [],
    /* agGrid properties */
    localeText: locText,
    ...otherAgGridOptions
}) => {

    const showTopBar = actionsDef.length !== 0 || barTitle;

    return (
        <div className={classnames('d-flex flex-column', className)}>
            {showTopBar && <TopBarWrapper className='p-2'>
                <TopBarMenu
                    title={barTitle}
                    actionsDef={actionsDef}
                    selected={selectedRows}
                    onAction={onBarMenuAction}
                />
            </TopBarWrapper>}
            <AgGridContainer
                className='ag-theme-alpine flex-grow-1'
            >
                <AgGridReact
                    {...otherAgGridOptions}
                    getContextMenuItems={getContextMenuItems}
                    localeText={{ ...locText, ...localeText }}
                />
            </AgGridContainer>
        </div>
    );
}