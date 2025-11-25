import React, { useState } from 'react';
import { withStore } from '../../../pages/Mapa/store/Store';
import styled from 'styled-components';

const Pane = styled.section`
    transition-property: width;
    transition-duration: 0.6s;
    width: ${props => props.width};
`;

const Titulo = styled.strong`
    font-size: 0.8rem;
    line-height: 0.8rem;
    vertical-align: middle;
`;

export const PanelInformeContext = React.createContext(null);

export default withStore(({
    storeContext: { store, reportesEstadisticosApi },
    indiceReporte,
    titulo,
    children
}) => {

    const [fullWidth, setFullWidth] = useState(false);
    const [itsParamsStage, setItsParamsStage] = useState(true);
    const { sidebarMaximizado } = store;
    const width = sidebarMaximizado ? (fullWidth ? "100%" : (itsParamsStage ? "340px" : "50%")) : "100%";
    const resizeBtnIcon = fullWidth ? "far fa-window-restore" : "far fa-window-maximize";

    return (
        <Pane width={width} className={`d-inline-block p-2`}>
            <div className="card">
                <div className="card-header p-0 d-flex justify-content-end">
                    <div className="flex-grow-1 py-1 px-2"><Titulo>{titulo}</Titulo></div>
                    <div className="d-flex">
                        <button className="btn btn-light btn-sm"
                            onClick={() => reportesEstadisticosApi.cerrarReporte(indiceReporte)}>
                            <i className="fas fa-times"></i>
                        </button>
                        <button
                            disabled={itsParamsStage}
                            className="btn btn-light btn-sm"
                            onClick={() => setFullWidth(!fullWidth)}
                        >
                            <i className={resizeBtnIcon}></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <PanelInformeContext.Provider value={setItsParamsStage}>
                        {children}
                    </PanelInformeContext.Provider>
                </div>
            </div>
        </Pane>
    )
})