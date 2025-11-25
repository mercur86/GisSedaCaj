import { lazy } from 'react';

export const BUSCAR_CALLE = 'BUSCAR_CALLE',
    BUSCAR_HABILITACION_URBANA = 'BUSCAR_HABILITACION_URBANA',
    BUSCAR_USUARIO_POR_NOMBRE = 'BUSCAR_USUARIO_POR_NOMBRE',
    BUSCAR_USUARIO_POR_NUM_INSCRIPCION = 'BUSCAR_USUARIO_POR_NUM_INSCRIPCION',
    BUSCAR_USUARIO_POR_CODIGO_CATASTRAL = 'BUSCAR_USUARIO_POR_CODIGO_CATASTRAL',
    BUSCAR_USUARIO_POR_NUM_MEDIDOR = 'BUSCAR_USUARIO_POR_NUM_MEDIDOR',
    BUSCAR_MANZANA = 'BUSCAR_MANZANA',
    ADMINISTRAR_PERMISOS = 'ADMINISTRAR_PERMISOS',
    APROBAR_SOLICITUDES = 'APROBAR_SOLICITUDES',
    DAR_BAJA_USUARIO = 'DAR_BAJA_USUARIO',
    CAMBIAR_CONTRASENA = 'CAMBIAR_CONTRASENA',
    ESTILOS = 'ESTILOS',
    FILTRO_GEOMETRICO = 'FILTRO_GEOMETRICO',
    FILTRO_CQL = 'FILTRO_CQL',
    REGISTRAR_FUGA_RED_PRIMARIA_SECUNDARIA = 'REGISTRAR_FUGA_RED_PRIMARIA_SECUNDARIA',
    PERDIDAS_OPERACIONALES='PERDIDAS_OPERACIONALES',
    REPORTE_LIMPIEZA_MANTENIMIENTO_RESERVORIOS="REPORTE_LIMPIEZA_MANTENIMIENTO_RESERVORIOS",

    REGISTRAR_FUGA_CONEXION_DOMICILIARIA = 'REGISTRAR_FUGA_CONEXION_DOMICILIARIA',
    REPORTE_FUGAS = 'REPORTE_FUGAS',

    FORMULARIO_GEOREFERENCIAR_USUARIO = 'GEOREFERENCIAR_USUARIO',
    FORMULARIO_GEOREFERENCIAR_CAJA_AGUA = 'GEOREFERENCIAR_CAJA_AGUA',
    FORMULARIO_GEOREFERENCIAR_CAJA_DESAGUE = 'GEOREFERENCIAR_CAJA_DESAGUE',
    FORMULARIO_GEOREFERENCIAR_USUARIO_FACTIBLE_POTENCIAL = 'GEOREFERENCIAR_USUARIO_FACTIBLE_POTENCIAL',
    FORMULARIO_ELIMINAR_USUARIO_FACTIBLE_POTENCIAL = 'ELIMINAR_USUARIO_FACTIBLE_POTENCIAL',
    AGREGAR_MARCADOR = 'AGREGAR_MARCADOR',
    LOCALIZAR_COORDENADAS = 'LOCALIZAR_COORDENADAS',
    CONVERTIR_COORDENADAS = 'CONVERTIR_COORDENADAS',
    EXPORTAR_CAPA = 'EXPORTAR_CAPA',
    IMPORTAR_CAPA = 'IMPORTAR_CAPA',
    FILTRO_AVANZADO = 'FILTRO AVANZADO',
    PUNTOS_CONTROL_COMERCIAL = 'PUNTOS_CONTROL_COMERCIAL',
    PUNTOS_CONTROL_OPERACIONAL = 'PUNTOS_CONTROL_OPERACIONAL',
    LECTURAS_PUNTO_CONTROL = 'LECTURAS_PUNTO_CONTROL',
    REGISTRAR_CLANDESTINO = 'REGISTRAR_CLANDESTINO',
    DAR_ALTA_USUARIO = 'DAR_ALTA_USUARIO',
    ADMINISTRAR_VPAS = 'ADMINISTRAR_VPAS',
    CISTERNAS = 'CISTERNAS';

