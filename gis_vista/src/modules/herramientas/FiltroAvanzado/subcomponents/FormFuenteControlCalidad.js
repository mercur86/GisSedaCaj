import React from 'react';
import gql from 'graphql-tag';
import SelectWithQuery from '../../../global/components/SelectWithQuery';
import AutocompleteWithQuery from './AutocompleteWithQuery';

const LISTA_TIPOS_DE_FUENTE = gql`
query tiposFuentesAbastecimiento{
    operaciones {
      listaTiposFuentesAbastecimiento{
        id
        nombre
      }
    }
  }
  
`;

const LISTA_FUENTES = gql`
query fuentesAbastecimiento($idProvincia: Int, $idDistrito: Int, $idTipoFuente: Int!) {
    operaciones {
      listaFuentesAbastecimiento(idProvincia: $idProvincia, idDistrito: $idDistrito, idTipoFuente: $idTipoFuente) {
        id
        nombre
      }
    }
  }  
`;

export default ({
    idProvincia,
    idDistrito,
    tipoFuente,
    fuentes,
    onChange
}) => {
    return (
        <div className="form">
            <div className="form-group">
                <label className="font-weight-bold">Tipo de fuente</label>
                <SelectWithQuery
                    className="form-control form-control-sm"
                    query={LISTA_TIPOS_DE_FUENTE}
                    valuesProperty="operaciones.listaTiposFuentesAbastecimiento"
                    optionLabel="nombre"
                    optionValue="id"
                    name="tipoFuente"
                    value={tipoFuente}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className="font-weight-bold">Fuente</label>
                <AutocompleteWithQuery
                    query={LISTA_FUENTES}
                    variables={{
                        idProvincia: parseInt(idProvincia),
                        idDistrito: parseInt(idDistrito),
                        idTipoFuente: parseInt(tipoFuente)
                    }}
                    valuesProperty="operaciones.listaFuentesAbastecimiento"
                    name="fuentes"
                    value={fuentes}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}