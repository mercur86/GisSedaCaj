import moment from "moment";

/** helpers */

const getFiltroLista = (lista, field = "nombre") => {
  return lista.map((e) => `'${e[field]}'`).join(",");
};

const getFiltroPeriodo = (propiedad, fechaInicial, fechaFinal) => {
  const conds = [];
  let cond = "";
  if (fechaInicial) {
    if (fechaInicial instanceof Date) {
      conds.push(
        `${propiedad} >= '${moment(fechaInicial).format("YYYY-MM-DD")}'`
      );
    } else {
      conds.push(`${propiedad} >= '${fechaInicial}'`);
    }
  }
  if (fechaFinal) {
    if (fechaFinal instanceof Date) {
      conds.push(
        `${propiedad} <= '${moment(fechaFinal).format("YYYY-MM-DD")}'`
      );
    } else {
      conds.push(`${propiedad} <= '${fechaFinal}'`);
    }
  }

  cond = conds.join(" AND ");
  if (conds.length > 1) {
    cond = `(${cond})`;
  }
  return cond;
};

const getFiltroMinMax = (propiedad, min, max) => {
  const conds = [];
  let cond = "";

  if (min) {
    conds.push(`${propiedad} >= ${min}`);
  }
  if (max) {
    conds.push(`${propiedad} <= ${max}`);
  }

  cond = conds.join(" AND ");
  if (conds.length > 1) {
    cond = `(${cond})`;
  }

  return cond;
};

const generarAnioAntiguedad = (numero) => {
  return moment().subtract(numero, "year").format("YYYY");
};

const getFiltroAntiguedadTuberia = (
  aniosAntiguedad,
  anioInicial,
  anioFinal,
  filtrarPorIntervalo
) => {
  if (filtrarPorIntervalo) {
    return getFiltroPeriodo("anyo", anioInicial, anioFinal);
  } else if (aniosAntiguedad) {
    const anioAntiguedad = generarAnioAntiguedad(parseInt(aniosAntiguedad));
    return `anyo >= ${anioAntiguedad}`;
  }
  return null;
};

/** end helpers */
const usuariosSinSuministro = (params) => {
  const { idProvincia, idDistrito, tipoUsuario, tipoConstruccion, predioHabitado } = params;
  const conds = [];
  if (parseInt(idProvincia)) conds.push(`id_prov = ${idProvincia}`);
  if (parseInt(idDistrito)) conds.push(`id_dist = ${idDistrito}`);
  if (tipoUsuario.length)
    conds.push(`tipo_usuario IN (${getFiltroLista(tipoUsuario)})`);
  if (tipoConstruccion.length)
    conds.push(`tipo_construccion IN (${getFiltroLista(tipoConstruccion)})`);

  if (predioHabitado) conds.push(`predio_habitado = true`);
  return conds.join(" AND ");
};

