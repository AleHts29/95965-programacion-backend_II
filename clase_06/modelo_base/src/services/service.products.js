
import { recuperarDatos, guardarDatos, actualizarDatos, eliminarDatos } from '../models/productsData.js';

const getDatosService = async () => {
    // lógica para obtener los datos
    return await recuperarDatos();
};

const postDatosService = async (nuevoDato) => {
    // lógica para crear un nuevo dato
    return await guardarDatos(nuevoDato);
};

const putDatosService = async (id, datoActualizado) => {
    // lógica para actualizar un dato existente
    return await actualizarDatos(id, datoActualizado);
};

const deleteDatosService = async (id) => {
    // lógica para eliminar un dato existente
    return await eliminarDatos(id);
};

export {
    getDatosService,
    postDatosService,
    putDatosService,
    deleteDatosService
};