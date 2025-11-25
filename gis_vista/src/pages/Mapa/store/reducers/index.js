import {
    INTERACION_ACTION,
    SIDEBAR_ACTION,
    TAREAS_ACTION,
    FILTRO_AVANZADO_ACTION,
    STREET_VIEW_ACTION,
    REPORTES_ESTADISTICOS_ACTION
} from "../actions";
import interactionReducer from "./interactionReducer";
import sidebarReducer from "./sidebarReducer";
import tareasReducer from "./tareasReducer";
import filtroAvanzadoReducer from "./filtroAvanzadoReducer";
import streetViewReducer from "./streetViewReducer";
import reportesEstadisticosReducer from "./reportesEstadisticosReducer";

export default (state, action) => {
    switch (action.class) {
        case INTERACION_ACTION:
            return interactionReducer(state, action);
        case SIDEBAR_ACTION:
            return sidebarReducer(state, action);
        case TAREAS_ACTION:
            return tareasReducer(state, action);
        case FILTRO_AVANZADO_ACTION:
            return filtroAvanzadoReducer(state, action);
        case STREET_VIEW_ACTION:
            return streetViewReducer(state, action);
        case REPORTES_ESTADISTICOS_ACTION:
            return reportesEstadisticosReducer(state, action);
        default:
            return state;
    }
}