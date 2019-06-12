import { Router } from 'express';
import GroupController from '../controllers/group';


const router = new Router();




router.get('/', GroupController.getAll);



module.exports = router;