import { INFORMACION, TAREAS } from "./mapper";

export const hasContentToShow = (tabId, store, map) => {    
    switch (tabId) {
        case TAREAS:
            return store.tareas.length !== 0;
        case INFORMACION:
            return map.haySeleccionados();
        default:
            return false;
    }
}