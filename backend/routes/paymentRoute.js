import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { openingGatewayController, orderConfirmationComtroller } from '../controllers/sslPaymentsController.js';
const router = express.Router();

router.post('/ssl', requireSignIn, openingGatewayController);
router.post('/success/:tranId', orderConfirmationComtroller)


export default router;