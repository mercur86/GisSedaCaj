import React, { useEffect, useState } from 'react';
import Joyride, { EVENTS } from 'react-joyride';
import steps from './steps';
import Swal from 'sweetalert2';
import { withStore } from '../store/Store';

const welcomeMessage = {
    title: '¡Bienvenido!',
    text: "Estás usando la versión 2.0 de GISTECO. ¡Empieza el tour para familiarizarte!",
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Empezar',
    cancelButtonText: 'Saltar',
    buttonsStyling: false,
    customClass: {
        confirmButton: 'btn btn-success mr-2',
        cancelButton: 'btn btn-light'
    }
};

export default withStore(({ storeContext: { sidebarApi, servicePublic } }) => {

    const [run, setRun] = useState(false);

    useEffect(() => {
        if (!servicePublic) {
            // Swal.fire(welcomeMessage)
            //     .then(result => {
            //         if (result.value) {
            //             setRun(true);
            //         }
            //     })
        }
    }, [sidebarApi]);

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous={true}
            showSkipButton={true}
            disableOverlayClose={true}
            spotlightClicks={true}
            locale={{
                back: 'Anterior',
                close: 'Cerrar',
                last: 'Terminar',
                next: 'Siguiente',
                skip: 'Saltar'
            }}
            styles={{
                options: {
                    zIndex: 1030
                }
            }}
            callback={(e) => {
                if (e.type === EVENTS.TOUR_END) {
                    Swal.fire(
                        '¡Hemos terminado el Tour!',
                        'Ahora conoces un poco mejor el sistema, pero puedes continuar explorando por tu cuenta... puedes empezar dando clic derecho sobre el mapa.',
                        'success'
                    ).then(result => {
                        if (result.value) {
                            Swal.fire(
                                '¿Necesitas ayuda?',
                                'Si tienes alguna duda o necesitas guía, por favor ponte en contacto con la oficina de Informática.',
                                'question'
                            );
                        }
                    })
                }
            }}
        />
    );
});