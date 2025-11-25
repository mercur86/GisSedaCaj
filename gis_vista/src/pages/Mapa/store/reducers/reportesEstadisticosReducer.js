import { AGREGAR_NUEVO_REPORTE, CERRAR_REPORTE, ABRIR_REPORTE } from "../actions";

export default (state, action) => {
    switch (action.type) {
        case AGREGAR_NUEVO_REPORTE:
            return {
                ...state,
                reportes: state.reportes.concat({ id: 0, titulo: "Nuevo Reporte" })
            };
        case CERRAR_REPORTE:
            return {
                ...state,
                reportes: state.reportes.filter((_, idx) => idx !== action.indiceReporte)
            }
        case ABRIR_REPORTE:
            return {
                ...state,
                reportes: state.reportes.concat(action.reporte)
            }
        default:
            return state;
    }
}