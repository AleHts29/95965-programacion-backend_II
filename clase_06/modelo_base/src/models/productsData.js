
// DATA en memoria, simulamos una base de datos

const data = [
    {
        name: "Teclado Midi - Arturia Micro Freak",
        price: 250,
        id: 1,
    },
    {
        name: "Auriculares AKG240",
        price: 210,
        id: 2,
    },
    {
        name: "Monitores KRK",
        price: 457,
        id: 3,
    },
    {
        name: "Microfono Hyperx",
        price: 89,
        id: 4,
    },
    {
        name: "Placa de sonido Focus Ride Scarlett",
        price: 140,
        id: 5,
    },
    {
        name: "Korg Ms20 Mini Sintetizador Analógico",
        price: 590,
        id: 6,
    },
];


const recuperarDatos = () => {
    return data;
};

const guardarDatos = (nuevoDato) => {
    data.push(nuevoDato);
    return nuevoDato;
};

const actualizarDatos = (id, datoActualizado) => {
    const index = data.findIndex((dato) => dato.id === id);
    if (index !== -1) {
        data[index] = { ...data[index], ...datoActualizado };
        return data[index];
    }
    return null;
};

const eliminarDatos = (id) => {
    const index = data.findIndex((dato) => dato.id === id);
    if (index !== -1) {
        const eliminado = data.splice(index, 1);
        return eliminado[0];
    }
    return null;
};

export { recuperarDatos, guardarDatos, actualizarDatos, eliminarDatos };