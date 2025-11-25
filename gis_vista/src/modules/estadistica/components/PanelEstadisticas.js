import React, { Suspense } from 'react';
import { withStore } from '../../../pages/Mapa/store/Store';
import { getReporte } from '../Informes/mapper';
import PanelInforme from "./PanelInforme";
import { LoadingIcon } from '../../../lib/icons';

const loading = <div className="text-center mt-2" > <LoadingIcon /></div>;

const PanelEstadisticas = ({
    storeContext: { store, reportesEstadisticosApi }
}) => {

    const { reportes } = store;

    return (
        <div className='w-100 p-2'>
            {reportes.map((rep, idx) => {
                const RepComponent = getReporte(rep.id);
                return (
                    <PanelInforme key={idx} titulo={rep.titulo} indiceReporte={idx}>
                        <Suspense fallback={loading}>
                            <RepComponent />
                        </Suspense>
                    </PanelInforme>
                );
            })}
            <button
                className="btn btn-light btn-sm ml-2 mt-2"
                onClick={() => reportesEstadisticosApi.agregarNuevoReporte()}>
                <i className="fas fa-plus mr-2" />Nuevo Informe
            </button>
        </div>
    );
}

export default withStore(PanelEstadisticas);