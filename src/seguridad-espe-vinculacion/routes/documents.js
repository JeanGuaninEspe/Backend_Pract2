import { Router } from 'express';
const router = Router();

import { createDocument } from '../controllers/documents.js';

router.post("/", createDocument);

export default router;