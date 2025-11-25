import React, { useState, useEffect } from "react";
import { Dropdown as PDropdown } from "primereact/dropdown";
import gql from 'graphql-tag';
import { useApolloClient } from "react-apollo-hooks";
import styled from "styled-components";

const createFakeDistChangeEvent = (optionValue) => ({
    originalEvent: null,
    value: optionValue,
    target: {
        name: "idDistrito",
        id: undefined,
        value: optionValue
    }
});

const Dropdown = styled(PDropdown)`
    & label.p-dropdown-label.p-inputtext {
        line-height: 1.2 !important;
    }
`;

const GET_DISTRITOS_PROVINCIAS = gql`
query getDistritosDeProvincia($idProvincia: Int!){
    catastro{
      getDistritosDeProvincia(idProvincia:$idProvincia){
        code: id
        name: nombre
      }
    }
  }
`;

const provDefItem = { name: "TODA LA EMPRESA", code: 0 };

const provincias = [
    provDefItem,
    { name: "PIURA", code: 1 },
    { name: "MORROPÓN", code: 4 },
    { name: "PAITA", code: 5 },
    { name: "SULLANA", code: 6 },
    { name: "TALARA", code: 7 },
]

const getDistritos = (apolloClient, idProvincia) => {
    return apolloClient.query({
        fetchPolicy: "network-only",
        query: GET_DISTRITOS_PROVINCIAS,
        variables: { idProvincia: parseInt(idProvincia) }
    })
        .then(({ data }) => data.catastro.getDistritosDeProvincia);
}

const ProvDistSelector = ({
    provincia,
    distrito,
    onChange: handleChange
}) => {

    const [distritos, setDistritos] = useState([]);
    const [loading, setLoading] = useState(false);
    const apolloClient = useApolloClient();

    useEffect(() => {
        if (provincia) {
            setLoading(true);
            getDistritos(apolloClient, provincia.code)
                .then(dists => setDistritos(dists))
                .finally(() => setLoading(false));
        }

    }, [apolloClient, provincia]);

    function handleProvChange(e) {
        handleChange(e);
        handleChange(createFakeDistChangeEvent(null));
    }

    return (
        <div className="form">
            <div className="form-group">
                <label className="font-weight-bold">Provincia</label>
                <Dropdown
                    placeholder="Seleccione"
                    className="form-control form-control-sm p-0"
                    options={provincias}
                    name="provincia"
                    value={provincia}
                    onChange={handleProvChange}
                    optionLabel="name"
                />
            </div>
            <div className="form-group">
                <label className="font-weight-bold">Distrito</label>
                <Dropdown
                    disabled={loading}
                    placeholder="Seleccione"
                    className="form-control form-control-sm p-0"
                    options={distritos}
                    name="distrito"
                    optionLabel="name"
                    value={distrito}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
};

export default ProvDistSelector;