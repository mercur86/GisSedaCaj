import React from "react";
import ListaReportes from "./subcomponents/ListaReportes";
import {
    MemoryRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import AggregationReport from "./subcomponents/AggregationReport";

const entries = ["/reports"];

export default () => (
    <Router
        initialEntries={entries}
        initialIndex={0}
    >
        <Switch>
            <Route exact path="/reports">
                <ListaReportes />
            </Route>
            <Route path="/reports/:reportId">
                <AggregationReport />
            </Route>
        </Switch>
    </Router>
)