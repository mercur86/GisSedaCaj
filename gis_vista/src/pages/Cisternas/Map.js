import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { useLazyQuery } from '@apollo/react-hooks';
import { LISTA_CISTERNAS } from './queries';
import Loading from './Loading';
import { Dialog } from 'primereact/dialog';
import InfoCisterna from './InfoCisterna';
import UserMarker from '../../assets/img/marker5.png';
import RedMarker from '../../assets/img/red_marker.png';
import GreyMarker from '../../assets/img/grey_marker.png';
import Cisterna from '../../assets/img/cisterna.png';
import InfoCliente from './InfoCliente';
import { estaAbasteciendoAhora } from './helpers';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: -5.189920,
    lng: -80.644020
};

const Map = ({ visibilityFilter, cliente }) => {
    const [map, setMap] = useState(null);
    const [infoVisible, setInfoVisible] = useState(false);
    const [infoUsuarioVisible, setInfoUsuarioVisible] = useState(false);

    const [cisterna, setCisterna] = useState(null);
    const [getCisternas, { loading, data }] = useLazyQuery(LISTA_CISTERNAS, { fetchPolicy: "network-only" });

    useEffect(() => {
        getCisternas({ variables: { visibilityFilter } });
    }, [getCisternas, visibilityFilter]);

    const onLoad = React.useCallback(function callback(map) {
        /*const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);*/
        setMap(map);
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

    const cisternas = data && data.listaCisternas ? data.listaCisternas : [];

    return (
        <React.Fragment>
            <LoadScript
                googleMapsApiKey="AIzaSyD8pHOVvg8_rbh1dOz8jXwuV-AxLlMZBOY"//"AIzaSyAecccog4G_o-W9EdopUQU1CZJhU8HQSOU"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={16}
                    clickableIcons={false}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        fullscreenControl: false
                    }}
                >
                    {cisternas.map((c, key) => (
                        <Marker
                            key={key}
                            position={{ lng: c.longitud, lat: c.latitud }}
                            icon={estaAbasteciendoAhora(c.horaInicial24, c.horaFinal24) ? Cisterna : GreyMarker}
                            onClick={() => {
                                setCisterna(c);
                                setInfoVisible(true);
                            }}
                        />
                    ))}
                    {cliente &&
                        <Marker
                            position={{ lng: cliente.longitud, lat: cliente.latitud }}
                            icon={UserMarker}
                            onClick={() => {
                                setInfoUsuarioVisible(true);
                            }}
                            onLoad={() => {
                                map.panTo({ lng: cliente.longitud, lat: cliente.latitud });
                            }}
                        />}
                </GoogleMap>
                <Dialog
                    header="Cisterna"
                    visible={infoVisible}
                    dismissableMask={true}
                    closeOnEscape={true}
                    onHide={() => setInfoVisible(false)}
                >
                    <InfoCisterna {...cisterna} />
                </Dialog>
                <Dialog
                    header="Usuario"
                    visible={infoUsuarioVisible}
                    dismissableMask={true}
                    closeOnEscape={true}
                    onHide={() => setInfoUsuarioVisible(false)}
                >
                    {cliente && <InfoCliente {...cliente} />}
                </Dialog>
            </LoadScript>
            <Loading show={loading} />
        </React.Fragment>
    )
}

export default React.memo(Map)