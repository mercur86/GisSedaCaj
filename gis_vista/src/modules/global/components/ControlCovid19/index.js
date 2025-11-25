import React from 'react';
import {
    MemoryRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from 'react-router-dom';
import Prevencion from './Content/Prevencion';
import styled from 'styled-components';
import Cronograma from './Content/Cronograma';

const Body = styled.div`
    border-top:1px solid rgba(0,0,0,.1);
`;

const initialEntries = ["/prevencion", "/cronograma"];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });
    return (
        <div>
            <Link to={to}>{label}</Link>
            {match && <i className="ml-2 fas fa-hand-point-left"></i>}
        </div>
    );
}

export default () => (
    <Router
        initialEntries={initialEntries}
        initialIndex={0}
    >
        <div className="h-100 d-flex flex-column">
            <section className="p-2">
                <strong>Menú</strong>
                <ul className="mt-1 mb-0">
                    <li>
                        <MenuLink to="/prevencion" label="Prevención" />
                    </li>
                    <li>
                        <MenuLink to="/cronograma" label="Cronograma de desinfección" />
                    </li>
                </ul>
            </section>
            <Body className="p-2 flex-grow-1">
                <Switch>
                    <Route path="/prevencion">
                        <Prevencion />
                    </Route>
                    <Route exact path="/cronograma">
                        <Cronograma />
                    </Route>
                </Switch>
            </Body>
        </div>
    </Router>
)