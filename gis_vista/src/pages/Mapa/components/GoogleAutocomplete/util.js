import { Feature } from "ol";
import { fromLonLat, transformExtent } from "ol/proj";
import { estiloMarcador } from "../../store/map/estilos";

export const crearMarcador = (map) => {
    const ft = new Feature();
    ft.setStyle(estiloMarcador);
    map.utils.getSource().addFeature(ft);
    return ft;
}

export const getPlaceExtentNCoordinate = (place, map) => {
    const { location, viewport } = place.geometry;
    const { lng, lat } = location.toJSON();

    const ne = viewport.getNorthEast();
    const sw = viewport.getSouthWest();
    const extent = [sw.lng(), sw.lat(), ne.lng(), ne.lat()];

    const localExtent = transformExtent(extent, 'EPSG:4326', map.codeProjection);
    const placeCoordinate = fromLonLat([lng, lat]);
    return { extent: localExtent, coordinate: placeCoordinate };
}