import gql from 'graphql-tag';

export const DAR_ALTA_USUARIO = gql`
mutation darAltaUsuario($idUsuario: Int!){
    sistema{
      darAltaUsuario(idUsuario:$idUsuario)
    }
  }
`;

