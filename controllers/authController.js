import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { emailWithNodeMailer } from "../utils/mail.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import createJWT from "../utils/createJWT.js";

export const registerController = async (req, res, next) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        console.log(req.body)
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            });
        }
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).send({
                success: false,
                message: 'User Already Exists'
            });
        }

        const tokenPayload = {
            name,
            email,
            password,
            phone,
            address,
            answer
        }
        const token = createJWT(tokenPayload, process.env.JWT_ACTIVATION_KEY, '10m')

        const emailData = {
            email,
            subject: 'Account Activation Mail',
            html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4CAF50;">Hello ${name}</h2>
        <p>Please click the button below to activate your account.</p>
        <a href="${process.env.CLIENT_URL}user/activate/${token}" target="_blank" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; margin: 10px 0; display: inline-block;">Activate your account</a>
        <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
        <p><a href="${process.env.CLIENT_URL}user/activate/${token}" target="_blank">${process.env.CLIENT_URL}user/activate/${token}</a></p>
    </div>
    `
        }
        try { await emailWithNodeMailer(emailData) }
        catch (emailError) {
            next((500, 'Failed to send verification email'))
            return
        }

        res.status(201).send({
            success: true,
            message: `Email has been sent to ${email} for account activation`
        })
    } catch (error) {
        console.error(`Error in registerController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Registering User',
            error
        });
    }
}
export const activateAccountController = async (req, res) => {
    try {
        const token = req.params.token
        if (!token) throw error(404, 'token not found')

        try {
            const decoded = jwt.verify(token, process.env.JWT_ACTIVATION_KEY)
            if (!decoded) throw error(401, 'unable to verify user')

            const userExists = await userModel.exists({ email: decoded.email })
            if (userExists) throw error(409, 'User with this email already exists.Please sign in')

            const { name, email, password, phone, address, answer } = decoded
            const hashedPassword = await hashPassword(password);
            const user = await new userModel({
                name,
                email,
                password: hashedPassword,
                phone,
                address,
                answer
            }).save();
            res.status(201).send({
                success: true,
                message: 'User Registered Successfully',
                user
            });

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw error(401, 'token expired')
            } else if (error.name === 'JsonWebTokenError') {
                throw error(401, 'invalid token')
            } else {
                throw error
            }
        }
    } catch (error) {
        console.error(`Error in activateAccountController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Activating Account',
            error
        });

    }
}
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User Not Found'
            });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Incorrect mail or password'
            });
        }
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: 'User Logged In Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error(`Error in loginController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Logging In User',
            error
        });
    }
}
export const forgotPasswordControllerByMail = async (req, res) => {
    try {
        const { email, answer } = req.body;
        if (!email || !answer) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            });
        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User Not Found'
            });
        }
        const token = createJWT({ email }, process.env.JWT_RESET_PASSWORD_KEY, '5m')


        const emailData = {
            email,
            subject: 'Reset Password Mail',
            html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4CAF50;">Hello ${user.name}</h2>
        <p>Please click the button below to reset your password.</p>
        <a href="${process.env.CLIENT_URL}user/reset-password/${token}" target="_blank" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; margin: 10px 0; display: inline-block;">Reset Your Password</a>
        <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
        <p><a href="${process.env.CLIENT_URL}user/reset-password/${token}" target="_blank">${process.env.CLIENT_URL}user/reset-password/${token}</a></p>
    </div>
    `
        }
        try { await emailWithNodeMailer(emailData) }
        catch (emailError) {
            next(error(500, 'Failed to send reset password email'))
            return
        }

        res.status(200).send({
            success: true,
            message: `Email has been sent to ${email} for resetting password`,
            token
        })

    } catch (error) {
        console.log(`Error in forgotPasswordController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Forgot Password',
            error
        });
    }

}
//reset password
export const resetPasswordController = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD_KEY)
        if (!decoded) {
            return res.status(401).send({
                success: false,
                message: 'Invalid or Expired Token'
            });
        }
        const user = await userModel.findOne({ email: decoded.email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User Not Found'
            });
        }
        const hashedPassword = await hashPassword(newPassword);
        const response = await userModel.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });
        console.log(response)
        res.status(200).send({
            success: true,
            message: 'Password Changed Successfully'
        });
    } catch (error) {
        console.log(`Error in resetPasswordController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Resetting Password',
            error
        });

    }
}
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !phone || !address) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            });
        }
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User Not Found'
            });
        }
        if (password && password.length < 6) {
            return res.status(400).send({
                success: false,
                message: 'Password must be atleast 6 characters long'
            });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Profile Updated Successfully',
            updatedUser
        });
    } catch (error) {
        console.error(`Error in updateProfileController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Updating Profile',
            error
        });

    }
}
//get orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.error(`Error in getOrdersController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Fetching Orders',
            error
        });
    }
}
//get all orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(`Error in getAllOrdersController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Fetching All Orders',
            error
        });
    }
}
//update order status
export const updateOrderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        res.json(order);
    }
    catch (error) {
        console.error(`Error in updateOrderStatusController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Updating Order Status',
            error
        });
    }
}
//all user data
export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json(users);
    } catch (error) {
        console.error(`Error in getAllUsersController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Fetching All Users',
            error
        });
    }
}
export const testController = async (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: 'Test Route'
        });
    } catch (error) {
        console.error(`Error in testController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Test Route',
            error
        });
    }
}
