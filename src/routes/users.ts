import {Router} from 'express';
import {getUsers,getUserById} from  "../controller/usersController";

const router = Router();

router.get("/",getUsers);
router.get("/:id",getUserById);

export default router;
