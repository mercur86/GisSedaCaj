import React, { useState, useCallback, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useApolloClient } from 'react-apollo-hooks';
import ButtonAction from '../../global/components/ButtonAction';
import InputText from '../../global/components/InputText';
import SelectOption from '../../global/components/SelectOption';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../lib/alerts';
import FormUbicacion from '../../herramientas/FiltroAvanzado/subcomponents/FormUbicacion';
import CalendarPrime from '../../global/components/CalendarPrime';
import { SaveIcon, LoadingIcon, EraserIcon, CalculatorIcon } from '../../../lib/icons';
import {
    LISTA_RESERVORIOS, LABEL_RESERVORIOS, LABEL_CAPACIDAD, LABEL_RADIO_CUBA, MSJ_CAPACIDAD, LABEL_PERDIDA_ESTIMADA, MSJ_PERDIDA_ESTIMADA, MSJ_RADIO_CUBA, LABEL_FECHA_LIMPIEZA
} from './values';
import {
    LABEL_GUARDAR, type, LABEL_LIMPIAR, LABEL_CALCULAR
} from '../../global/values';
import { guardarPerdidaOperacion, checkFormIsFilledPO } from './util';
import Swal from 'sweetalert2';
import { OBTENER_RESERVORIOS_BY_PROVDIST } from './mutations';


const estadoInicial = {
    idProvincia: '0',
    idDistrito: '0',
    capacidad: '',
    perdida_estimada: '',
    radio_cuba: '',
    fecha_limpieza: '',
    id_reservorio: '0'
}

const limpiarDemasCampos = {
    capacidad: '',
    perdida_estimada: '',
    radio_cuba: '',
    fecha_limpieza: '',
    id_reservorio: '0'
}

let cambioEstado = false;


const confirmOptions = {
    title: '¿Está seguro?',
    text: "El registro no se podrá eliminar. Asegúrese que la información ingresada sea la correcta.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, proceder'
};


