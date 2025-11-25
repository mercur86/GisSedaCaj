import React, { useEffect, useRef, useState } from "react";
import { mapStoreToProps } from "../../../../pages/Mapa/store/Store";
import FeatureSelector from "../../../global/components/FeatureSelector";
import { CAPA_USUARIOS_SIN_SUMINISTRO } from "../../../values";
import { useApolloClient } from "react-apollo-hooks";
import { mensajeInicial, TIPO_ALERTA } from "../../../../lib/alerts";
import InputGidUsuarioFactible from "./subcomponents/InputGidUsuarioFactible";
import MarcadorOL from "../../../global/components/MarcadorOL";
import ButtonAction from "../../../global/components/ButtonAction";
import {
  LABEL_ACEPTAR,
  LABEL_ACTUALIZAR,
  LABEL_CANCELAR,
  type,
} from "../../../global/values";
import { LoadingIcon, SaveIcon } from "../../../../lib/icons";
import marker from "../../../../assets/img/marker9.png";
import LabelCoordenadas from "../GeoreferenciarUsuario/subcomponents/LabelCoordenas";
import Swal from "sweetalert2";
import {
  LABEL_DIRECCION,
  LABEL_DIRECCION_PREDIO,
  LABEL_HAB_URBANA,
  LABEL_LOTE,
  LABEL_LOTE_MUNICIPAL,
  LABEL_MANZANA,
  LABEL_MANZANA_MUNICIPAL,
  LABEL_NUMERO_FICHA,
  LABEL_NUMERO_MUNICIPAL,
  LABEL_SECTOR,
  LABEL_SUB_LOTE,
  LABEL_ZONA,
  PCHR_INGRESE_DIRECCION,
  PCHR_INGRESE_DIRECCION_PREDIO,
  PCHR_INGRESE_HAB_URBANA,
  PCHR_INGRESE_LOTE,
  PCHR_INGRESE_LOTE_MUNICIPAL,
  PCHR_INGRESE_MANZANA,
  PCHR_INGRESE_MANZANA_MUNICIPAL,
  PCHR_INGRESE_NUMERO_FICHA,
  PCHR_INGRESE_NUMERO_MUNICIPAL,
  PCHR_INGRESE_SECTOR,
  PCHR_INGRESE_SUB_LOTE,
  PCHR_INGRESE_ZONA,
  TITULO_GEOREFERENCIAR_USUARIO_FACTIBLE_POTENCIAL,
} from "./values";
import { ACTUALIZAR_USUARIO_FACTIBLE_POTENCIAL } from "./mutations";
import { LISTA_PROVINCIAS } from "../../../global/components/OrganizacionTerritorial/values";
import Select from "../../../global/components/Select";
import { GET_DISTRITOS_PROVINCIAS } from "../../../global/components/OrganizacionTerritorial/queries";
import ButtonActionDefaultDataUserPotencial from "./subcomponents/ButtonActionDefaultDataUserPotencial";
import { BUSCAR_DATOS_DEFECTO_USUARIO_POTENCIAL } from "./queries";
import {
  LISTAR_ESTADO_USER_SIN_SUMINISTRO,
  LISTAR_TIPO_CONSTRUCCION,
} from "../../../herramientas/FiltroAvanzado/FAUsuarioSinSuministro/queries";

const msgConfirmation = {
  icon: "question",
  showCancelButton: true,
  confirmButtonText: LABEL_ACEPTAR,
  cancelButtonText: LABEL_CANCELAR,
};

const initialFormData = {
  gid: "",
  nroFicha: "",
  idProv: "",
  idDist: "",
  sector: "",
  idManzana: "",
  lote: "",
  sublote: "",
  nombreZona: "",
  habilitacionUrbana: "",
  numMunicipal: "",
  manzanaMunicipal: "",
  loteMunicipal: "",
  direccionPredio: "",
  // ubigeo: "",
  direccion: "",
  tipoUsuario: "",
  tipoConstruccion: "",
  predioHabitado: false,
};

const SELECCION_USUARIO_FACTIBLE_POTENCIAL =
  "SELECCIONAR_USUARIO_FACTIBLE_POTENCIAL";

const getDistritos = (apolloClient, idProvincia) => {
  return apolloClient
    .query({
      fetchPolicy: "network-only",
      query: GET_DISTRITOS_PROVINCIAS,
      variables: { idProvincia: parseInt(idProvincia) },
    })
    .then(({ data }) => data.catastro.getDistritosDeProvincia);
};

const getTiposUsuario = (apolloClient) => {
  return apolloClient
    .query({
      fetchPolicy: "network-only",
      query: LISTAR_ESTADO_USER_SIN_SUMINISTRO,
    })
    .then(({ data }) => data.catastro.listaEstadoUsuarioSinSuministro);
};

const getTiposConstruccion = (apolloClient) => {
  return apolloClient
    .query({
      fetchPolicy: "network-only",
      query: LISTAR_TIPO_CONSTRUCCION,
    })
    .then(({ data }) => data.catastro.listaTipoConstruccion);
};

