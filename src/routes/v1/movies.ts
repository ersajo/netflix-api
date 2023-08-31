import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  getMovieController,
  getMoviesController,
  updateMovieController,
  scriptMovieController,
  seedMoviesController,
} from "../../controllers/movies/";
import { adaptRoute } from "../../helpers/callback";
import reviewsApi from "./reviews";

const router = Router();

router.get("/", adaptRoute(getMoviesController));
router.get("/:id", adaptRoute(getMovieController));
router.post("/", adaptRoute(createMovieController));
router.put("/:id", adaptRoute(updateMovieController));
router.delete("/:id", adaptRoute(deleteMovieController));
router.post("/seed", adaptRoute(seedMoviesController));
router.post("/:id/scripts", adaptRoute(scriptMovieController));

router.use("/reviews", reviewsApi);

export default router;