const PerdidasOperacionales = () => {
    const [formDataProvDist, setFormData] = useState(estadoInicial);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [loading, setLoading] = useState(false);
    const [datosFormularioPO, setDatosFormularioPerdidas] = useState(estadoInicial);
    const client = useApolloClient();
    //reservorio
    const [reservorios, setReservorios] = useState(LISTA_RESERVORIOS);

    //

    const { id_provincia, id_distrito, id_reservorio, capacidad, radio_cuba, perdida_estimada, dni_usuario, fecha_limpieza } = datosFormularioPO;
    const { idProvincia, idDistrito } = formDataProvDist;

    useEffect(() => {
        if (cambioEstado) {
            //llenarCombo();
            handleChangeSelectReservorio();
            obtenerDatos();
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        try {
            checkFormIsFilledPO(datosFormularioPO);
            Swal.fire(confirmOptions)
                .then(result => {
                    if (result.value) {
                        registrarPerdidaOperacional()
                    }
                })
        } catch (error) {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ADVERTENCIA });
        }
    }


    function obtenerDatos() {
        cambioEstado = false;
        let datosFormulario = { ...datosFormularioPO };
        datosFormulario = {
            id_provincia: parseInt(document.getElementById('idProvincia').value),
            id_distrito: parseInt(document.getElementById('idDistrito').value),
            id_reservorio: parseInt(document.getElementById('id_reservorio').value),
            capacidad: document.getElementById('capacidad').value,
            radio_cuba: document.getElementById('radio_cuba').value,
            perdida_estimada: document.getElementById('perdida_estimada').value,
            fecha_limpieza: document.getElementById('fecha_limpieza').value,
            dni_usuario: localStorage.getItem('dniUser')
        }
        setDatosFormularioPerdidas(datosFormulario);
    }

    function registrarPerdidaOperacional() {

        setMensaje(mensajeInicial);
        setLoading(true);
        obtenerDatos();
        guardarPerdidaOperacion(client, datosFormularioPO)
            .then(registrado => {
                if (registrado) {
                    Swal.fire('¡Buen trabajo!', '¡La limpieza y mantenimiento ha sido registrada!', 'success');
                    limpiar();
                }
            })
            .catch(error => Swal.fire('¡Error!', error.message, 'error'))
            .finally(() => {
                setLoading(false);
            });
    }


    function handleChangeInput(e) { //evento tipo keypress
        const value = e.target.value, name = e.target.name;
        let nuevoDatosFormulario = { ...datosFormularioPO };
        nuevoDatosFormulario = { ...datosFormularioPO, [name]: e.target.value };
        setDatosFormularioPerdidas(nuevoDatosFormulario);
    }
    function handleResetForm(e) {
        cambioEstado = false;
        limpiar();
    }

    function limpiar() {
        setDatosFormularioPerdidas(estadoInicial);
        setFormData(estadoInicial);
        setReservorios(LISTA_RESERVORIOS);
    }

    function handleChangeSelectReservorio() {
        cambioEstado = true;
        const input = document.getElementById('id_reservorio');
        const opciones = input.options[input.selectedIndex].innerHTML;
        let inicio = opciones.indexOf("-");
        let valor = opciones.substr((inicio + 1), opciones.length);
        document.getElementById('capacidad').value = valor * 1;
      //  document.getElementById('perdida_estimada').value = valor;
    }

    function handleInputChange(e) {
        const name = e.target.name,
            value = e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name == 'idDistrito' && value != 0) {
            let nuevoDatosFormulario = { ...formDataProvDist };
            nuevoDatosFormulario = { ...formDataProvDist, [name]: e.target.value };
            client.query({
                query: OBTENER_RESERVORIOS_BY_PROVDIST,// BUSCAR_RESERVOROSIS
                variables: {
                    idProvincia: parseInt(nuevoDatosFormulario.idProvincia),
                    idDistrito: parseInt(nuevoDatosFormulario.idDistrito)
                },
                fetchPolicy: "network-only"
            }).then(({ data }) => {
                setReservorios(data.operaciones.obtenerReservoriosByProvDist);
                handleChangeSelectReservorio();
            });

            /*
             const variablesPD = {
                idProvincia: parseInt(nuevoDatosFormulario.idProvincia),
                idDistrito: parseInt(nuevoDatosFormulario.idDistrito)
            }
            fetchReservorios({ variables: variablesPD }); 
          */
        } else {
            cambioEstado = false;
            setDatosFormularioPerdidas(limpiarDemasCampos);
            setReservorios(LISTA_RESERVORIOS);
        }
    }

    function calcularPerdida() {
        let radioCuba=document.getElementById('radio_cuba').value ;
        let resultado=Number(3.14 *(radioCuba*radioCuba)* 0.1).toFixed(2);

        let nuevoDatosFormulario = { ...datosFormularioPO };
        nuevoDatosFormulario = { ...datosFormularioPO, 'perdida_estimada': resultado };

        document.getElementById('perdida_estimada').value = resultado;

        setDatosFormularioPerdidas(nuevoDatosFormulario);
    }


    return (
        <div className="p-3 mb-5">
            <form onSubmit={handleSubmit}>
                <FormUbicacion
                    idProvincia={idProvincia}
                    idDistrito={idDistrito}
                    onChange={handleInputChange}
                />
                <div className="form-group">
                    <SelectOption className='form-control form-control-sm' id='id_reservorio' value={id_reservorio} name='id_reservorio' etiqueta={LABEL_RESERVORIOS} lista={reservorios} onChange={handleChangeSelectReservorio} onBlur={handleChangeInput} />
                </div>

                <div className='row mb-3'>
                    <div className='col-sm-6'>
                        <InputText id="capacidad" value={capacidad} name="capacidad" etiqueta={LABEL_CAPACIDAD} placeholder={MSJ_CAPACIDAD} required onChange={handleChangeInput} readOnly />
                    </div>
                    <div className='col-sm-6'>
                        <InputText id="radio_cuba" name="radio_cuba" value={radio_cuba} etiqueta={LABEL_RADIO_CUBA} placeholder={MSJ_RADIO_CUBA} required onChange={handleChangeInput} />
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-sm-6'>
                        <InputText id="perdida_estimada" name="perdida_estimada" value={perdida_estimada} etiqueta={LABEL_PERDIDA_ESTIMADA} placeholder={MSJ_PERDIDA_ESTIMADA} required readOnly />
                    </div>
                    <div className='col-sm-6'>
                        <br></br> 
                        <ButtonAction type={type.button} title={LABEL_CALCULAR} className="btn btn-sm btn-primary mb-2" onClickButton={calcularPerdida}> 
                            <CalculatorIcon />
                            <span className="d-none d-md-inline"> {LABEL_CALCULAR} </span>
                        </ButtonAction>
                    </div>
                </div>
                <div className="p-grid p-fluid row mb-3">
                    <CalendarPrime id="fecha_limpieza" name="fecha_limpieza" value={fecha_limpieza} etiqueta={LABEL_FECHA_LIMPIEZA} showIcon={true} onChange={handleChangeInput}
                        maxDate={new Date()} dateFormat="dd/mm/yy" inputClassName="form-control-sm" required baseZIndex={1032} />
                </div>

                <ButtonAction type={type.submit} title={LABEL_GUARDAR} className="btn btn-sm btn-primary mb-2">
                    <SaveIcon />
                    <span className="d-none d-md-inline"> {LABEL_GUARDAR} </span>
                </ButtonAction>
                <ButtonAction type={type.button} title={LABEL_LIMPIAR} className="btn btn-sm btn-light ml-1 mb-2" onClickButton={handleResetForm}>
                    <EraserIcon />
                    <span className="d-none d-md-inline"> {LABEL_LIMPIAR} </span>
                </ButtonAction>
            </form>
            {loading && <div className="text-center"><LoadingIcon /></div>}
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
        </div>
    );
};

export default PerdidasOperacionales;




/*   puede servir para otro programador aunque para ti no, NO LO BORRES
const onDataCallback = useCallback((_data) => {
    datos = null;
    const data = _data && _data.operaciones ? _data.operaciones.obtenerReservoriosByProvDist : [];
    datos = data;
}, [gridApi]);

 
const [fetchReservorios, { lista, refetch }] = useLazyQuery(OBTENER_RESERVORIOS_BY_PROVDIST, {
    onCompleted: onDataCallback,
    onError: (err) => Swal.fire("¡Algo salió mal!", err.message, "error")

});



function llenarCombo() {
    console.log(datos);
    for (var i in datos) {
        document.getElementById('id_reservorio').innerHTML += "<option value='" + datos[i].id + "'>" + datos[i].nombre + "</option>";
    }
}

function refresh() {
    if (gridApi) {
        gridApi.showLoadingOverlay();
    }
    refetch()
        .then(({ data: _data }) => onDataCallback(_data))
        .catch(err => Swal.fire("¡Algo salió mal!", err.message, "error"));
}
*/