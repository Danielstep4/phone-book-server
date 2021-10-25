import express from "express";
import controllers from "../controllers";

const router = express.Router();

router.get("/contacts", controllers.getAllContacts);
router.get("/contact/:fullname", controllers.getContactByName);
router.post("/contact", controllers.setNewContact);

export default router;
