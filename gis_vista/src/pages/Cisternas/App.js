import React, { useState } from 'react';
import LogoEPSGRAU from '../../assets/img/logo_epsgrau.png';
import styled from 'styled-components';
import Map from './Map';
import { Dialog } from 'primereact/dialog';
import UbicarPredio from './UbicarPredio';
import ConfigCisternas from './ConfigCisternas';
import { INFO_CLIENTE } from './queries';
import { useLazyQuery } from '@apollo/react-hooks';
import Loading from './Loading';
import MapInfo from './MapInfo';

const Nav = () => (<nav className="navbar navbar-light bg-light">
    <span className="navbar-brand d-flex align-items-center">
        <img src={LogoEPSGRAU} width="30" height="30" alt="" loading="lazy" />
        <span className="ml-2 text-white">EPS GRAU S.A.</span>
    </span>
</nav>
);

const FloatingContainer = styled.div`
    position: absolute;
    right: 20px;
    bottom: 20px;
`;

const FloatingButton = styled.button`
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Paper = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
`;

const App = () => {

    const [ubicarPredioVisible, setUbicarPredioVisible] = useState(false);
    const [configVisible, setConfigVisible] = useState(false);
    const [helpVisible, setHelpVisible] = useState(false);
    const [visibilityFilter, setVisibilityFilter] = useState("0");
    const [getInfoCliente, { loading, data }] = useLazyQuery(INFO_CLIENTE, { fetchPolicy: "network-only" });

    const cliente = data ? data.infoCliente : null;

    return (
        <Paper className="d-flex flex-column">
            <Nav />
            <div className="flex-grow-1">
                <Map
                    visibilityFilter={visibilityFilter}
                    cliente={cliente}
                />
            </div>
            <FloatingContainer className="d-flex flex-column">
                <FloatingButton
                    className="btn btn-light rounded-circle mb-2 shadow rounded"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Ubicar mi predio"
                    onClick={() => setUbicarPredioVisible(true)}
                >
                    <i className="fas fa-house-user" />
                </FloatingButton>
                <FloatingButton
                    className="btn btn-primary rounded-circle mb-2 shadow rounded"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Ver cisternas"
                    onClick={() => setConfigVisible(true)}
                >
                    <i className="fas fa-bus" />
                </FloatingButton>
                <FloatingButton
                    className="btn btn-secondary rounded-circle shadow rounded"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Información"
                    onClick={() => setHelpVisible(true)}
                >
                    <i className="fas fa-info" />
                </FloatingButton>
            </FloatingContainer>
            <Dialog
                header="Ubicar mi predio"
                visible={ubicarPredioVisible}
                dismissableMask={true}
                closeOnEscape={true}
                onHide={() => setUbicarPredioVisible(false)}
            >
                <UbicarPredio
                    onRequest={(suministro) => {
                        setUbicarPredioVisible(false);
                        getInfoCliente({ variables: { suministro } })
                    }}
                />
            </Dialog>
            <Dialog
                header="Ver cisternas"
                visible={configVisible}
                dismissableMask={true}
                closeOnEscape={true}
                onHide={() => setConfigVisible(false)}
            >
                <ConfigCisternas
                    visibilityFilter={visibilityFilter}
                    onChange={(_visibilityFilter) => {
                        setConfigVisible(false);
                        setVisibilityFilter(_visibilityFilter);
                    }}
                />
            </Dialog>
            <Dialog
                header="Mapa"
                visible={helpVisible}
                dismissableMask={true}
                closeOnEscape={true}
                onHide={() => setHelpVisible(false)}
            >
                <MapInfo />
            </Dialog>
            <Loading show={loading} />
        </Paper>
    );
};

export default App;