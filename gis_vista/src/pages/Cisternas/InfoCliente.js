import React from 'react';
import Entrada from './Entrada';

class InfoCliente extends React.PureComponent {
    render() {
        return (
            <div className="form">
                <Entrada label="Titular" value={this.props.nombre_usuario} longText={true} />
                <Entrada label="Dirección" value={this.props.direccion_predio} longText={true} />
                <Entrada label="Suministro" value={this.props.id} />
            </div>
        );
    }
}

export default InfoCliente;