import express from "express";
import { createSuggestion } from "../Controllers/suggestion.controller.js";



const router = express.Router();

router.post("/create",createSuggestion);



export default router;
