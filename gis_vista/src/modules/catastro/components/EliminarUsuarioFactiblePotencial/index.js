import React, { useEffect, useRef, useState } from "react";
import { mapStoreToProps } from "../../../../pages/Mapa/store/Store";
import FeatureSelector from "../../../global/components/FeatureSelector";
import { CAPA_USUARIOS_SIN_SUMINISTRO } from "../../../values";
import { useApolloClient } from "react-apollo-hooks";
import { mensajeInicial, TIPO_ALERTA } from "../../../../lib/alerts";
import InputGidCajaAlcantarillado from "../GeoreferenciarCajaAguaDesague/subcomponents/InputGidCajaAlcantarillado";
import MarcadorOL from "../../../global/components/MarcadorOL";
import ButtonAction from "../../../global/components/ButtonAction";
import {
  LABEL_ACEPTAR,
  LABEL_CANCELAR,
  LABEL_ELIMINAR,
  type,
} from "../../../global/values";
import { DeleteIcon, LoadingIcon } from "../../../../lib/icons";
import marker from "../../../../assets/img/marker9.png";
import LabelCoordenadas from "../GeoreferenciarUsuario/subcomponents/LabelCoordenas";
import Swal from "sweetalert2";
import { TITULO_ELIMINAR_USUARIO_FACTIBLE_POTENCIAL } from "./values";
import { ELIMINAR_USUARIO_FACTIBLE_POTENCIAL } from "./mutations";

const msgConfirmation = {
  icon: "question",
  showCancelButton: true,
  confirmButtonText: LABEL_ACEPTAR,
  cancelButtonText: LABEL_CANCELAR,
};

const initialFormData = {
  gid: "",
};

const SELECCION_USUARIO_FACTIBLE_POTENCIAL =
  "SELECCIONAR_USUARIO_FACTIBLE_POTENCIAL";

const EliminarUsuarioFactiblePotencial = ({
  markerInitPos,
  capaUsuarios,
  storeContext: { map },
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState(mensajeInicial);
  const [loading, setLoading] = useState(false);
  const [coord, setCoord] = useState(markerInitPos);
  const marcadorRef = useRef(null);
  const client = useApolloClient();

  useEffect(() => {
    capaUsuarios.setVisible(true);
  }, [capaUsuarios]);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      setMensaje({ texto: "", tipo: "" });
      confirmarEliminar();
    } catch (error) {
      setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ADVERTENCIA });
    }
  }

  function confirmarEliminar() {
    Swal.fire({
      ...msgConfirmation,
      title: TITULO_ELIMINAR_USUARIO_FACTIBLE_POTENCIAL,
      text: `¿Deseas eliminar usuario factible potencial gid ${formData.gid}?`,
    }).then((result) => {
      if (result.value) {
        eliminarUsuarioFactiblePotencial();
      }
    });
  }

  function eliminarUsuarioFactiblePotencial() {
    setLoading(true);
    const variables = { gid: formData.gid };

    client
      .mutate({
        mutation: ELIMINAR_USUARIO_FACTIBLE_POTENCIAL,
        variables,
      })
      .then(({ data }) => {
        if (data.catastro.eliminarUsuarioFactiblePotencial === true) {
          setFormData((prevData) => ({
            ...prevData,
            gid: "",
          }));
          Swal.fire("¡Buen trabajo!", mensaje, "success");
        } else {
          Swal.fire("Algo salió mal :(", mensaje, "error");
        }
      })
      .catch((error) => Swal.fire("Algo salió mal :(", error.message, "error"))
      .finally(() => setLoading(false));
  }

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit}>
        <FeatureSelector
          tarea={SELECCION_USUARIO_FACTIBLE_POTENCIAL}
          onFeatureSelected={(ft, finish) => {
            setCoord(ft.get("geometry").flatCoordinates);
            setMensaje({ texto: "", tipo: "" });
            setFormData((prevData) => ({
              ...prevData,
              gid: ft.get("gid"),
            }));
            finish();
          }}
          layerFilter={(ly) => {
            if (ly === map.getCapaById(CAPA_USUARIOS_SIN_SUMINISTRO))
              return true;
            return false;
          }}
        >
          {(start, finish, { onProgress }) => {
            return (
              <div className="form-group">
                <label>GID Caja Alcantarillado afectada</label>
                <InputGidCajaAlcantarillado
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
          title={LABEL_ELIMINAR}
          className={"btn btn-primary btn-sm mt-2"}
          disabled={loading}
        >
          <DeleteIcon />
          <span className="d-none d-md-inline"> {LABEL_ELIMINAR} </span>
        </ButtonAction>
        {loading && (
          <div className="text-center">
            <LoadingIcon />
          </div>
        )}
      </form>
    </div>
  );
};

export default mapStoreToProps(EliminarUsuarioFactiblePotencial, ({ map }) => {
  return {
    markerInitPos: map.getView().getCenter(),
    capaUsuarios: map.getCapaById(CAPA_USUARIOS_SIN_SUMINISTRO),
  };
});
