import gql from 'graphql-tag';

export const ELIMINAR_USUARIO_FACTIBLE_POTENCIAL = gql`
mutation eliminarUsuarioFactiblePotencial(
  $gid: Int!
)
{
  catastro{
    eliminarUsuarioFactiblePotencial(
        gid:$gid
    )
  }
}
`;