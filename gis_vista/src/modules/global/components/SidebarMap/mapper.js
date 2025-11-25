import Tareas from "../Tareas";
import Medicion from "../Medicion";
import Capas from "../../../catastro/components/Capas";
import Informacion from "../Informacion";
import LeyendaMapa from "../LeyendaMapa";
import Impresion from "../Impresion";
import Reportes from "../Reportes";
import StreetView from '../StreetView';
import ControlCovid19 from "../ControlCovid19";
import PanelEstadisticas from "../../../estadistica/components/PanelEstadisticas";


export const TAREAS = 'TAREAS',
    MEDICION = 'MEDICION',
    CAPAS = 'CAPAS',
    INFORMACION = 'INFORMACION',
    LEYENDA = 'LEYENDA',
    IMPRESION = 'IMPRESION',
    REPORTES = 'REPORTES',
    STREET_VIEW = 'STREET_VIEW',
    COVID19 = 'COVID19',
    ESTADISTICA = 'ESTADISTICA';

const componente = {
    [TAREAS]: Tareas,
    [MEDICION]: Medicion,
    [CAPAS]: Capas,
    [INFORMACION]: Informacion,
    [LEYENDA]: LeyendaMapa,
    [IMPRESION]: Impresion,
    [REPORTES]: Reportes,
    [STREET_VIEW]: StreetView,
    [COVID19]: ControlCovid19,
    [ESTADISTICA]: PanelEstadisticas
};

export const resolveComponente = (componenteId) => componente[componenteId]