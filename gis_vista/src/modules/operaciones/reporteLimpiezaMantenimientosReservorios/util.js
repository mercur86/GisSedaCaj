import moment from 'moment';
import {  LISTA_LIMP_MANT_RESERVORIOS } from './queries';

const formatData = ({
    idProvincia,
    idDistrito,
    fechaInicial,
    fechaFinal
}) => {

    const idProv = parseInt(idProvincia),
        idDist = parseInt(idDistrito);

    return {
        idProvincia: idProv ? idProv : null,
        idDistrito: idDist ? idDist : null,
        fechaInicial: moment(fechaInicial).format('YYYY-MM-DD'),
        fechaFinal: moment(fechaFinal).format('YYYY-MM-DD')
    }
}

export const getListaLimpMantReservorio = (apollo, formData) => {

    const variables = formatData(formData);

    return apollo.query({
        query: LISTA_LIMP_MANT_RESERVORIOS,
        variables,
        fetchPolicy: "network-only"
    }).then(({ data }) => data.operaciones.limpMantReserorios)

}
