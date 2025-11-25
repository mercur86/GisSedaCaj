import React, { useState, useRef, useEffect } from "react";
import { useApolloClient } from "react-apollo-hooks";
import MarcadorOL from "../../../global/components/MarcadorOL";
import ButtonAction from "../../../global/components/ButtonAction";
import { type, LABEL_ACEPTAR, LABEL_CANCELAR } from "../../../global/values";
import {
  LABEL_SUMINISTRO,
  PCHR_INGRESE_SUMINISTRO,
  PCHR_INGRESE_DISTANCIA_CAJA_AGUA,
  TITULO_GEOREFERENCIAR_USUARIO_CAJA,
  LABEL_DISTANCIA_CAJA_AGUA,
  MSJ_CONFIRMAR_MOVER_CAJA_AGUA,
  TITULO_MOVER_CAJA_AGUA,
  LABEL_GUARDAR,
  PCHR_INGRESE_DISTANCIA_CAJA_EXTERIOR_IZQUIERA_DERECHA,
  LABEL_DISTANCIA_CAJA_EXTERIOR_IZQUIERA_DERECHA,
  TITULO_ACTUALIZAR_USUARIO_CAJA,
  LABEL_UBICACION_CAJA,
  LABEL_DISTANCIA_CAJA_INTERIOR_IZQUIERA_DERECHA,
  PCHR_INGRESE_DISTANCIA_CAJA_INTERIOR_IZQUIERA_DERECHA,
} from "./values";
import { SaveIcon, LoadingIcon } from "../../../../lib/icons";
import LabelCoordenadas from "./subcomponents/LabelCoordenas";
import {
  MOVER_CAJA_AGUA,
  GEOREFERENCIAR_CAJA_AGUA_USUARIO,
  ACTUALIZAR_CAJA_AGUA_USUARIO,
} from "./mutations";
import marker from "../../../../assets/img/marker9.png";
import { mapStoreToProps } from "../../../../pages/Mapa/store/Store";
import Swal from "sweetalert2";
import { CAPA_CAJA_AGUA } from "../../../values";
import FeatureSelector from "../../../global/components/FeatureSelector";
import InputGidCajaAgua from "./subcomponents/InputGidCajaAgua";
import { checkFormIsFilled } from "./util";
import Alert, { mensajeInicial, TIPO_ALERTA } from "../../../../lib/alerts";

const msgConfirmation = {
  icon: "question",
  showCancelButton: true,
  confirmButtonText: LABEL_ACEPTAR,
  cancelButtonText: LABEL_CANCELAR,
};

function formatData(state, coordenadas) {
  return {
    gid: parseInt(state.gid),
    numInscripcion: parseInt(state.numInscripcion),
    nroFicha: parseInt(state.nroFicha) || null,
    distanciaCajaExteriorPredio: parseInt(state.distanciaCajaExteriorPredio),
    distanciaExteriorIzquierdaDerecha: parseInt(
      state.distanciaExteriorIzquierdaDerecha
    ),
    distanciaCajaInteriorDentroFuera: parseInt(
      state.distanciaCajaInteriorDentroFuera
    ),
    coordenadas,
  };
}

const initialFormData = {
  numInscripcion: "",
  distanciaCajaExteriorPredio: "",
  distanciaExteriorIzquierdaDerecha: "",
  distanciaCajaInteriorDentroFuera: "",
  nroFicha: "",
  gid: "",
};
const SELECCION_CAJA_AGUA = "SELECCIONAR_CAJA_AGUA";

