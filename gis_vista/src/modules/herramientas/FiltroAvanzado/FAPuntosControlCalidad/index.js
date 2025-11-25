import React from 'react';
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from '../../FilterButtons';
import Panel from '../subcomponents/Panel';
import { LABEL_UBICACION } from '../values';
import FormUbicacion from '../subcomponents/FormUbicacion';
import withFilter from '../withFilter';
import { CAPA_PUNTOS_CONTROL_CALIDAD } from '../../../values';
import FormParametroControlCalidad from '../subcomponents/FormParametroControlCalidad';
import FormFuenteControlCalidad from '../subcomponents/FormFuenteControlCalidad';

const FAPuntosControlCalidad = ({
    parametros,
    change,
    handleChange,
    filtroHaCambiado,
    filtered,
    handleChangeFilter,
    handleRemoveFilter
}) => {

    const {
        idProvincia,
        idDistrito,
        parametro,
        valorMinimo,
        valorMaximo,
        fechaInfLectura,
        fechaSupLectura,
        tipoFuente,
        fuentes
    } = parametros;

    return (
        <div className="card border-filtro">
            <div className='form'>
                <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
                    <strong>Puntos de control de calidad</strong>
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
                <div className="card-body p-2">
                    <Panel open={true} title={LABEL_UBICACION} id="pControlCalidadLugares">
                        <FormUbicacion
                            idProvincia={idProvincia}
                            idDistrito={idDistrito}
                            onChange={(e) => {
                                change({ fuentes: [] });
                                handleChange(e);
                            }}
                        />
                    </Panel>
                    <Panel title="Parámetro leído" id="pControlCalidadParametro">
                        <FormParametroControlCalidad
                            parametro={parametro}
                            valorMinimo={valorMinimo}
                            valorMaximo={valorMaximo}
                            fechaInfLectura={fechaInfLectura}
                            fechaSupLectura={fechaSupLectura}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title="Fuente" id="pControlCalidadFuente">
                        <FormFuenteControlCalidad
                            idProvincia={idProvincia}
                            idDistrito={idDistrito}
                            tipoFuente={tipoFuente}
                            fuentes={fuentes}
                            onChange={(e) => {
                                if (e.target.name === 'tipoFuente') change({ fuentes: [] });
                                handleChange(e);
                            }}
                        />
                    </Panel>
                </div>
            </div>
        </div>
    )
}

export default withFilter(FAPuntosControlCalidad, ({ map }) => ({
    capa: map.getCapaById(CAPA_PUNTOS_CONTROL_CALIDAD),
    capaKey: 'puntosControlCalidad'
}));