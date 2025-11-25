import { lazy } from "react";

const LECTURAS_USUARIO = '1',
    FACTURACION_USUARIO = '2',
    CONSUMOS_USUARIO = '3',
    INSPECCIONES_VMA = '4',
    FICHA_CATASTRAL_USUARIO = '5',
    MANTENIMIENTOS_TUBERIA_AGUA = '6',
    FUGAS_TUBERIA_AGUA = '7',
    MANTENIMIENTOS_TUBERIA_ALCANTARILLADO = '8',
    LECTURAS_PUNTOS_CONTROL_CALIDAD = '9',
    LECTURAS_PUNTOS_MUESTREO = '10';

const reporte = {
    [LECTURAS_USUARIO]: lazy(() => import("../../../../comercial/components/LecturasUsuario")),
    [FACTURACION_USUARIO]: lazy(() => import("../../../../comercial/components/FacturacionUsuario")),
    [CONSUMOS_USUARIO]: lazy(() => import("../../../../comercial/components/GraficoConsumos")),
    [INSPECCIONES_VMA]: lazy(() => import("../../../../comercial/components/InspeccionesVMA")),
    [FICHA_CATASTRAL_USUARIO]: lazy(() => import("../../../../comercial/components/FichaCatastralUsuario")),
    [MANTENIMIENTOS_TUBERIA_AGUA]: lazy(() => import("../../../../operaciones/MantenimientosTuberias")),
    [MANTENIMIENTOS_TUBERIA_ALCANTARILLADO]: lazy(() => import("../../../../operaciones/MantenimientosTuberias")),
    [FUGAS_TUBERIA_AGUA]: lazy(() => import("../../../../operaciones/FugasTuberias")),
    [LECTURAS_PUNTOS_CONTROL_CALIDAD]: lazy(() => import("../../../../operaciones/LecturasControlCalidad")),
    [LECTURAS_PUNTOS_MUESTREO]: lazy(() => import("../../../../operaciones/LecturasPuntosMuestreo"))
};

export const getReporte = (idReporte) => reporte[idReporte]