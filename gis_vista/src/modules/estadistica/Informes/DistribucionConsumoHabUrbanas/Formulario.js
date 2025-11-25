import React, { useContext } from 'react';
import { Calendar } from 'primereact/calendar';
import { useHistory } from 'react-router-dom';
import { PanelInformeContext } from '../../components/PanelInforme';
import ProvDistSelector from '../../../global/components/ProvDistSelector';

export default ({
    provincia,
    distrito,
    periodo,
    onChange: handleChange
}) => {

    const history = useHistory();
    const setItsParamsStage = useContext(PanelInformeContext);

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
    );
}