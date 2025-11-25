import React from 'react';
import Alert, { TIPO_ALERTA } from '../../../../lib/alerts';
import { MSJ_SELECCIONE_ELEMENTO_MAPA } from './values';
import FeaturesCapa from '../FeaturesCapa';
import { withStore } from '../../../../pages/Mapa/store/Store';
import InfoPanel from './subcomponents/InfoPanel';

const Informacion = ({ storeContext: { map } }) => {

    return (

        <FeaturesCapa
            capa={map.seleccion}
        >
            {([ft]) => {
                if (ft) {
                    return <InfoPanel feature={ft} />
                } else {
                    return <div className='p-2'>
                        <Alert tipo={TIPO_ALERTA.INFORMACION}>{MSJ_SELECCIONE_ELEMENTO_MAPA}</Alert>
                    </div>
                }
            }}
        </FeaturesCapa>
    );
};

export default withStore(Informacion);