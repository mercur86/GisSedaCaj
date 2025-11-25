import React, { useState, useEffect } from "react";
import { withStore } from "../../../../../pages/Mapa/store/Store";
import { FilterIcon } from "../../../../../lib/icons";
import {
  CAPA_CALLES,
  CAPA_MAZANAS,
  CAPA_PREDIOS,
  CAPA_TUBERIAS,
  CAPA_USUARIOS,
  CAPA_USUARIOS_ENCUESTADORES,
} from "../../../../values";

export default withStore(
  ({ capa, onContextMenu, storeContext: { map, servicePublic } }) => {
    const ly = map.getCapaById(capa.id);
    const [checked, setChecked] = useState(ly.getVisible());

    useEffect(() => {
      if (servicePublic) {
        if (servicePublic.tuberiaId && capa.id === CAPA_TUBERIAS) {
          ly.setVisible(!ly.getVisible());
          setChecked(true);
        } else if (
          servicePublic.suministroId &&
          (capa.id === CAPA_USUARIOS ||
            capa.id === CAPA_CALLES ||
            capa.id === CAPA_PREDIOS ||
            capa.id === CAPA_MAZANAS)
        ) {
          ly.setVisible(!ly.getVisible());
          setChecked(true);
          if (capa.id === CAPA_USUARIOS) {
            const ENV = 'stroke:#000000;strokeWidth:0.5px;fill:#297BBE;fillOpacity:1;mark:circle;markSize:7px;label:suministro;fontSize:11px;fontWeight:bold';
            const estiloCapa = 'usuarios';
            ly.getSource().updateParams({ ENV });
            ly.setStyle(estiloCapa);
            ly.get("estilos")[estiloCapa] = ENV;
          }
        } else if (
          servicePublic.suministroencuestaId &&
          (capa.id === CAPA_USUARIOS_ENCUESTADORES ||
            capa.id === CAPA_CALLES ||
            capa.id === CAPA_PREDIOS ||
            capa.id === CAPA_MAZANAS)
        ) {
          ly.setVisible(!ly.getVisible());
          setChecked(true);
          if (capa.id === CAPA_USUARIOS_ENCUESTADORES) {
            const ENV = 'stroke:#000000;strokeWidth:0.5px;fill:#297BBE;fillOpacity:1;mark:circle;markSize:7px;label:suministro;fontSize:11px;fontWeight:bold';
            const estiloCapa = 'usuarios';
            ly.getSource().updateParams({ ENV });
            ly.setStyle(estiloCapa);
            ly.get("estilos")[estiloCapa] = ENV;
          }
        }
      }
      // const capaId = servicePublic
      //   ? servicePublic.tuberiaId
      //     ? CAPA_TUBERIAS
      //     : servicePublic.suministroId
      //     ? CAPA_USUARIOS
      //     : servicePublic.suministroencuestaId
      //     ? CAPA_USUARIOS_ENCUESTADORES
      //     : undefined
      //   : undefined;

      // if (servicePublic && capa.id === capaId) {
      //   ly.setVisible(!ly.getVisible());
      //   setChecked(true);
      // }
      ly.on("change:visible", () => {
        setChecked(ly.getVisible());
      });
    }, [ly]);

    return (
      <li>
        <input
          id={`cbcapa${capa.id}`}
          type="checkbox"
          checked={checked}
          onChange={() => {
            ly.setVisible(!ly.getVisible());
          }}
        />
        <label
          htmlFor={`cbcapa${capa.id}`}
          className="ml-2 form-check-label"
          onContextMenu={onContextMenu.bind(null, ly)}
        >
          {capa.nombre}
        </label>
        {ly.getFilter() && <FilterIcon />}
      </li>
    );
  }
);
