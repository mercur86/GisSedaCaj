export const estaAbasteciendoAhora = (horaInicial24, horaFinal24) => {
    const [hi, mi] = horaInicial24.split(":"),
        [hf, mf] = horaFinal24.split(":");
    const ahora = new Date();
    const horaInicial = new Date(),
        horaFinal = new Date();
    horaInicial.setHours(parseInt(hi), parseInt(mi), 0);
    horaFinal.setHours(parseInt(hf), parseInt(mf), 0);
    ahora.setSeconds(0);
    return ahora >= horaInicial && ahora <= horaFinal;
}