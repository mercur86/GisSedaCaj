import React from 'react';
import Panel from '../../../herramientas/FiltroAvanzado/subcomponents/Panel';
import InfoIdentificacion from './subcomponents/InfoIdentificacion';
import DatosCliente from './subcomponents/DatosCliente';
import DatosPredio from './subcomponents/DatosPredio';
import DatosMedidor from './subcomponents/DatosMedidor';
import ValoresMaximosAdmisibles from './subcomponents/ValoresMaximosAdmisibles';
import DatosConexionAgua from './subcomponents/DatosConexionAgua';
import DatosConexionDesague from './subcomponents/DatosConexionDesague';
import DatosComplementarios from './subcomponents/DatosComplementarios';
import { Query } from 'react-apollo';
import { FICHA_CATASTRAL } from './queries';
import UnidadesUso from './subcomponents/UnidadesUso';
import { Link } from 'react-router-dom';

const Ficha = ({
    data
}) => {
    return (
        <div className="p-2">
            <Link
                className="text-dark"
                to="/info">
                <i className="fas fa-arrow-left fa-lg cursor-pointer" />
            </Link>
            <div className="card mb-3 mt-2 border-filtro">
                <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
                    <strong>Ficha catastral</strong>
                </div>
                <div className="card-body p-1">
                    <Panel open={true} title="Identificación" id="fichaCatIdentificacion">
                        <InfoIdentificacion data={data} />
                    </Panel>
                    <Panel title="Datos del cliente" id="fichaCatDatosCliente">
                        <DatosCliente data={data} />
                    </Panel>
                    <Panel title="Datos del predio (dirección)" id="fichaCatDatosPredio">
                        <DatosPredio data={data} />
                    </Panel>
                    <Panel title="Unidades de uso" id="fichaCatUnidadesUso">
                        <UnidadesUso data={data} />
                    </Panel>
                    <Panel title="Datos del medidor" id="fichaCatDatosMedidor">
                        <DatosMedidor data={data} />
                    </Panel>
                    <Panel title="Valores máximos admisibles" id="fichaCatMaxAdmisibles">
                        <ValoresMaximosAdmisibles data={data} />
                    </Panel>
                    <Panel title="Datos de la conexión de Agua" id="fichaCatDatosConAgua">
                        <DatosConexionAgua data={data} />
                    </Panel>
                    <Panel title="Datos de la conexión de Desagüe" id="fichaCatDatosConDesague">
                        <DatosConexionDesague data={data} />
                    </Panel>
                    <Panel title="Datos complementarios" id="fichaCatDatosComplementarios">
                        <DatosComplementarios data={data} />
                    </Panel>
                </div>
            </div>
        </div>
    );
}

const FichaWithQuery = ({
    suministro,
    dashboardControl
}) =>
    <div className="p-2">
        <Query
            query={FICHA_CATASTRAL}
            variables={{ suministro }}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Cargando...</p>;
                if (error) return <p>{error.message}</p>;

                return <Ficha
                    dashboardControl={dashboardControl}
                    data={data.comercial.fichaCatastral}
                />
            }}
        </Query>
    </div>

export default FichaWithQuery;