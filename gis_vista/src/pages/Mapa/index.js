import React from "react";
import DataProvider from "./components/DataProvider";
import App from "./App";
import { MyApolloProvider } from "./apollo";
import client from "./apollo/client";
import { LoadScript } from "@react-google-maps/api";

export default ({ servicePublic }) => {
  return (
    <MyApolloProvider client={client}>
      <LoadScript
        googleMapsApiKey="AIzaSyD8pHOVvg8_rbh1dOz8jXwuV-AxLlMZBOY" // AIzaSyAecccog4G_o-W9EdopUQU1CZJhU8HQSOU
        libraries={["places"]}
      >
        <DataProvider>
          {(appData) => <App appData={appData} servicePublic={servicePublic} />}
        </DataProvider>
      </LoadScript>
    </MyApolloProvider>
  );
};
