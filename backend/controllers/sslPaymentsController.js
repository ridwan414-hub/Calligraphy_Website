import { ObjectId } from 'mongodb';
import SSLCommerzPayment from "sslcommerz-lts";
import orderModel from '../models/orderModel.js';


const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox
const tran_id = new ObjectId().toString();

export const openingGatewayController = async (req, res) => {
    try {
        const { cart } = req.body;
        let total = 0;
        cart?.map((i) => {
            total += i.price;
        });
        const data = {
            total_amount: total,
            currency: 'BDT',
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: `${process.env.CLIENT_URL}api/v1/payment/success/${tran_id}`,
            fail_url: `${process.env.CLIENT_URL}fail`,
            cancel_url: `${process.env.CLIENT_URL}cancel`,
            ipn_url: `${process.env.CLIENT_URL}ipn`,
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: req.user._id,
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)

        try {
            const apiResponse = await sslcz.init(data);
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send({ url: GatewayPageURL })
            new orderModel({
                products: cart,
                payment: { success: false, bkashTransactionId: tran_id, amount: total, currency: 'BDT' },
                buyer: req.user._id,
            }).save();
            console.log('Redirecting to: ', GatewayPageURL)
        } catch (error) {
            res.status(500).send('Error in payment gateway 1')
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
export const orderConfirmationComtroller = async (req, res) => {
    try {
        const result = await orderModel.findOneAndUpdate({ 'payment.bkashTransactionId': req.params.tranId }, { 'payment.success': true }, { new: true });
        if (result) {
            res.redirect(`${process.env.CLIENT_URL}dashboard/user/orders`);
        } else {
            res.send('Payment Failed')
        }
    } catch (error) {
        res.status(500).send('Error in payment gateway 2');
    }

}