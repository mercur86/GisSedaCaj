import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Map from "./pages/Mapa";
import Login from "./pages/Login";
import { RouteWithAuth } from "./lib/auth";
import Alert, { TIPO_ALERTA } from "./lib/alerts";
import AppLoading from "./modules/global/components/AppLoading";
import Cisternas from "./pages/Cisternas";
import { RouteWithAuthPublic } from "./lib/auth/PrivateRoutePublic";
import { RouteWithAuthUserEncuestaPublic } from "./lib/auth/PrivateRouteUserEncuestaPublic";

const Error = ({ error }) => (
  <div className="p-2">
    <Alert tipo={TIPO_ALERTA.ERROR}>
      Error al cargar el sistema: {error.message}
    </Alert>
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <RouteWithAuth
            exact
            path="/"
            render={({ authenticated, error, loading }) => {
              if (loading) return <AppLoading />;
              if (error) return <Error error={error} />;
              if (!authenticated) return <Login />;
              return <Map />;
            }}
          />

          <RouteWithAuthPublic
            exact
            path="/public"
            render={({ authenticated, error, loading }) => {
              if (loading) return <AppLoading />;
              if (error) return <Error error={error} />;
              if (!authenticated) return <Login />;
              return <Map />;
            }}
          />
          <RouteWithAuthPublic
            exact
            path="/public/suministro/:suministroId"
            render={({ authenticated, error, loading, servicePublic }) => {
              if (loading) return <AppLoading />;
              if (error) return <Error error={error} />;
              if (!authenticated) return <Login />;
              return <Map servicePublic={servicePublic} />;
            }}
          />

          <RouteWithAuthUserEncuestaPublic
            exact
            path="/public/encuesta/:suministroencuestaId"
            render={({ authenticated, error, loading, servicePublic }) => {
              if (loading) return <AppLoading />;
              if (error) return <Error error={error} />;
              if (!authenticated) return <Login />;
              return <Map servicePublic={servicePublic} />;
            }}
          />

          <RouteWithAuthPublic
            exact
            path="/public/tuberia/:tuberiaId"
            render={({ authenticated, error, loading, servicePublic }) => {
              if (loading) return <AppLoading />;
              if (error) return <Error error={error} />;
              if (!authenticated) return <Login />;
              return <Map servicePublic={servicePublic} />;
            }}
          />
          {/* <RouteWithAuth
 						exact
 						path="/service/operacion/:operacion/suministro/:suministroId"
 						render={(prop) => {
 							const { authenticated, error, loading } = prop;
 							if (loading) return <AppLoading />
 							if (error) return <Error error={error} />;
 							if (!authenticated) return <Login />
 							return <Map { ...prop } />
 						}}
 					/> */}
          <Route exact path="/cisternas" component={Cisternas} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
