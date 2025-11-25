import React from "react";
import { Checkbox } from "primereact/checkbox";

import {
  LISTAR_ESTADO_USER_SIN_SUMINISTRO,
  LISTAR_TIPO_CONSTRUCCION,
} from "../FAUsuarioSinSuministro/queries";
import ListWithQuery from "./ListWithQuery";
import {
  LABEL_ESTADO_USER_SIN_SUMINISTRO,
  LABEL_TIPO_CONSTRUCCION,
} from "../FAUsuarioSinSuministro/values";

export default ({
  tipoUsuario,
  tipoConstruccion,
  predioHabitado,
  onChange,
}) => {
  return (
    <div className="form">
      <div className="form-group">
        <label className="font-weight-bold">
          {LABEL_ESTADO_USER_SIN_SUMINISTRO}
        </label>
        <ListWithQuery
          query={LISTAR_ESTADO_USER_SIN_SUMINISTRO}
          valuesProperty="catastro.listaEstadoUsuarioSinSuministro"
          name="tipoUsuario"
          value={tipoUsuario}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label className="font-weight-bold">{LABEL_TIPO_CONSTRUCCION}</label>
        <ListWithQuery
          query={LISTAR_TIPO_CONSTRUCCION}
          valuesProperty="catastro.listaTipoConstruccion"
          name="tipoConstruccion"
          value={tipoConstruccion}
          onChange={onChange}
        />
      </div>
      <div className="my-2">
        <Checkbox
          inputId="faucb1"
          name="predioHabitado"
          checked={predioHabitado}
          onChange={onChange}
        />
        <label htmlFor="faucb1" className="p-checkbox-label">
          ¿Predio habitado?
        </label>
      </div>
    </div>
  );
};