const usuarios = (params) => {
  const {
    idProvincia,
    idDistrito,
    estadoPredio,
    tipoServicio,
    tipoConstruccion,
    categoriaPredio,
    periodoGeorefFechaInf,
    periodoGeorefFechaSup,
    georeferenciadoXGIS,
    origenConsumo,
    minConsumo,
    maxConsumo,
    variacionLectura,
    minMontoDeuda,
    maxMontoDeuda,
    minMesDeuda,
    maxMesDeuda,
  } = params;

  const conds = [];
  let fPeriodoGeoref = "";

  if (parseInt(idProvincia)) conds.push(`id_provincia = ${idProvincia}`);
  if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`);

  if (estadoPredio.length)
    conds.push(`estado_predio IN (${getFiltroLista(estadoPredio)})`);
  if (tipoServicio.length)
    conds.push(`tipo_servicio IN (${getFiltroLista(tipoServicio)})`);
  if (tipoConstruccion.length)
    conds.push(`tipo_construccion IN (${getFiltroLista(tipoConstruccion)})`);
  if (categoriaPredio.length)
    conds.push(`categoria IN (${getFiltroLista(categoriaPredio)})`);
  if (origenConsumo.length)
    conds.push(
      `origen_consumo_periodo_actual IN (${getFiltroLista(origenConsumo)})`
    );
  if (variacionLectura)
    conds.push(`indicador_variacion_lectura = '${variacionLectura}'`);

  const fConsumo = getFiltroMinMax(
    "consumo_periodo_actual",
    minConsumo,
    maxConsumo
  );
  if (fConsumo) conds.push(fConsumo);

  fPeriodoGeoref = getFiltroPeriodo(
    "fecha_georeferenciacion",
    periodoGeorefFechaInf,
    periodoGeorefFechaSup
  );
  if (fPeriodoGeoref) conds.push(fPeriodoGeoref);

  if (georeferenciadoXGIS) conds.push(`geo_gis = true`);

  const fMontoDeuda = getFiltroMinMax(
    "monto_deuda",
    minMontoDeuda,
    maxMontoDeuda
  );
  if (fMontoDeuda) conds.push(fMontoDeuda);

  const fMesDeuda = getFiltroMinMax(
    "num_meses_deuda",
    minMesDeuda,
    maxMesDeuda
  );
  if (fMesDeuda) conds.push(fMesDeuda);

  return conds.join(" AND ");
};

const suministrosI3 = (params) => {
  const {
    idProvincia,
    idDistrito,
    estadoPredio,
    categoriaPredio,
    sectorComercial,
    estadoUsuarioI3,
    tipoServicio,
    minMontoDeuda,
    maxMontoDeuda,
    minMesDeuda,
    maxMesDeuda, //prioridad, situacionConexionAgua,
    // idPrioridad,
    // situacionConAgua
  } = params;

  const conds = [];
  // let fPeriodoGeoref = '';

  if (parseInt(idProvincia)) conds.push(`id_provincia = ${idProvincia}`);
  if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`);

  if (estadoPredio.length)
    conds.push(`estado_predio IN (${getFiltroLista(estadoPredio)})`);
  if (tipoServicio.length)
    conds.push(`tipo_servicio IN (${getFiltroLista(tipoServicio)})`);
  if (categoriaPredio.length)
    conds.push(`categoria IN (${getFiltroLista(categoriaPredio)})`);
  if (sectorComercial.length)
    conds.push(`id_sector IN (${getFiltroLista(sectorComercial, "id")})`);
  if (estadoUsuarioI3.length)
    conds.push(
      `id_estado_suministro_i3 IN (${getFiltroLista(estadoUsuarioI3, "id")})`
    );
  // if (origenConsumo.length) conds.push(`origen_consumo_periodo_actual IN (${getFiltroLista(origenConsumo)})`);
  // if (variacionLectura) conds.push(`indicador_variacion_lectura = '${variacionLectura}'`);

  const fMontoDeuda = getFiltroMinMax(
    "monto_deuda",
    minMontoDeuda,
    maxMontoDeuda
  );
  if (fMontoDeuda) conds.push(fMontoDeuda);

  const fMesDeuda = getFiltroMinMax("meses_deuda", minMesDeuda, maxMesDeuda);
  if (fMesDeuda) conds.push(fMesDeuda);

  // const fConsumo = getFiltroMinMax('consumo_periodo_actual', minConsumo, maxConsumo);
  // if (fConsumo) conds.push(fConsumo);

  // fPeriodoGeoref = getFiltroPeriodo('fecha_georeferenciacion', periodoGeorefFechaInf, periodoGeorefFechaSup);
  // if (fPeriodoGeoref) conds.push(fPeriodoGeoref);

  // if (georeferenciadoXGIS) conds.push(`geo_gis = true`);

  return conds.join(" AND ");
};

const tuberiasAgua = (params) => {
  const conds = [];
  const {
    idProvincia,
    idDistrito,
    material,
    funcion,
    tipo,
    anioInicial,
    anioFinal,
    aniosAntiguedad,
    filtrarPorIntervalo,
  } = params;
  let fAntiguedad = "";

  if (parseInt(idProvincia)) conds.push(`id_provincia = ${idProvincia}`); // provincia
  if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`); // distrito

  if (material.length) conds.push(`material IN (${getFiltroLista(material)})`); // material
  if (funcion.length)
    conds.push(`tipo_funcion IN (${getFiltroLista(funcion)})`); // función
  if (tipo.length) conds.push(`tipo IN (${getFiltroLista(tipo)})`); // tipo

  // Antigüedad
  fAntiguedad = getFiltroAntiguedadTuberia(
    aniosAntiguedad,
    anioInicial,
    anioFinal,
    filtrarPorIntervalo
  );
  if (fAntiguedad) conds.push(fAntiguedad);

  return conds.join(" AND ");
};

const tuberiasAlcantarillado = (params) => {
  const conds = [];
  const {
    idProvincia,
    idDistrito,
    material,
    tipo,
    anioInicial,
    anioFinal,
    aniosAntiguedad,
    filtrarPorIntervalo,
  } = params;
  let fAntiguedad = "";

  if (parseInt(idProvincia)) conds.push(`id_ciudad = ${idProvincia}`); // provincia
  if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`); // distrito

  if (material.length) conds.push(`material IN (${getFiltroLista(material)})`); // material
  if (tipo.length) conds.push(`tipo IN (${getFiltroLista(tipo)})`); // tipo

  fAntiguedad = getFiltroAntiguedadTuberia(
    aniosAntiguedad,
    anioInicial,
    anioFinal,
    filtrarPorIntervalo
  );
  if (fAntiguedad) conds.push(fAntiguedad);

  return conds.join(" AND ");
};

