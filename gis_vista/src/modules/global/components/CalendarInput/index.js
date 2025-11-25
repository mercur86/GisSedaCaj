import { Calendar } from 'primereact/calendar';
import React from 'react';

const es = {
    firstDayOfWeek: 1,
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
};

export default (props) => (
    <Calendar
        className="p-fluid d-flex flex-row-reverse"
        inputClassName="form-control form-control-sm"
        showIcon={true}
        dateFormat="dd/mm/yy"
        baseZIndex={1032}
        appendTo={document.getElementsByTagName('body')[0]}
        locale={es}
        {...props}
    />
);