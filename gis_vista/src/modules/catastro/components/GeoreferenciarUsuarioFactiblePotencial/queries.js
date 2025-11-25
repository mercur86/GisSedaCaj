import gql from 'graphql-tag';

export const BUSCAR_DATOS_DEFECTO_USUARIO_POTENCIAL = gql`
query buscarDatosDefectoUsuarioPotencial($numInscripcion: Int!){
  catastro{
    buscarDatosDefectoUsuarioPotencial(numInscripcion:$numInscripcion) {
      id_prov
      id_dist
      sector
      id_manzana
      manzana_municipal
      nombre_zona
    }
  }
}
`;