import { Router } from "express";
import product from "./products";
import users from "./users";

const router = Router();

router.use("/products", product);
router.use("/users", users);

export default router;
