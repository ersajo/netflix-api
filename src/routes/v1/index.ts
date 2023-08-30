import { Router } from 'express';

import moviesApi from './movies';

const router = Router();

router.use('/movies', moviesApi);

export default router;