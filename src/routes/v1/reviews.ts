import { Router } from "express";
import {
  createReviewController,
} from "../../controllers/reviews/";
import { adaptRoute } from "../../helpers/callback";

const router = Router();

router.post("/", adaptRoute(createReviewController));

export default router;