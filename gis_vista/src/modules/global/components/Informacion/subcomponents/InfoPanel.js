import React from "react";
import Panel from "../../../../herramientas/FiltroAvanzado/subcomponents/Panel";
import TablaInformacion from "./TablaInformacion";
import ListaInformes from "./ListaInformes";
import {
    MemoryRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Reporte from "./Reporte";

const entries = ["/info", "/reporte"]

const InfoPanel = ({ feature }) => {

    const capa = feature.get('capa'),
        idCapa = parseInt(capa.get('id'))

    return (
        <div className="p-2 h-100 d-flex flex-column">
            <Panel
                className="rounded-0"
                open={true}
                title="Reportes"
                id="infoPanelReportes">
                <ListaInformes
                    idCapa={idCapa}
                />
            </Panel>
            <section className="flex-grow-1">
                <TablaInformacion
                    idCapa={idCapa}
                    feature={feature}
                />
            </section>
        </div>
    );
}

export default ({ feature }) => {

    return (
        <Router
            initialEntries={entries}
            initialIndex={0}
        >
            <Switch>
                <Route exact path="/info">
                    <InfoPanel feature={feature} />
                </Route>
                <Route path="/reporte/:idReporte">
                    <Reporte feature={feature} />
                </Route>
            </Switch>
        </Router>
    );
}