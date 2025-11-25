import { lazy } from "react";

const NUEVO_REPORTE = 0,
    CONSUMO_USUARIOS = 1,
    CONSUMO_HABILITACIONES_URBANAS = 2;

const reporte = {
    [NUEVO_REPORTE]: lazy(() => import("../components/NuevoReporte")),
    [CONSUMO_USUARIOS]: lazy(() => import("./DistribucionConsumo")),
    [CONSUMO_HABILITACIONES_URBANAS]: lazy(() => import("./DistribucionConsumoHabUrbanas"))
};

export const getReporte = (idReporte) => reporte[idReporte]