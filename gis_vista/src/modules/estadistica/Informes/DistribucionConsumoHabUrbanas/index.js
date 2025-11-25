import React, { useState } from 'react';
import {
    MemoryRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Formulario from './Formulario';
import Reporte from './Reporte';

const entries = ["/form", "/report"]

const initFormData = {
    provincia: null,
    distrito: null,
    periodo: null
}

export default function DistribucionConsumoHabUrbanas() {
    const [formData, setFormData] = useState(initFormData);

    function handleChange(e) {
        const name = e.target.name,
            value = e.value || e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div style={{ minHeight: "260px" }}>
            <Router
                initialEntries={entries}
                initialIndex={0}
            >
                <Switch>
                    <Route exact path="/form">
                        <Formulario
                            {...formData}
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