import * as express from "express";
import { Router } from "express";
import { generateChatQA } from "../controllers/chat.controller";

const router: Router = express.Router();

router.post("/qa", generateChatQA);

export default router;
