import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { withStore } from '../../../../pages/Mapa/store/Store';
import { toLonLat } from 'ol/proj';
import MapTypeControl from './MapTypeControl';

const toGoogleLonLat = (inCoord, projection) => {
    const outCoord = toLonLat(inCoord, projection);
    return { lng: outCoord[0], lat: outCoord[1] };
}

const MapaGoogle = withStore(({ storeContext: { map } }) => {
    const [gmap, setGmap] = useState(null);
    const [center] = useState(() => {
        return toGoogleLonLat(map.getView().getCenter(), map.codeProjection);
    });

    useEffect(() => {
        gmap && gmap.setMapTypeId(window.google.maps.MapTypeId.ROADMAP);
    }, [gmap]);

    const handleCenterChange = useCallback((evt) => {
        const lngLat = toGoogleLonLat(evt.target.getCenter(), map.codeProjection);
        gmap.setCenter(lngLat);
    }, [map, gmap]);

    const handleResolutionChange = useCallback((evt) => {
        gmap.setZoom(evt.target.getZoom());
    }, [gmap]);

    useEffect(() => {
        map.getView().on('change:center', handleCenterChange);
        map.getView().on('change:resolution', handleResolutionChange);
        return () => {
            map.getView().un('change:center', handleCenterChange);
            map.getView().un('change:resolution', handleResolutionChange);
        }
    }, [map, handleCenterChange, handleResolutionChange]);

    return (
        <React.Fragment>
            <GoogleMap
                mapContainerStyle={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                center={center}
                zoom={map.getView().getZoom()}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    mapTypeControl: false
                }}
                onLoad={(_gmap) => setGmap(_gmap)}
            />
            <MapTypeControl gmap={gmap} />
        </React.Fragment>
    );
})

export default MapaGoogle;