import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { withStore } from '../../store/Store';
import Point from 'ol/geom/Point';
import { crearMarcador, getPlaceExtentNCoordinate } from './util';

const Input = forwardRef((props, ref) =>
    <div className="form-inline my-1 my-lg-0 search">
        <input
            ref={ref}
            id="googleAutocompleteWdgt"
            placeholder='Ingrese una ubicación'
            style={{ width: '280px' }}
            className="form-control form-control-sm mr-sm-2 rounded search-input"
            type="text"
            {...props}
        />
    </div>);

const GoogleAutocomplete = withStore(({ googleMaps, storeContext: { map } }) => {

    const [marker] = useState(crearMarcador(map));
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const googlePlaces = googleMaps.places;

    useEffect(() => {
        const bounds = new googleMaps.LatLngBounds(
            new googleMaps.LatLng(-6.410837, -81.458130),
            new googleMaps.LatLng(-4.023179, -79.170227)
        );
        const pac = new googlePlaces.Autocomplete(inputRef.current, { bounds, strictBounds: true });
        pac.setFields(['geometry']);
        pac.addListener('place_changed', function () {
            const place = pac.getPlace();
            if (!place.geometry) return;

            const { extent, coordinate } = getPlaceExtentNCoordinate(place, map);
            map.volarHastaExtension(extent);
            marker.setGeometry(new Point(coordinate));
        });

    }, [map, marker, googleMaps, googlePlaces]);

    return (
        <Input ref={inputRef} value={inputText} onChange={(e) => {
            const value = e.target.value;
            if (!value) marker.setGeometry(null);
            setInputText(value);
        }} />
    );
})

export default () => {

    return window.google ? <GoogleAutocomplete googleMaps={window.google.maps} /> : (
        <span>
            <i className="fas fa-times-circle fa-xs text-danger ml-2" />
                Google Maps API no disponible
        </span>
    );
}