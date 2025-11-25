import React, { useState } from 'react';
import Formulario from './Formulario';
import Reporte from './Reporte';
import {
    MemoryRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const entries = ["/form", "/report"];

const initFormData = {
    provincia: null,
    distrito: null,
    area: null,
    intervalos: 10,
    periodo: null
}

export default function DistribucionConsumo({ indiceReporte }) {
    const [formData, setFormData] = useState(initFormData);

    function handleChange(e) {
        const name = e.target.name,
            value = e.value || e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function setArea(area) {
        setFormData(prev => ({ ...prev, area }));
    }

    return (
        <div style={{ minHeight: "420px" }}>
            <Router
                initialEntries={entries}
                initialIndex={0}
            >
                <Switch>
                    <Route exact path="/form">
                        <Formulario
                            idReporte={indiceReporte}
                            {...formData}
                            setArea={setArea}
                            onChange={handleChange}
                        />
                    </Route>
                    <Route path="/report">
                        <Reporte params={formData} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}