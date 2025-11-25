import React, { useState } from 'react';
import AutoCompleteUsuarios from '../../../global/components/AutoCompleteUsuarios';
import { Mutation } from 'react-apollo';
import { DAR_ALTA_USUARIO } from './mutations';
import Swal from 'sweetalert2';

const confirmOptions = {
    title: '¿Está seguro?',
    text: "El registro no se podrá eliminar. Asegúrese que la información ingresada sea la correcta.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, proceder'
};

export default () => {

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const userInputText = usuarioSeleccionado ? usuarioSeleccionado.nombre_completo : '';
    const classDiv = usuarioSeleccionado ? 'mt-2' : 'mt-2 d-none';
    const idUsuario = usuarioSeleccionado ? usuarioSeleccionado.id : '';

    return (
        <div className='p-3'>
            <form>
                <div className="form-group">
                    <label className='font-weight-bold'>Usuario</label>
                    <AutoCompleteUsuarios
                        autoFocus={true}
                        inputId="inputUsuariosParaAlta"
                        value={userInputText}
                        onChange={() => {
                            setUsuarioSeleccionado(null);
                        }}
                        onSelect={e => {
                            setUsuarioSeleccionado(e.value);
                        }}
                    />
                    <div className={classDiv}>
                        <Mutation
                            variables={{ idUsuario: parseInt(idUsuario) }}
                            mutation={DAR_ALTA_USUARIO}
                            onCompleted={() => {
                                Swal.fire('¡Buen trabajo!', `Se le dió de alta a '${usuarioSeleccionado.nombre_completo}'`, 'success');
                            }}
                        >
                            {(darAltaUsuario, { loading }) => {
                                return (
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            Swal.fire(confirmOptions)
                                                .then(result => {
                                                    if (result.value) {
                                                        darAltaUsuario();
                                                    }
                                                })
                                        }}
                                        type="button" title="Dar de alta" className="btn btn-sm btn-primary mr-2">
                                        <i className="far fa-thumbs-up"></i>
                                        <span className="d-none d-md-inline"> {loading ? 'Cargando..' : 'Dar de alta'} </span>
                                    </button>
                                );
                            }}
                        </Mutation>
                    </div>
                </div>
            </form>
        </div >
    );
}