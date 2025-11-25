import React from 'react';
import Entrada from './Entrada';

class InfoCisterna extends React.PureComponent {
    render() {
        return (
            <div className="form">
                <Entrada label="Horario" value={this.props.horario} />
                <Entrada label="Dirección" value={this.props.direccion} longText={true} />
                <Entrada label="Zonas" value={this.props.zonasAbastecidas} longText={true} />
                <Entrada label="Placa" value={this.props.placa} />
                <Entrada label="Chofer" value={this.props.chofer} />
            </div>
        );
    }
}

export default InfoCisterna;