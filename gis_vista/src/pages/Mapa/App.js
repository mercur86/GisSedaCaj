import React from 'react';
import AppBar from './components/AppBar';
import styled from 'styled-components';
import SidebarMap from '../../modules/global/components/SidebarMap';
import Store from './store/Store';
import MapaOL from '../../modules/global/components/MapaOL';
import Popup from './components/Popup';
import { AbilityContext, createAbilitiesForUser } from './casl/ability';
import Tour from './joyride';
import MapaGoogle from '../../modules/global/components/MapaGoogle';

const AppContainer = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
`;

const MapContainer = styled.div`
    position: relative;
    margin-top: 47px;
    width: 100%;
    height: calc(100% - 47px);
`;

export default ({ appData,servicePublic  }) => {

    const ability = createAbilitiesForUser({
        informesCapaAutorizados: appData.sistema.informesCapaAutorizados,
        opcionesAutorizadasMenu: appData.sistema.opcionesAutorizadasMenu
    });

    const _appData = { ...appData, servicePublic };
    return (
        <AppContainer>
            <Store appData={ _appData }>
                <Tour />
                <AbilityContext.Provider value={ability}>
                    <AppBar />
                    <MapContainer>
                        <SidebarMap />
                        <MapaGoogle />
                        <MapaOL />
                        <Popup />
                    </MapContainer>
                </AbilityContext.Provider>
            </Store>
        </AppContainer>
    )
}