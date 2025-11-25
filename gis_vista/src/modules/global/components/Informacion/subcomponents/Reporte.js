import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { getReporte } from "./mapper";
import { LoadingIcon } from "../../../../../lib/icons";

const loading = <div className="text-center mt-2" > <LoadingIcon /></div>;

export default ({ feature }) => {
    const { idReporte } = useParams();
    const Componente = getReporte(idReporte);
    return (
        <Suspense
            fallback={loading}>
            <Componente capa={feature.get('capa')} {...feature.getProperties()} />
        </Suspense>
    );
}