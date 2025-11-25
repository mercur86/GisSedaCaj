export const checkFormIsFilled = ({
    gid,
    numInscripcion,
    distanciaCajaExteriorPredio,
    distanciaExteriorIzquierdaDerecha,
    distanciaCajaInteriorDentroFuera
}, update, showInteriorPredio) => {
    if (!gid && update) throw new Error('Seleccione una caja de alcantarillado');
    if (!numInscripcion) throw new Error('Digite el suministro');
    if (!showInteriorPredio && !parseInt(distanciaCajaExteriorPredio)) throw new Error('Digite distancia caja exterior al predio.');
    if (!showInteriorPredio && !parseInt(distanciaExteriorIzquierdaDerecha)) throw new Error('Indique la distancia caja exterior izquierda a derecha al predio.');
    if (showInteriorPredio && !parseInt(distanciaCajaInteriorDentroFuera)) throw new Error('Indique la distancia caja izquierda a derecha interior al predio.');
    return true;
}