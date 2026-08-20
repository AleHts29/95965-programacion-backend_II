// importamos los metodos del services
import { getDatosService, postDatosService, putDatosService, deleteDatosService } from '../services/service.products.js';

const getDatosController = async (req, res) => {
    try {
        const datos = await getDatosService();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};


const postDatosController = async (req, res) => {
    try {
        const nuevoDato = await postDatosService(req.body);
        res.status(201).json(nuevoDato);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el dato' });
    }
};


const putDatosController = async (req, res) => {
    try {
        const datoActualizado = await putDatosService(req.params.id, req.body);
        res.json(datoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el dato' });
    }
};

const deleteDatosController = async (req, res) => {
    try {
        await deleteDatosService(req.params.id);
        res.status(200).json({ message: 'Dato eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el dato' });
    }
};


export {
    getDatosController,
    postDatosController,
    putDatosController,
    deleteDatosController
};