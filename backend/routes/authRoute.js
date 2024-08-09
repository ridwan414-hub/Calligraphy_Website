import express from "express";

import { activateAccountController, forgotPasswordControllerByMail, getAllOrdersController, getAllUsersController, getOrdersController, loginController, registerController, resetPasswordController, testController, updateOrderStatusController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//REGISTER Routes
router.post("/register", registerController)
router.get("/activate/:token", activateAccountController)
//LOGIN ROUTES
router.post("/login", loginController)
//Forgot Password
router.post("/forgot-password", forgotPasswordControllerByMail)
router.put("/reset-password/:token", resetPasswordController)
 
//test route
router.get("/test", requireSignIn, isAdmin, testController)

//protected USER route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok:true})
})

//protected ADMIN route auth
router.get('/admin-auth', requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ok:true})
 })


//update profile
router.put("/profile", requireSignIn, updateProfileController)
//orders
router.get('/orders',requireSignIn,getOrdersController)
//All orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)
//order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, updateOrderStatusController)
//all users data
router.get('/all-users', requireSignIn, isAdmin,getAllUsersController)

export default router;