import React from 'react';
//import TipoArchivo from '../../../TipoArchivo';

/*export default () => <div>
    <a href="http://gisteco.epsgrau.pe:3030/covid19/CRONOGRAMA_DE_DESINFECCION.xlsx"
        download
        target="_blank"
        rel="noopener noreferrer">
        <TipoArchivo tipo_archivo="xlsx" />
        <span className="ml-2">Cronograma de desinfección</span>
    </a>
</div>*/
//width="402" height="346"
//frameborder="0"

export default () =>
    <div
        className="embed-responsive h-100"
    >
        <iframe
            title="Cronograma de desinfección"
            className="embed-responsive-item"
            scrolling="no"
            src="https://onedrive.live.com/embed?resid=30377E1CE445792A%21502&authkey=%21ALcLUlCV2NY7l2A&em=2&wdAllowInteractivity=False&ActiveCell='Hoja1'!B5&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True"
        >
        </iframe>
    </div>