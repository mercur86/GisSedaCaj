import React, { useContext } from 'react';
import { Calendar } from 'primereact/calendar';
import FeatureSelector from '../../../global/components/FeatureSelector';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { withStore } from '../../../../pages/Mapa/store/Store';
import {
    CAPA_HABILITACIONES_URBANAS,
    CAPA_SECTORES_COMERCIALES
} from '../../../values';
import { PanelInformeContext } from '../../components/PanelInforme';
import ProvDistSelector from '../../../global/components/ProvDistSelector';

const Formulario = ({
    idReporte,
    provincia,
    distrito,
    area,
    intervalos,
    periodo,
    setArea,
    onChange: handleChange,
    storeContext: { map }
}) => {

    const history = useHistory();
    const setItsParamsStage = useContext(PanelInformeContext);
    const capaHabUrbanas = map.getCapaById(CAPA_HABILITACIONES_URBANAS),
        capaSectoresComerciales = map.getCapaById(CAPA_SECTORES_COMERCIALES);
    const areaInputText = !area ? '' : (area.get('capa') === capaHabUrbanas ? area.get('nombre') : `SECTOR ${area.get('id_sector')}`);

    return (
        <div className="row justify-content-center">
            <div className="col-md-auto">
                <div className="form">
                    <ProvDistSelector
                        provincia={provincia}
                        distrito={distrito}
                        onChange={handleChange}
                    />
                    <div className="form-group">
                        <label className="font-weight-bold">Área</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                disabled={false}
                                readOnly={true}
                                defaultValue={areaInputText}
                            />
                            <div className="input-group-append">
                                <FeatureSelector
                                    tarea={`SELECCIONAR_AREA_REP_ESTADISTICA_${idReporte}`}
                                    onFeatureSelected={(ft, finish) => {
                                        finish();
                                        setArea(ft);
                                    }}
                                    layerFilter={(ly) => {
                                        if (ly === capaHabUrbanas || ly === capaSectoresComerciales) return true;
                                        return false;
                                    }}
                                >
                                    {(start, finish, { onProgress }) => {
                                        return (
                                            <button
                                                className={classnames("far fa-hand-pointer btn btn-xs", { "btn-light": !onProgress, "btn-warning": onProgress })}
                                                onClick={() => {
                                                    if (onProgress) finish();
                                                    else start();
                                                }}
                                            />
                                        )
                                    }}
                                </FeatureSelector>
                                <button
                                    disabled={!area}
                                    className="btn btn-light btn-xs"
                                    onClick={() => {
                                        setArea(null);
                                    }}
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <small className="form-text text-muted mt-0 mb-2">Seleccione una habilitación urbana o sector comercial</small>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Período</label>
                        <Calendar
                            name="periodo"
                            className="d-block"
                            inputClassName="form-control form-control-sm"
                            view="month"
                            dateFormat="mm/yy"
                            yearNavigator={true}
                            yearRange="2010:2030"
                            value={periodo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Intervalos</label>
                        <input
                            name="intervalos"
                            type="number"
                            className="form-control form-control-sm"
                            min={5}
                            value={intervalos}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="btn btn-primary btn-sm btn-block"
                        onClick={() => {
                            setItsParamsStage(false);
                            history.push("/report")
                        }}
                    >
                        <i className="fas fa-play mr-2"></i>
                        Generar Informe
                    </button>
                </div>
            </div>
        </div>
    )
};

export default withStore(Formulario);