const tarea = {
    [DAR_ALTA_USUARIO]: {
        titulo: 'Dar alta a usuario',
        componente: lazy(() => import('../../../../modules/administrarUsuarios/components/DarAltaUsuario'))
    },
    [FORMULARIO_GEOREFERENCIAR_USUARIO]: {
        titulo: 'Georeferenciar usuario',
        componente: lazy(() => import(`../../../../modules/catastro/components/GeoreferenciarUsuario`)),
    },
    [FORMULARIO_GEOREFERENCIAR_CAJA_AGUA]: {
        titulo: 'Georeferenciar caja de agua',
        componente: lazy(() => import(`../../../../modules/catastro/components/GeoreferenciarCajaAgua`)),
    },
    [FORMULARIO_GEOREFERENCIAR_CAJA_DESAGUE]: {
        titulo: 'Georeferenciar caja desague',
        componente: lazy(() => import(`../../../../modules/catastro/components/GeoreferenciarCajaAguaDesague`)),
    },
    [FORMULARIO_ELIMINAR_USUARIO_FACTIBLE_POTENCIAL]: {
        titulo: 'Eliminar usuario factible potencial',
        componente: lazy(() => import(`../../../../modules/catastro/components/EliminarUsuarioFactiblePotencial`)),
    },
    [FORMULARIO_GEOREFERENCIAR_USUARIO_FACTIBLE_POTENCIAL]: {
        titulo: 'Georeferenciar usuario factible potencial',
        componente: lazy(() => import(`../../../../modules/catastro/components/GeoreferenciarUsuarioFactiblePotencial`)),
    },
    [BUSCAR_CALLE]: {
        componente: lazy(() => import(`../../../../modules/catastro/components/BuscarCalle`))
    },
    [BUSCAR_HABILITACION_URBANA]: {
        componente: lazy(() => import(`../../../../modules/catastro/components/BuscarHabilitacionUrbana`))
    },
    [BUSCAR_USUARIO_POR_NOMBRE]: {
        componente: lazy(() => import(`../../../../modules/catastro/components/BuscarUsuarioNombre`))
    },
    [BUSCAR_USUARIO_POR_NUM_INSCRIPCION]: {
        componente: lazy(() => import(`../../../../modules/catastro/components/BuscarUsuarioSuministro`))
    },
    [BUSCAR_USUARIO_POR_CODIGO_CATASTRAL]: {
        componente: lazy(() => import(`../../../../modules/catastro/components/BuscarUsuarioCodigoCatastral`))
    },
    [BUSCAR_USUARIO_POR_NUM_MEDIDOR]: {
        componente: lazy(() => import(`../../../../modules/catastro/components/BuscarUsuarioMedidor`))
    },
    [BUSCAR_MANZANA]: {
        componente: lazy(() => import(`../../../../modules/catastro/components/BuscarManzana`))
    },
    // Administrar usuarios
    [ADMINISTRAR_PERMISOS]: {
        componente: lazy(() => import('../../../../modules/administrarUsuarios/Permisos'))
    },
    [APROBAR_SOLICITUDES]: {
        componente: lazy(() => import(`../../../../modules/administrarUsuarios/components/AprobarSolicitudes`))
    },
    [DAR_BAJA_USUARIO]: {
        componente: lazy(() => import(`../../../../modules/administrarUsuarios/components/DarBajaUsuario`))
    },
    // Herramientas de sesion
    [CAMBIAR_CONTRASENA]: {
        componente: lazy(() => import(`../../../../modules/herramientasSesion/components/CambiarContrasena`)),
        titulo: 'Cambiar contraseña'
    },
    // Interaccion de capas
    [ESTILOS]: {
        titulo: 'Estilos',
        componente: lazy(() => import(`../../../../modules/herramientas/Estilos`))
    },
    [FILTRO_GEOMETRICO]: {
        titulo: 'Filtro Geométrico',
        componente: lazy(() => import(`../../../../modules/herramientas/FiltroGeometrico`))
    },
    [FILTRO_CQL]: {
        titulo: 'Filtrar con CQL',
        componente: lazy(() => import(`../../../../modules/herramientas/FiltroCQL`))
    },
    // Operaciones
    [REGISTRAR_FUGA_RED_PRIMARIA_SECUNDARIA]: {
        componente: lazy(() => import(`../../../../modules/operaciones/RegistrarFugaRedPrimariaSecundaria`))
    },
    [REGISTRAR_FUGA_CONEXION_DOMICILIARIA]: {
        componente: lazy(() => import(`../../../../modules/operaciones/RegistrarFugaConexionDomiciliaria`))
    },
    [REPORTE_FUGAS]: {
        componente: lazy(() => import(`../../../../modules/operaciones/reporteFugas`))
    },
    [PERDIDAS_OPERACIONALES]:{
        componente: lazy(() => import(`../../../../modules/operaciones/PerdidasOperacionales`))
    },
    [REPORTE_LIMPIEZA_MANTENIMIENTO_RESERVORIOS]:{
        componente: lazy(() => import(`../../../../modules/operaciones/reporteLimpiezaMantenimientosReservorios`))
    },
    
    // Herramientas
    [AGREGAR_MARCADOR]: {
        titulo: 'Agregar marcador',
        componente: lazy(() => import(`../../../../modules/catastro/components/AgregarMarcador`)),
        initProps: () => ({

        })
    },
    [LOCALIZAR_COORDENADAS]: {
        componente: lazy(() => import(`../../../../modules/catastro/components/LocalizarCoordenadas`))
    },
    [CONVERTIR_COORDENADAS]: {
        componente: lazy(() => import(`../../../../modules/catastro/components/ConvertirCoordenadas`))
    },
    [EXPORTAR_CAPA]: {
        componente: lazy(() => import(`../../../../modules/herramientas/ExportarArchivo`)),
        titulo: 'Exportar archivo'
    },
    [IMPORTAR_CAPA]: {
        titulo: 'Importar archivo',
        componente: lazy(() => import(`../../../../modules/herramientas/ImportarArchivo`))
    },
    [FILTRO_AVANZADO]: {
        componente: lazy(() => import(`../../../../modules/herramientas/FiltroAvanzado`)),
        titulo: 'Filtro avanzado'
    },
    [PUNTOS_CONTROL_COMERCIAL]: {
        componente: lazy(() => import(`../../../../modules/telemetria/PuntosControlPanel/PuntosDeControlComercial`))
    },
    [PUNTOS_CONTROL_OPERACIONAL]: {
        componente: lazy(() => import(`../../../../modules/telemetria/PuntosControlPanel/PuntosDeControlOperacional`))
    },
    [LECTURAS_PUNTO_CONTROL]: {
        titulo: 'Lecturas de punto de control',
        componente: lazy(() => import(`../../../../modules/telemetria/LecturasPuntoControl`))
    },
    [REGISTRAR_CLANDESTINO]: {
        titulo: 'Registrar clandestino',
        componente: lazy(() => import(`../../../../modules/comercial/components/RegistrarClandestino`))
    },
    [CISTERNAS]: {
        componente: lazy(() => import(`../../../../modules/operaciones/Cisternas`))
    },
    [ADMINISTRAR_VPAS]: {
        componente: lazy(() => import(`../../../../modules/operaciones/AdministrarVPAs`))
    }
};

const componentesSincronos = [];

export const resolveTarea = (componenteId) => ({
    ...tarea[componenteId],
    async: componentesSincronos.indexOf(componenteId) === -1
});