import React from "react";
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from "../../FilterButtons";
import Panel from "../subcomponents/Panel";
import FormUbicacion from "../subcomponents/FormUbicacion";
import { LABEL_UBICACION } from "../values";
import withFilter from "../withFilter";
import { CAPA_USUARIOS_SIN_SUMINISTRO } from "../../../values";
import FormInfoUsuarioSinSuministro from "../subcomponents/FormInfoUsuarioSinSuministro";
import { LABEL_SECCION_ESTADO_USER_SIN_SUMINISTRO } from "./values";

const FiltroUsuarioSinSuministro = ({
  parametros,
  handleChange,
  filtroHaCambiado,
  filtered,
  handleChangeFilter,
  handleRemoveFilter,
}) => {
  const {
    idProvincia,
    idDistrito,
    tipoUsuario,
    tipoConstruccion,
    predioHabitado
    // estadoPredio,
    // categoriaPredio,
    // tipoServicio,
    // tipoConstruccion,
    // minMontoDeuda,
    // maxMontoDeuda,
    // minMesDeuda,
    // maxMesDeuda,
    // origenConsumo,
    // minConsumo,
    // maxConsumo,
    // periodoGeorefFechaInf,
    // periodoGeorefFechaSup,
    // georeferenciadoXGIS,
    // variacionLectura,
  } = parametros;

  return (
    <div className="card border-filtro">
      <div className="form">
        <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
          <strong>Usuarios</strong>
          <ButtonGroup capa={true} className="card-header-actions">
            {() => {
              return (
                <React.Fragment>
                  <FiltrarBtn
                    className="btn-xs"
                    disabled={!filtroHaCambiado}
                    onClick={handleChangeFilter}
                  />
                  <QuitarFiltroBtn
                    className="btn-xs ml-1"
                    visible={filtered}
                    onClick={handleRemoveFilter}
                  />
                </React.Fragment>
              );
            }}
          </ButtonGroup>
        </div>
        <div className="card-body p-1">
          <Panel open={true} title={LABEL_UBICACION} id="FAUInfoUbicacion">
            <FormUbicacion
              idProvincia={idProvincia}
              idDistrito={idDistrito}
              onChange={handleChange}
            />
          </Panel>
          <Panel
            title={LABEL_SECCION_ESTADO_USER_SIN_SUMINISTRO}
            id="FAUInfoPredio"
          >
            <FormInfoUsuarioSinSuministro
              tipoUsuario={tipoUsuario}
              tipoConstruccion={tipoConstruccion}
              predioHabitado={predioHabitado}
              onChange={handleChange}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default withFilter(FiltroUsuarioSinSuministro, ({ map }) => ({
  capa: map.getCapaById(CAPA_USUARIOS_SIN_SUMINISTRO),
  capaKey: "usuariosSinSuministro",
}));
