import moment from 'moment';
import { ELIMINAR_FUGAS, LISTA_FUGAS } from './queries';

const formatData = ({
    idProvincia,
    idDistrito,
    fechaInicial,
    fechaFinal,
    filtroFecha
}) => {

    const idProv = parseInt(idProvincia),
        idDist = parseInt(idDistrito);

    return {
        idProvincia: idProv ? idProv : null,
        idDistrito: idDist ? [idDist] : null,
        fechaInicial: moment(fechaInicial).format('YYYY-MM-DD'),
        fechaFinal: moment(fechaFinal).format('YYYY-MM-DD'),
        filtroFecha
    }
}

export const getListaFugas = (apollo, formData) => {

    const variables = formatData(formData);

    return apollo.query({
        query: LISTA_FUGAS,
        variables,
        fetchPolicy: "network-only"
    }).then(({ data }) => data.operaciones.fugasAnf)

}

export const eliminarFugas = (apollo, idsFugas) => {

    return apollo.mutate({
        mutation: ELIMINAR_FUGAS,
        variables: { idsFugas }
    });
}