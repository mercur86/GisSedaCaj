import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useRouteMatch, Link } from 'react-router-dom';

const formatData4Graph = (data) => {
    const labels = data.map((interval) => `<${interval.lim_inferior} - ${interval.lim_superior}]`);
    return {
        labels,
        datasets: [{
            backgroundColor: "#F08080",
            label: 'Distribución del consumo',
            data: data.map((interval) => interval.num_usuarios)
        }]
    }
}

const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        xAxes: [
            {
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                scaleLabel: {
                    display: true,
                    labelString: "Consumo (m3)"
                }
            }
        ],
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Usuarios'
                }
            }
        ]
    }
};

export default ({ data, titulo }) => {

    const { url } = useRouteMatch();

    return (
        <div>
            <Link
                className="btn btn-link btn-sm pl-0"
                to="/form"
            >
                Editar parámetros
            </Link>
            <Link
                className="btn btn-link btn-sm"
                to={`${url}/datamatrix`}
            >
                Ver tabla
            </Link>
            <p className="text-center mb-1">{titulo}</p>
            <div style={{ height: '380px' }}>
                <Bar
                    data={formatData4Graph(data)}
                    options={graphOptions}
                />
            </div>
        </div>
    )
}