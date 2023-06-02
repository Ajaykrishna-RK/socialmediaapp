import express from "express";
import {AdminLogin, Login,AdminRegister} from "../controllers/Auth.js"

const router = express.Router()

router.post("/login",Login)
router.post("/admin/login",AdminLogin)
router.post("/admin/register",AdminRegister)

export default router