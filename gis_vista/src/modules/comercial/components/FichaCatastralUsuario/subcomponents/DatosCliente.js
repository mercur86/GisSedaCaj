import React from 'react';
import { Label, Data } from './common';

export default ({ data }) => {

    const {
        tipo_documento,
        id_cliente,
        nombre_cliente,
        apellido_paterno,
        apellido_materno,
        razon_social,
        tipo_responsable,
        telefono_cliente,
        celular_cliente,
        email_cliente
    } = data;

    return (
        <div className="form">
            <div className="form-group form-row mb-0">
                <Label>Tipo Documento:</Label>
                <Data>{tipo_documento}</Data>
                <Label>Núm. Documento:</Label>
                <Data>{id_cliente}</Data>
                <Label>Nombres y Apellidos:</Label>
                <Data>{`${nombre_cliente} ${apellido_paterno} ${apellido_materno}`}</Data>
                <Label>Razón Social:</Label>
                <Data>{razon_social}</Data>
                <Label>Tipo Responsable:</Label>
                <Data>{tipo_responsable}</Data>
                <Label>Teléfono:</Label>
                <Data>{telefono_cliente}</Data>
                <Label>Celular:</Label>
                <Data>{celular_cliente}</Data>
                <Label>Correo Electrónico:</Label>
                <Data>{email_cliente}</Data>
            </div>
        </div>
    )
}