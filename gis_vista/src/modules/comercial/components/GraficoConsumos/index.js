import React from 'react';
import { Query } from 'react-apollo';
import { CONSUMOS_USUARIO } from './queries';
import { Line } from 'react-chartjs-2';
import { chartOptions, formatChartData } from './config';
import { LoadingIcon } from '../../../../lib/icons';
import { Link } from 'react-router-dom';

const Grafico = ({ suministro, nombre_usuario }) => {

    return (
        <Query
            query={CONSUMOS_USUARIO}
            variables={{ suministro }}
        >
            {({ data, loading, error }) => {
                if (loading) return <div className="text-center mt-2"><LoadingIcon /></div>;
                if (error) return <p>{error.message}</p>;

                const chartData = formatChartData(data.comercial.consumosUsuario);

                return <div style={{ width: '100%', height: '500px' }}>
                    <Line
                        data={chartData}
                        height={500}
                        options={chartOptions({ suministro, nombre_usuario })}
                    />
                </div>
            }}
        </Query>
    );
}

const Consumos = ({
    suministro,
    nombre_usuario
}) => {
    return (
        <div className="p-2">
            <Link
                className="text-dark"
                to="/info">
                <i className="fas fa-arrow-left fa-lg cursor-pointer" />
            </Link>
            <Grafico
                suministro={suministro}
                nombre_usuario={nombre_usuario}
            />
        </div>
    )
}
export default Consumos;