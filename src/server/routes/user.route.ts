import * as express from "express";
import { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello",
  });
});

export default router;