const GeoreferenciarUsuarioFactiblePotencial = ({
  markerInitPos,
  capaUsuarios,
  storeContext: { map },
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState(mensajeInicial);
  const [loading, setLoading] = useState(false);
  const [coord, setCoord] = useState(markerInitPos);
  const marcadorRef = useRef(null);
  const apolloClient = useApolloClient();
  const client = useApolloClient();
  const [distritos, setDistritos] = useState([]);
  const [tiposUsuario, setTipoUsuario] = useState([]);
  const [tiposConstruccion, setTiposContruccion] = useState([]);
  const distSelectRef = useRef(null);

  useEffect(() => {
    if (formData.idProv) {
      getDistritos(apolloClient, formData.idProv).then((dists) =>
        setDistritos(dists)
      );
    }
  }, [apolloClient, formData.idProv]);

  useEffect(() => {
    getTiposUsuario(apolloClient).then((current) => setTipoUsuario(current));
    getTiposConstruccion(apolloClient).then((current) =>
      setTiposContruccion(current)
    );
  }, [apolloClient]);

  useEffect(() => {
    capaUsuarios.setVisible(true);
  }, [capaUsuarios]);

  function handleChangeChecbox(e) {
    const name = e.target.name,
      checked = e.target.checked;

    switch (name) {
      case "predioHabitado":
        setFormData((prevData) => ({ ...prevData, predioHabitado: checked }));
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

  function handleButtonDefaultData(e) {
    e.preventDefault();

    if (formData.gid) {
      client
        .query({
          query: BUSCAR_DATOS_DEFECTO_USUARIO_POTENCIAL, // BUSCAR_USUARIO
          variables: {
            numInscripcion: formData.gid,
          },
          fetchPolicy: "network-only",
        })
        .then(({ data }) => {
          const { buscarDatosDefectoUsuarioPotencial } = data.catastro;
          if (buscarDatosDefectoUsuarioPotencial.length > 0) {
            const data = buscarDatosDefectoUsuarioPotencial[0];
            setFormData((prevData) => ({
              ...prevData,
              idProv: data.id_prov,
              idDist: data.id_dist,
              sector: data.sector,
              idManzana: data.id_manzana,
              manzanaMunicipal: data.manzana_municipal,
              nombreZona: data.nombre_zona,
              // habilitacionUrbana: data.habilitacionUrbana,
            }));
          }
        })
        .catch((error) => {
          setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        });
    } else {
      Swal.fire(
        "Alerta",
        "¡Seleccione el GID del usuario factible potencial!",
        "info"
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      setMensaje({ texto: "", tipo: "" });
      confirmarActualizar();
    } catch (error) {
      setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ADVERTENCIA });
    }
  }

  function confirmarActualizar() {
    Swal.fire({
      ...msgConfirmation,
      title: TITULO_GEOREFERENCIAR_USUARIO_FACTIBLE_POTENCIAL,
      text: `¿Deseas actualizar usuario factible potencial gid ${formData.gid}?`,
    }).then((result) => {
      if (result.value) {
        actualizarUsuarioFactiblePotencial();
      }
    });
  }

  function actualizarUsuarioFactiblePotencial() {
    setLoading(true);
    const coordenadas = marcadorRef.current.getCoordinate();
    const variables = {
      ...formData,
      nroFicha: formData.nroFicha ? parseInt(formData.nroFicha) : null,
      coordenadas,
    };
    console.log(variables);

    client
      .mutate({
        mutation: ACTUALIZAR_USUARIO_FACTIBLE_POTENCIAL,
        variables,
      })
      .then(({ data }) => {
        console.log(data.catastro.actualizarUsuarioFactiblePotencial);
        if (
          data.catastro.actualizarUsuarioFactiblePotencial.codigo_respuesta ===
          1
        ) {
          setFormData((_) => ({
            ...initialFormData,
            gid: "",
          }));
          setMensaje({
            texto: data.catastro.actualizarUsuarioFactiblePotencial.mensaje,
            tipo: TIPO_ALERTA.EXITO,
          });
          Swal.fire(
            "¡Buen trabajo!",
            data.catastro.actualizarUsuarioFactiblePotencial.mensaje,
            "success"
          );
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
              idProv: ft.get("id_prov") ?? "",
              idDist: ft.get("id_dist") ?? "",
              sector: ft.get("sector") ?? "",
              idManzana: ft.get("id_manzana") ?? "",
              nroFicha: ft.get("nro_ficha") ?? "",
              lote: ft.get("lote") ?? "",
              sublote: ft.get("sublote") ?? "",
              habilitacionUrbana: ft.get("habilitacion_urbana") ?? "",
              nombreZona: ft.get("nombre_zona") ?? "",
              numMunicipal: ft.get("num_municipal") ?? "",
              manzanaMunicipal: ft.get("manzana_municipal") ?? "",
              loteMunicipal: ft.get("lote_municipal") ?? "",
              tipoUsuario: ft.get("tipo_usuario") ?? "",
              tipoConstruccion: ft.get("tipo_construccion") ?? "",
              direccionPredio: ft.get("direccion_predio") ?? "",
              direccion: ft.get("direccion") ?? "",
              predioHabitado:
                ft.get("predio_habitado") === true ||
                ft.get("predio_habitado") === false
                  ? ft.get("predio_habitado")
                  : false,
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
                <label>
                  <strong>GID Usuario Factible potencial</strong>
                </label>
                <InputGidUsuarioFactible
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

        <div className="form-row mt-2">
          <div className="form-group col-md-11">
            <label>
              <strong>Mostrar Información por defecto:</strong> (Provincia,
              Distrito, Sector, Manzana, Manzana Municipal, Zona)
            </label>
          </div>
          <div className="form-group col-md-1">
            <ButtonActionDefaultDataUserPotencial
              title="Completar datos"
              selection={false}
              onClick={handleButtonDefaultData}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">Provincia</label>
            <Select
              className="form-control form-control-sm"
              disabled={true}
              lista={LISTA_PROVINCIAS}
              value={formData.idProv}
              onChange={handleChangeInput}
              name="idProv"
              id="idProv"
            />
          </div>
          <div className="form-group col-md-6">
            <label className="font-weight-bold">Distrito</label>
            <Select
              className="form-control form-control-sm"
              disabled={true}
              lista={distritos}
              value={formData.idDist}
              onChange={handleChangeInput}
              name="idDist"
              id="idDist"
              ref={distSelectRef}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_SECTOR}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              disabled={true}
              name="sector"
              value={formData.sector}
              maxLength={8}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_SECTOR}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_MANZANA}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              disabled={true}
              name="idManzana"
              value={formData.idManzana}
              maxLength={8}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_MANZANA}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_NUMERO_FICHA}
              {/* <span className="ml-1 text-danger">*</span> */}
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="nroFicha"
              value={formData.nroFicha}
              maxLength={8}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_NUMERO_FICHA}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_LOTE}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="lote"
              value={formData.lote}
              maxLength={8}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_LOTE}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_SUB_LOTE}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="sublote"
              value={formData.sublote}
              maxLength={8}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_SUB_LOTE}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_HAB_URBANA}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="habilitacionUrbana"
              value={formData.habilitacionUrbana}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_HAB_URBANA}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_ZONA}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="nombreZona"
              value={formData.nombreZona}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_ZONA}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_NUMERO_MUNICIPAL}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="numMunicipal"
              value={formData.numMunicipal}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_NUMERO_MUNICIPAL}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_MANZANA_MUNICIPAL}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="manzanaMunicipal"
              value={formData.manzanaMunicipal}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_MANZANA_MUNICIPAL}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_LOTE_MUNICIPAL}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="loteMunicipal"
              value={formData.loteMunicipal}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_LOTE_MUNICIPAL}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">Estado Predio</label>
            <Select
              className="form-control form-control-sm"
              lista={tiposUsuario}
              value={formData.tipoUsuario}
              onChange={handleChangeInput}
              name="tipoUsuario"
              id="tipoUsuario"
              ref={distSelectRef}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="font-weight-bold">Tipo Construcción</label>
            <Select
              className="form-control form-control-sm"
              lista={tiposConstruccion}
              value={formData.tipoConstruccion}
              onChange={handleChangeInput}
              name="tipoConstruccion"
              id="tipoConstruccion"
              ref={distSelectRef}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_DIRECCION_PREDIO}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="direccionPredio"
              value={formData.direccionPredio}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_DIRECCION_PREDIO}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="font-weight-bold">
              {LABEL_DIRECCION}
              <span className="ml-1 text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              name="direccion"
              value={formData.direccion}
              onChange={handleChangeInput}
              placeholder={PCHR_INGRESE_DIRECCION}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                id="printAlignCheckBox"
                className="form-check-input"
                checked={formData.predioHabitado}
                name="predioHabitado"
                onChange={handleChangeChecbox}
              />
              <label className="form-check-label" htmlFor="printAlignCheckBox">
                ¿Predio Habitado?
              </label>
            </div>
          </div>
        </div>
        <ButtonAction
          type={type.submit}
          title={LABEL_ACTUALIZAR}
          className={"btn btn-primary btn-sm mt-2 mb-2"}
          disabled={loading}
        >
          <SaveIcon />
          <span className="d-none d-md-inline"> {LABEL_ACTUALIZAR} </span>
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

export default mapStoreToProps(
  GeoreferenciarUsuarioFactiblePotencial,
  ({ map }) => {
    return {
      markerInitPos: map.getView().getCenter(),
      capaUsuarios: map.getCapaById(CAPA_USUARIOS_SIN_SUMINISTRO),
    };
  }
);
