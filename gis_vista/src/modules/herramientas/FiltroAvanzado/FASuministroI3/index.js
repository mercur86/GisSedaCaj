import React from 'react';
import withFilter from '../withFilter';
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from '../../FilterButtons';
import Panel from '../subcomponents/Panel';
import FormUbicacionSector from '../subcomponents/FormUbicacionSector';
import { CAPA_SUMINISTROS_I3 } from '../../../values';
import { LABEL_UBICACION } from '../values';
import { LABEL_SECCION_DEUDA, LABEL_SECCION_PREDIO_SERVICIO, LABEL_SECCION_USUARIO_I3 } from './values';
import FormInfoPredioServicio from '../subcomponents/FormInfoPredioServicio';
import FormInfoDeudaI3 from '../subcomponents/FormInfoDeudaI3';
import FormInfoSectorZona from '../subcomponents/FormInfoSectorZona';

const FiltroSuministroI3 = ({
    parametros,
    handleChange,
    filtroHaCambiado,
    filtered,
    handleChangeFilter,
    handleRemoveFilter
}) => {

    const {
        idProvincia,
        idDistrito,
        estadoPredio,
        categoriaPredio,
        tipoServicio,
        minMontoDeuda,
        maxMontoDeuda,
        minMesDeuda,
        maxMesDeuda,
        sectorComercial,
        estadoUsuarioI3
    } = parametros;

    return (
        <div className="card border-filtro">
            <div className='form'>
                <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
                    <strong>Suministros I3</strong>
                    <ButtonGroup capa={true} className='card-header-actions'>
                        {() => {
                            return (
                                <React.Fragment>
                                    <FiltrarBtn
                                        className='btn-xs'
                                        disabled={!filtroHaCambiado}
                                        onClick={handleChangeFilter}
                                    />
                                    <QuitarFiltroBtn
                                        className='btn-xs ml-1'
                                        visible={filtered}
                                        onClick={handleRemoveFilter}
                                    />
                                </React.Fragment>
                            );
                        }}
                    </ButtonGroup>
                </div>
                <div className="card-body p-1">
                    <Panel open={true} title={LABEL_SECCION_USUARIO_I3} id="FAUInfoUsuarioI3">
                        <FormInfoSectorZona
                            estadoUsuarioI3={estadoUsuarioI3}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel open={true} title={LABEL_UBICACION} id="FAUInfoUbicacion">
                        <FormUbicacionSector
                            idProvincia={idProvincia}
                            idDistrito={idDistrito}
                            sectorComercial={sectorComercial}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_SECCION_PREDIO_SERVICIO} id="FAUInfoPredio">
                        <FormInfoPredioServicio
                            estado={estadoPredio}
                            categoria={categoriaPredio}
                            tipoServicio={tipoServicio}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_SECCION_DEUDA} id="FAUInfoConsumo">
                        <FormInfoDeudaI3
                            minMontoDeuda={minMontoDeuda}
                            maxMontoDeuda={maxMontoDeuda}
                            minMesDeuda={minMesDeuda}
                            maxMesDeuda={maxMesDeuda}
                            onChange={handleChange}
                        />
                    </Panel>
                    {/* 
                    </Panel>
                    <Panel title={LABEL_SECCION_CONSUMO} id="FAUInfoConsumo">
                        <FormInfoConsumo
                            origenConsumo={origenConsumo}
                            minConsumo={minConsumo}
                            maxConsumo={maxConsumo}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title="Lectura" id="FAUInforLectura">
                        <FormInfoLecturas
                            variacionLectura={variacionLectura}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_GEOREFERENCIACION} id="FAUInfoGeoreferenciacion">
                        <FormInfoGeoreferenciacion
                            periodoGeorefFechaInf={periodoGeorefFechaInf}
                            periodoGeorefFechaSup={periodoGeorefFechaSup}
                            georeferenciadoXGIS={georeferenciadoXGIS}
                            onChange={handleChange}
                        />
                    </Panel> */}
                </div>
            </div>
        </div>
    );
};

export default withFilter(FiltroSuministroI3, ({ map }) => ({
    capa: map.getCapaById(CAPA_SUMINISTROS_I3),
    capaKey: 'suministrosI3'
}));