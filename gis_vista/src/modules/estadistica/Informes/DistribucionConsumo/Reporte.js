import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import WKT from 'ol/format/WKT';
import Grafico from './Grafico';
import Tabla from './Tabla';
import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import { withStore } from '../../../../pages/Mapa/store/Store';
import { CAPA_HABILITACIONES_URBANAS } from '../../../values';

const DISTRIBUCION_CONSUMO = gql`
query distribucionConsum($idProvincia: Int, $idDistrito: Int, $area: String, $anio: Int!, $mes: Int!, $intervalos: Int!) {
    estadistica {
      consumoUsuarios(idProvincia: $idProvincia, idDistrito: $idDistrito, area: $area, anio: $anio, mes: $mes, intervalos: $intervalos) {
        lim_inferior
        lim_superior
        num_usuarios
        consumo
        consumo_soles
        num_usuarios_porcien
        consumo_porcien
        consumo_soles_porcien
      }
    }
  }
`;

const getWKT = (area) => {
    const fmt = new WKT();
    const wkt = fmt.writeGeometry(area.getGeometry(), { featureProjection: 'EPSG:3857', dataProjection: 'EPSG:32717' });
    return wkt;
}

const formatParams4query = (params) => {
    // 'params' is 'formData'
    const { periodo, provincia, distrito, area, intervalos } = params;

    return {
        area: area ? getWKT(area) : null,
        mes: periodo.getMonth() + 1,
        anio: periodo.getFullYear(),
        idProvincia: provincia ? parseInt(provincia.code) : null,
        idDistrito: distrito ? parseInt(distrito.code) : null,
        intervalos: parseInt(intervalos)
    }
};

const resolveTitulo = (map, params) => {
    const { area, provincia, distrito } = params;
    const capaHabUrbanas = map.getCapaById(CAPA_HABILITACIONES_URBANAS);
    if (area) {
        return area.get('capa') === capaHabUrbanas ? area.get('nombre') : `SECTOR ${area.get('id_sector')}`;
    } else {
        const tokens = [];
        if (provincia && parseInt(provincia.code)) tokens.push(provincia.name);
        if (distrito && parseInt(distrito.code)) tokens.push(distrito.name);
        return tokens.join(" - ");
    }
}

const Reporte = ({
    params,
    storeContext: { map }
}) => {

    const { path } = useRouteMatch();
    const titulo = resolveTitulo(map, params);

    return (
        <Query
            query={DISTRIBUCION_CONSUMO}
            variables={formatParams4query(params)}
        >
            {({ data, loading, error }) => {
                if (loading) return <p>Cargando...</p>;
                if (error) return <p>{error.message}</p>;

                return (
                    <Switch>
                        <Route exact path={path}>
                            <Grafico
                                titulo={titulo}
                                data={data.estadistica.consumoUsuarios} />
                        </Route>
                        <Route path={`${path}/datamatrix`}>
                            <Tabla
                                titulo={titulo}
                                data={data.estadistica.consumoUsuarios} />
                        </Route>
                    </Switch>
                )
            }}
        </Query>
    )
}

export default withStore(Reporte);