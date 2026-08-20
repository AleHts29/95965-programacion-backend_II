import { Router } from 'express';
// importamos el controller de productos
import { getDatosController, postDatosController, putDatosController, deleteDatosController } from '../controllers/controller.products.js';



const router = Router();

router.get('/products', getDatosController);
router.post('/products', postDatosController);
router.put('/products', putDatosController);
router.delete('/products', deleteDatosController);

export default router;