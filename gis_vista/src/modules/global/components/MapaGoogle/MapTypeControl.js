import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const Container = styled.div`
    position: absolute;    
    margin: 10px;
    top: 0px;
    left: 45px;
    z-index: 90;
`;


const MapTypeControl = ({ gmap }) => {

    const [mapTypeId, setMapTypeId] = useState(null);

    const handleMapTypeIdChange = useCallback(() => {
        if (gmap) setMapTypeId(gmap.getMapTypeId());
    }, [gmap]);

    useEffect(() => {
        if (gmap) {
            gmap.addListener('maptypeid_changed', handleMapTypeIdChange);
        }
        return () => {
            if (gmap) {
                gmap.removeListener('maptypeid_changed', handleMapTypeIdChange);
            }
        }
    }, [gmap, handleMapTypeIdChange]);

    if (!(gmap && mapTypeId && window.google)) return null;

    const isHybrid = mapTypeId === window.google.maps.MapTypeId.HYBRID;

    return (
        <Container>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                    className={classnames("btn btn-light", { "active font-weight-bold": !isHybrid })}
                    onClick={() => gmap.setMapTypeId(window.google.maps.MapTypeId.ROADMAP)}
                >
                    <input type="radio" name="mapTypeId" defaultChecked={!isHybrid} /> Mapa
                </label>
                <label
                    className={classnames("btn btn-light", { "active font-weight-bold": isHybrid })}
                    onClick={() => gmap.setMapTypeId(window.google.maps.MapTypeId.HYBRID)}
                >
                    <input type="radio" name="mapTypeId" defaultChecked={isHybrid} /> Satélite
                </label>
            </div>
        </Container >
    );
}

export default MapTypeControl;