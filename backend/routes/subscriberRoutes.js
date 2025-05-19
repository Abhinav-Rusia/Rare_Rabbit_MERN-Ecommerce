import express from 'express';
import {createSubscriber} from '../controller/subscriber.controller.js';

const router = express.Router();

// @route POST /api/subscribe
// @desc Subscribe to newsletter
// @access Public

router.post("/subscribe", createSubscriber);


export default router;