const GeoreferenciarUsuario = ({
  markerInitPos,
  capaUsuarios,
  storeContext: { map },
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState(mensajeInicial);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [showInteriorPredio, setShowInteriorPredio] = useState(false);
  const [coord, setCoord] = useState(markerInitPos);
  const marcadorRef = useRef(null);
  const client = useApolloClient();

  useEffect(() => {
    capaUsuarios.setVisible(true);
  }, [capaUsuarios]);

  function handleChangeChecbox(e) {
    const name = e.target.name,
      checked = e.target.checked;

    switch (name) {
      case "update":
        setUpdate(checked);
        if (!checked) {
          setFormData(initialFormData);
        }
        break;
      case "showInteriorPredio":
        setShowInteriorPredio(checked);
        if (checked) {
          setFormData((current) => ({
            ...current,
            distanciaCajaExteriorPredio: "",
            distanciaExteriorIzquierdaDerecha: "",
          }));
        } else {
          setFormData((current) => ({
            ...current,
            distanciaCajaInteriorDentroFuera: "",
          }));
        }
        break;
      default:
        break;
    }
  }

  function handleChangeInput(e) {
    const name = e.target.name,
      value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      checkFormIsFilled(formData, update, showInteriorPredio);
      setMensaje({ texto: "", tipo: "" });
      confirmarGuardar();
    } catch (error) {
      setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ADVERTENCIA });
    }
  }

  function actualizarCajaAgua() {
    setLoading(true);
    const coordenadas = marcadorRef.current.getCoordinate();
    const variables = formatData(formData, coordenadas);

    client
      .mutate({
        mutation: ACTUALIZAR_CAJA_AGUA_USUARIO,
        variables,
      })
      .then(({ data }) => {
        const { mensaje, codigo_respuesta } =
          data.catastro.actualizarCajaAguaUsuario;
        if (codigo_respuesta === 1) {
          Swal.fire("¡Buen trabajo!", mensaje, "success");
        } else {
          Swal.fire("Algo salió mal :(", mensaje, "error");
        }
      })
      .catch((error) => Swal.fire("Algo salió mal :(", error.message, "error"))
      .finally(() => setLoading(false));
  }

  function georeferenciarCajaAguaUsuario() {
    setLoading(true);
    const coordenadas = marcadorRef.current.getCoordinate();
    const variables = formatData(formData, coordenadas);
    delete variables.gid; // eliminamos gid porque no se necesita
    client
      .mutate({
        mutation: GEOREFERENCIAR_CAJA_AGUA_USUARIO,
        variables,
      })
      .then(({ data }) => {
        const { mensaje, codigo_respuesta } =
          data.catastro.georeferenciarCajaAguaUsuario;
        if (codigo_respuesta === 0) {
          confirmarMoverUsuario(variables);
        } else {
          Swal.fire("¡Buen trabajo!", mensaje, "success");
        }
      })
      .catch((error) => Swal.fire("Algo salió mal :(", error.message, "error"))
      .finally(() => setLoading(false));
  }

  function confirmarGuardar() {
    Swal.fire({
      ...msgConfirmation,
      title: update
        ? TITULO_ACTUALIZAR_USUARIO_CAJA
        : TITULO_GEOREFERENCIAR_USUARIO_CAJA,
      text: update
        ? `¿Deseas actualizar caja de agua gid ${formData.gid}?`
        : `¿Deseas georeferenciar caja de agua con suministro '${formData.numInscripcion}' en esta ubicación?`,
    }).then((result) => {
      if (result.value) {
        update ? actualizarCajaAgua() : georeferenciarCajaAguaUsuario();
      }
    });
  }

  function confirmarMoverUsuario(variables) {
    Swal.fire({
      ...msgConfirmation,
      title: TITULO_MOVER_CAJA_AGUA,
      text: MSJ_CONFIRMAR_MOVER_CAJA_AGUA,
    }).then((result) => {
      if (result.value) {
        moverUsuario(variables);
      }
    });
  }

  function moverUsuario(variables) {
    client
      .mutate({
        mutation: MOVER_CAJA_AGUA,
        variables,
      })
      .then(() =>
        Swal.fire("¡Buen trabajo!", "La caja de agua ha sido movido", "success")
      )
      .catch((error) => Swal.fire("Algo salió mal :(", error.message, "error"))
      .finally(() => setLoading(false));
  }

  return (
    <div className="p-3 mb-5">
      <form onSubmit={handleSubmit}>
        {/* <p className="mb-2"><span className="mr-1 text-danger">*</span><span>Campo obligatorio</span></p> */}
        <div className="form-check form-check-inline">
          {/* checked={formData.horizontal}
                onChange={handleChange} */}
          <input
            type="checkbox"
            id="printAlignCheckBox"
            className="form-check-input"
            checked={update}
            name="update"
            onChange={handleChangeChecbox}
          />
          <label className="form-check-label" htmlFor="printAlignCheckBox">
            ¿Vas actualizar?
          </label>
        </div>
        {update && (
          <FeatureSelector
            tarea={SELECCION_CAJA_AGUA}
            onFeatureSelected={(ft, finish) => {
              setCoord(ft.get("geometry").flatCoordinates);
              setMensaje({ texto: "", tipo: "" });
              setFormData((prevData) => ({
                ...prevData,
                gid: ft.get("gid"),
                numInscripcion: ft.get("suministro") ?? "",
                distanciaCajaExteriorPredio:
                  ft.get("distancia_caja_exterior_al_predio") ?? "",
                distanciaExteriorIzquierdaDerecha:
                  ft.get("distancia_caja_exterior_izquierda_derecha") ?? "",
                distanciaCajaInteriorDentroFuera:
                  ft.get("distancia_caja_interior_dentro_fuera") ?? "",
                nroFicha: ft.get("nro_ficha") ?? "",
              }));
              setShowInteriorPredio(
                ft.get("distancia_caja_interior_dentro_fuera") ? true : false
              );
              finish();
            }}
            layerFilter={(ly) => {
              if (ly === map.getCapaById(CAPA_CAJA_AGUA)) return true;
              return false;
            }}
          >
            {(start, finish, { onProgress }) => {
              return (
                <div className="form-group">
                  <label>GID Caja Agua afectada</label>
                  <InputGidCajaAgua
                    value={formData.gid}
                    selection={onProgress}
                    onClick={() => {
                      if (onProgress) finish();
                      else start();
                    }}
                  />
                </div>
              );
            }}
          </FeatureSelector>
        )}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_SUMINISTRO}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              autoFocus={true}
              className="form-control form-control-sm"
              name="numInscripcion"
              value={formData.numInscripcion}
              maxLength={8}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_SUMINISTRO}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_UBICACION_CAJA}
              <span className="ml-1 text-danger">*</span>
            </label>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                id="printInteriorCheckBox"
                className="form-check-input"
                checked={showInteriorPredio}
                name="showInteriorPredio"
                onChange={handleChangeChecbox}
              />
              <label
                className="form-check-label"
                htmlFor="printInteriorCheckBox"
              >
                ¿Ubicado dentro predio?
              </label>
            </div>
          </div>
        </div>
        {!showInteriorPredio && (
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="font-weight-bold">
                {LABEL_DISTANCIA_CAJA_AGUA}
                <span className="ml-1 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="distanciaCajaExteriorPredio"
                disabled={showInteriorPredio}
                value={formData.distanciaCajaExteriorPredio}
                maxLength={8}
                onChange={handleChangeInput}
                placeholder={PCHR_INGRESE_DISTANCIA_CAJA_AGUA}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="font-weight-bold">
                {LABEL_DISTANCIA_CAJA_EXTERIOR_IZQUIERA_DERECHA}
                <span className="ml-1 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="distanciaExteriorIzquierdaDerecha"
                disabled={showInteriorPredio}
                value={formData.distanciaExteriorIzquierdaDerecha}
                maxLength={8}
                onChange={handleChangeInput}
                placeholder={
                  PCHR_INGRESE_DISTANCIA_CAJA_EXTERIOR_IZQUIERA_DERECHA
                }
              />
            </div>
          </div>
        )}

        <div className="form-row">
          {showInteriorPredio && (
            <div className="form-group col-md-6">
              <label className="font-weight-bold">
                {LABEL_DISTANCIA_CAJA_INTERIOR_IZQUIERA_DERECHA}
                <span className="ml-1 text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="distanciaCajaInteriorDentroFuera"
                disabled={!showInteriorPredio}
                value={formData.distanciaCajaInteriorDentroFuera}
                maxLength={8}
                onChange={handleChangeInput}
                placeholder={
                  PCHR_INGRESE_DISTANCIA_CAJA_INTERIOR_IZQUIERA_DERECHA
                }
              />
            </div>
          )}

          <div className="form-group col-md-6">
            <label className="font-weight-bold">N° ficha</label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="nroFicha"
              value={formData.nroFicha}
              maxLength={3}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        {/* markerInitPos */}
        <MarcadorOL
          ref={marcadorRef}
          initPosition={coord}
          imgMarker={marker}
          render={(coordinate) => (
            <LabelCoordenadas coordinate={coordinate} imgMarker={marker} />
          )}
        ></MarcadorOL>
        <ButtonAction
          type={type.submit}
          title={LABEL_GUARDAR}
          className={"btn btn-primary btn-sm mt-2 mb-2"}
          disabled={loading}
        >
          <SaveIcon />
          <span className="d-none d-md-inline"> {LABEL_GUARDAR} </span>
        </ButtonAction>
        {loading && (
          <div className="text-center">
            <LoadingIcon />
          </div>
        )}
      </form>
      {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
    </div>
  );
};

export default mapStoreToProps(GeoreferenciarUsuario, ({ map }) => {
  return {
    markerInitPos: map.getView().getCenter(),
    capaUsuarios: map.getCapaById(CAPA_CAJA_AGUA),
  };
});
