import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ContextMenu } from "primereact/contextmenu";
import { crearMenuContextual } from "./config";
import { useApolloClient } from "react-apollo-hooks";
import { withStore } from "../../../../pages/Mapa/store/Store";
import { useAbility } from "../../../../pages/Mapa/casl/ability";
import {
  CAPA_TUBERIAS,
  CAPA_USUARIOS,
  CAPA_USUARIOS_ENCUESTADORES,
} from "../../../values";

const FullCanvas = styled.div`
  width: 100%;
  height: 100%;
`;

const MapCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default withStore(({ storeContext }) => {
  const [menuContextual, setMenuContextual] = useState([]);
  const apollo = useApolloClient();
  const ability = useAbility();
  const mapRef = useRef(null);
  const cm = useRef(null);

  useEffect(() => {
    storeContext.map.setTarget(mapRef.current);
    // Buscar servicio publico url
    searchServicePublic(storeContext);
  }, [storeContext.map]);

  function searchServicePublic(storeContext) {
    const { usuario, servicePublic } = storeContext;
    console.log("searchServicePublic !! servicePublic: ", servicePublic);
    if (
      (usuario.nombre_completo === "INVITADO" ||
        usuario.nombre_completo === "INVITADO ENCUESTADOR") &&
      servicePublic
    ) {
      searchuserbysupply(storeContext);
      // if (servicePublic.operacion == "buscarusuarioporsuministro") {
      //     searchuserbysupply(storeContext);
      // }
    }
  }

  function searchuserbysupply({ map, servicePublic }) {
    if (servicePublic.suministroId) {
      const capaUsuarios = map.getCapaById(CAPA_USUARIOS);
      const num_inscripcion = servicePublic.suministroId;
      capaUsuarios
        .getFeatures(
          {
            cql_filter: `suministro = ${num_inscripcion}`,
          },
          {
            dataProjection: "EPSG:32717",
            featureProjection: map.codeProjection,
          }
        )
        .then((fts) => {
          const ft = fts[0];
          if (ft) {
            ft.set("capa", capaUsuarios);
            map.volarHastaUsuario(ft);
            // storeContext.sidebarApi.abrirSidebar('INFORMACION');
          }
          // else {
          //     setMensaje({ texto: MSJ_USUARIO_NO_SE_LOCALIZO, tipo: TIPO_ALERTA.ADVERTENCIA });
          // }
        })
        .catch((error) => {
          // setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR })
        });
    } else if (servicePublic.suministroencuestaId) {
      const capaUsuariosEncuesta = map.getCapaById(CAPA_USUARIOS_ENCUESTADORES);
      const num_inscripcion = servicePublic.suministroencuestaId;
      capaUsuariosEncuesta
        .getFeatures(
          {
            cql_filter: `suministro = ${num_inscripcion}`,
          },
          {
            dataProjection: "EPSG:32717",
            featureProjection: map.codeProjection,
          }
        )
        .then((fts) => {
          const ft = fts[0];
          if (ft) {
            ft.set("capa", capaUsuariosEncuesta);
            map.volarHastaUsuario(ft);
            // storeContext.sidebarApi.abrirSidebar('INFORMACION');
          }
          // else {
          //     setMensaje({ texto: MSJ_USUARIO_NO_SE_LOCALIZO, tipo: TIPO_ALERTA.ADVERTENCIA });
          // }
        })
        .catch((error) => {
          // setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR })
        });
    } else if (servicePublic.tuberiaId) {
      const capaTuberias = map.getCapaById(CAPA_TUBERIAS);
      const gid = servicePublic.tuberiaId;
      capaTuberias
        .getFeatures(
          {
            cql_filter: `gid = ${gid}`,
          },
          {
            dataProjection: "EPSG:32717",
            featureProjection: map.codeProjection,
          }
        )
        .then((fts) => {
          const ft = fts[0];
          if (ft) {
            ft.set("capa", capaTuberias);
            map.volarHastaUsuario(ft);
            // storeContext.sidebarApi.abrirSidebar('INFORMACION');
          }
          // else {
          //     setMensaje({ texto: MSJ_USUARIO_NO_SE_LOCALIZO, tipo: TIPO_ALERTA.ADVERTENCIA });
          // }
        })
        .catch((error) => {
          // setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR })
        });
    }
  }

  return (
    <FullCanvas>
      <ContextMenu
        id="mapContextMenu"
        ref={cm}
        model={menuContextual}
        appendTo={document.getElementsByTagName("body")[0]}
      />
      <MapCanvas
        id="mapa"
        ref={mapRef}
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuContextual(
            crearMenuContextual(e, storeContext, apollo, ability)
          );
          cm.current.show(e);
        }}
      />
    </FullCanvas>
  );
});
