import { REGISTRAR_PERDIDA_OPERACIONAL,OBTENER_RESERVORIOS_BY_PROVDIST } from "./mutations";
import moment from 'moment';

const formatDate = (d) => moment(d).format('YYYY-MM-DD');
const formatTime = (tStr) => (moment(tStr, 'hh:mm a')).format('HH:mm:ss');
const formatDateTime = (d, tStr) => `${formatDate(d)} ${formatTime(tStr)} `;


const formatVariablesGuardar = ({
    id_provincia,
    id_distrito,
    id_reservorio,
    capacidad,
    radio_cuba,
    perdida_estimada,
    fecha_limpieza,
    dni_usuario,
    ...restOfData
}) => ({
    ...restOfData,
    id_provincia:parseInt(id_provincia),
    id_distrito: parseInt(id_distrito),
    id_reservorio,
    capacidad:parseFloat(capacidad),
    radio_cuba:parseFloat(radio_cuba),
    perdida_estimada:parseFloat(perdida_estimada),
    fecha_limpieza:formatDate(fecha_limpieza),
    dni_usuario
})

export const guardarPerdidaOperacion = (apollo, formData) => {
    const variables = formatVariablesGuardar(formData);
    return apollo.mutate({
        mutation: REGISTRAR_PERDIDA_OPERACIONAL,
        fetchPolicy: "no-cache",
        variables
    })
        .then(({ data }) => data.operaciones.registrarPerdidaOperacionalLimpiezaMantenimientoReservorio); 
}

export const checkFormIsFilledPO = ({
    id_provincia: prov,
    id_reservorio:resv,
    capacidad:capacidad,
    fecha_limpieza:fecha,
    radio_cuba:radio,
    perdida_estimada:perdida
}) => {
    if (prov=='0') throw new Error('Seleccione una provincia');
    if (resv=='0') throw new Error('Seleccione un distrito y posteriormente el reservorio');
    if (!capacidad) throw new Error('ingrese una capacidad');
    if (!radio) throw new Error('Ingrese el radio de la cuba del reservorio');
    if (!perdida) throw new Error('Debe calcular la perdida estimada');
    if (!fecha) throw new Error('Ingrese una fecha');
    return true;
}