const problemas = (parametros) => {
  const conds = [];
  const {
    idProvincia,
    idDistrito,
    tipologia,
    detalle,
    alcance,
    periodoRegistroFechaInf,
    periodoRegistroFechaSup,
    atendido,
    enElPlazo,
  } = parametros;
  let fPeriodoRegistro = "";

  if (parseInt(idProvincia)) conds.push(`id_provincia = ${idProvincia}`);
  if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`);

  if (tipologia.length)
    conds.push(`id_tipologia_problema IN (${getFiltroLista(tipologia, "id")})`);
  if (detalle.length)
    conds.push(
      `id_corr_tipo_reclamo_problema IN (${getFiltroLista(detalle, "id")})`
    );
  if (alcance.length)
    conds.push(`id_tipo_problema_t IN (${getFiltroLista(alcance, "id")})`);

  fPeriodoRegistro = getFiltroPeriodo(
    "fecha",
    periodoRegistroFechaInf,
    periodoRegistroFechaSup
  );
  if (fPeriodoRegistro) conds.push(fPeriodoRegistro);

  if (atendido !== null) conds.push(`flag_pendiente = ${atendido}`);
  if (enElPlazo !== null) conds.push(`plazo_vencido = ${enElPlazo}`);

  console.log("SQl PROBLEMAS: ", conds.join(" AND "));
  return conds.join(" AND ");
};

const reclamos = (parametros) => {
  console.log("Reclamos parametros:");
  console.log(parametros);

  const conds = [];
  const {
    idProvincia,
    idDistrito,
    tipoReclamo,
    estadoReclamo,
    periodoRegistroFechaInf,
    periodoRegistroFechaSup,
  } = parametros;
  let fPeriodoRegistro = "";

  if (parseInt(idProvincia)) conds.push(`id_provincia = ${idProvincia}`);
  if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`);

  console.log("tipoReclamo:", tipoReclamo);
  console.log("estadoReclamo:", estadoReclamo);
  if (tipoReclamo.length)
    conds.push(`id_tipo_reclamo IN (${getFiltroLista(tipoReclamo, "id")})`);
  if (estadoReclamo.length)
    conds.push(
      `estado_reclamo IN (${getFiltroLista(estadoReclamo, "nombre")})`
    );

  fPeriodoRegistro = getFiltroPeriodo(
    "fecha_reclamo",
    periodoRegistroFechaInf,
    periodoRegistroFechaSup
  );
  if (fPeriodoRegistro) conds.push(fPeriodoRegistro);

  // if (atendido !== null) conds.push(`flag_pendiente = ${atendido}`);
  // if (enElPlazo !== null) conds.push(`plazo_vencido = ${enElPlazo}`);
  console.log("SQl RECLAMOS: ", conds.join(" AND "));
  return conds.join(" AND ");
};

const puntosControlCalidad = (parametros) => {
  //console.log(parametros);
  const conds = [];
  const {
    idProvincia,
    idDistrito,
    parametro,
    valorMinimo,
    valorMaximo,
    fechaInfLectura,
    fechaSupLectura,
    tipoFuente,
    fuentes,
  } = parametros;
  let fPeriodoLectura = "",
    fMinMax = "";

  if (parseInt(idProvincia)) conds.push(`id_provincia = ${idProvincia}`);
  if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`);
  if (parametro.length)
    conds.push(`id_parametro IN (${getFiltroLista(parametro, "id")})`);

  fMinMax = getFiltroMinMax("valor", valorMinimo, valorMaximo);
  fPeriodoLectura = getFiltroPeriodo(
    "fecha_registro",
    fechaInfLectura,
    fechaSupLectura
  );

  if (fMinMax) conds.push(fMinMax);
  if (fPeriodoLectura) conds.push(fPeriodoLectura);

  if (tipoFuente) conds.push(`id_tipo_fuente_abastecimiento = ${tipoFuente}`);
  if (fuentes.length)
    conds.push(`codigo IN (${getFiltroLista(fuentes, "id")})`);

  return conds.join(" AND ");
};

export default {
  usuarios,
  usuariosSinSuministro,
  suministrosI3,
  tuberiasAgua,
  tuberiasAlcantarillado,
  problemasOperacionales: problemas,
  problemasComerciales: problemas,
  reclamosOperacionales: reclamos,
  puntosControlCalidad: puntosControlCalidad,
};
