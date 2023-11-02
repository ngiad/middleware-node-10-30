import express from "express"
import { createuser, deleteUser, getAll, getbyid, updateuser } from "../controllers/userController.js"

export const router = express.Router()

router.get("/",getAll)
router.get("/:id",getbyid)
router.post("/",createuser)
router.put('/:id',updateuser)
router.delete("/:id",deleteUser)
