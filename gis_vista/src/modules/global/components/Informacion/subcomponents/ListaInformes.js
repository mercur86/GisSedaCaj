import React from "react";
import { Query } from "react-apollo";
import { INFORMES_CAPA_AUTORIZADOS } from "../queries";
import { withStore } from "../../../../../pages/Mapa/store/Store";
import { Link } from "react-router-dom";

const Lista = ({ informes }) => {
    if (informes.length !== 0) {
        return (
            <ul className="mb-0">
                {informes.map((informe, idx) => {
                    return (
                        <li key={idx}>
                            <Link
                                to={`/reporte/${informe.id}`}
                                className="btn btn-link btn-sm p-0 text-dark text-left">
                                {informe.nombre_corto}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
    else {
        return <p className="m-0 p-1">No hay reportes que mostrar.</p>
    }
}

export default withStore(({
    idCapa,
    storeContext: { usuario }
}) => {
    return (
        <Query
            query={INFORMES_CAPA_AUTORIZADOS}
            variables={{ capas: [idCapa], idUsuario: usuario.id }}
        >
            {({ data, loading, error }) => {
                if (loading) return <p>Cargando...</p>;
                if (error) return <p>{error.message}</p>;
                const informes = data.sistema.informesCapas.filter(informe => data.sistema.informesAutorizados.indexOf(informe.id) !== -1);
                return (
                    <Lista informes={informes} />
                );
            }}
        </Query>
    );
})