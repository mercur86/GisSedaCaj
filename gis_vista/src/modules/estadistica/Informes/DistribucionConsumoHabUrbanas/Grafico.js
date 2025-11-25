import React from "react";
import {
    useRouteMatch, Link
} from "react-router-dom";
import { Bar } from "react-chartjs-2";

const formatData4Graph = (data) => {
    const labels = data.map(row => row.habilitacion_urbana);
    return {
        labels,
        datasets: [{
            backgroundColor: "#a569bd",
            label: 'Distribución del consumo',
            data: data.map(row => row.consumo)
        }]
    }
};

const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        xAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: "Habilitaciones Urbanas"
                }
            }
        ],
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: 'Consumo (m3)'
                }
            }
        ]
    }
}

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
                to={`${url}/datamatrix`}
                className="btn btn-link btn-sm"
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
    );
}