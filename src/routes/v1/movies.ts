import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  getMovieController,
  getMoviesController,
  updateMovieController,
  scriptMovieController,
} from "../../controllers/movies/";
import { adaptRoute } from "../../helpers/callback";

const router = Router();

router.get("/", adaptRoute(getMoviesController));
router.get("/:id", adaptRoute(getMovieController));
router.post("/", adaptRoute(createMovieController));
router.put("/:id", adaptRoute(updateMovieController));
router.delete("/:id", adaptRoute(deleteMovieController));
router.post("/:id/scripts", adaptRoute(scriptMovieController));

export default router;