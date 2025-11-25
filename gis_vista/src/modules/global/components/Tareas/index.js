import React, { useState, useRef } from 'react';
import { withStore } from '../../../../pages/Mapa/store/Store';
import { renderTabPills, renderTabPanes } from './subcomponents/Tabs';
import styled from 'styled-components';
import { ContextMenu } from 'primereact/contextmenu';
import { crearMenuContextual } from './config';

const TabPillsList = styled.ul`
    z-index: 101;

    & li.nav-item .nav-link {
        cursor: pointer;
        background-color: #f4f4f4;
        color: #333;
        border: 1px solid #c8c8c8;
        border-radius: 0px;
        flex: 1;
    }

    & li.nav-item .nav-link.active {
        font-weight: bold;
    }

    & li.nav-item {
        margin-bottom: -3px !important;
    }
`;

export default withStore(({ storeContext: { store, tareasApi } }) => {
    const [menuContextual, setMenuContextual] = useState([]);
    const { tareas, idTareaActual } = store;
    const cm = useRef(null);

    function handleContextMenu(idTarea, e) {
        e.preventDefault();
        setMenuContextual(crearMenuContextual(idTarea, tareasApi));
        cm.current.show(e);
    }

    return (
        <div className="d-flex flex-column h-100">
            <ContextMenu
                ref={cm}
                model={menuContextual}
                appendTo={document.getElementsByTagName('body')[0]}
                baseZIndex={1030}
            />
            <TabPillsList
                className="nav nav-tabs d-flex"
                role="tablist"
            >
                {renderTabPills(tareas, idTareaActual, handleContextMenu)}
            </TabPillsList>
            <div className="tab-content flex-grow-1 overflow-auto">
                {renderTabPanes(tareas, idTareaActual)}
            </div>
        </div>
    );
})