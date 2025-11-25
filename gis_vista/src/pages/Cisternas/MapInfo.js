import React from 'react';
import UserMarker from '../../assets/img/marker5.png';
import RedMarker from '../../assets/img/red_marker.png';
import GreyMarker from '../../assets/img/grey_marker.png';

const LegendEntry = ({ img, descripcion }) => (
    <div className="form-group form-row">
        <div className="col-sm-2 d-flex align-items-center">
            <img src={img} height={24} alt={descripcion} />
        </div>
        <label className="col-sm-10 col-form-label">
            {descripcion}
        </label>
    </div>
);

class MapInfo extends React.PureComponent {
    render() {
        return (
            <div className="form">
                <LegendEntry img={RedMarker} descripcion="Cisternas que están abasteciendo ahora." />
                <LegendEntry img={GreyMarker} descripcion="Cisternas que abastecen en otro momento." />
                <LegendEntry img={UserMarker} descripcion="Mi predio." />
            </div>
        );
    }
}

export default MapInfo;