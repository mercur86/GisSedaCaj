import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
    useRouteMatch,
    Switch,
    Route
} from 'react-router-dom';
import Grafico from './Grafico';
import Tabla from './Tabla';

const DISTRIBUCION_CONSUMO_HAB_URBANAS = gql`
query distribucionConsum($idProvincia: Int, $idDistrito: Int, $anio: Int!, $mes: Int!) {
    estadistica {
      consumoHabilitacionesUrbanas(idProvincia: $idProvincia, idDistrito: $idDistrito, anio: $anio, mes: $mes) {
        habilitacion_urbana
        consumo
        consumo_soles
        consumo_porcien
        consumo_soles_porcien
      }
    }
  }
`;

const formatParams4query = (params) => {
    const { periodo, provincia, distrito } = params;
    return {
        anio: periodo.getFullYear(),
        mes: periodo.getMonth() + 1,
        idProvincia: parseInt(provincia.code),
        idDistrito: parseInt(distrito.code)
    };
}

export default ({ params }) => {
    const { path } = useRouteMatch();
    const { periodo, provincia, distrito } = params;

    return (
        <Query
            query={DISTRIBUCION_CONSUMO_HAB_URBANAS}
            variables={formatParams4query(params)}
        >
            {({ data, loading, error }) => {

                if (loading) return <p>Cargando...</p>;
                if (error) return <p>{error.message}</p>;

                const titulo = `${provincia.name} - ${distrito.name} - ${periodo.getMonth() + 1}/${periodo.getFullYear()}`;
                
                return (
                    <Switch>
                        <Route exact path={path}>
                            <Grafico
                                titulo={titulo}
                                data={data.estadistica.consumoHabilitacionesUrbanas} />
                        </Route>
                        <Route path={`${path}/datamatrix`}>
                            <Tabla
                                titulo={titulo}
                                data={data.estadistica.consumoHabilitacionesUrbanas}
                            />
                        </Route>
                    </Switch>
                );
            }}
        </Query>
    );
}