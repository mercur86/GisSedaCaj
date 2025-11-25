import gql from 'graphql-tag';

export const DICCIONARIO_CAPA = gql`
query DiccionarioCapa($idCapa: Int!){
    sistema{
      diccionarioCapa(idCapa:$idCapa){
        id
        propiedad
        nombre: nombre_presentacion
        descripcion: definicion
        icono
      }
    }
  }
`;

export const INFORMES_CAPA_AUTORIZADOS = gql`
query informesAutorizados($idUsuario: ID,$capas: [ID!]!) {
  sistema {
    informesAutorizados: informesCapaAutorizadosUsuario(idUsuario: $idUsuario)
    informesCapas(capas:$capas){
      id
      nombre
      nombre_corto
    }
  }
}
`