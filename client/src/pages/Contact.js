import React from "react";
import Layout from "../components/Layouts/Layout";
import { RiMapPin2Line, RiPhoneLine, RiMailLine, RiTimeLine } from "react-icons/ri";

const Contact = () => {
    return (
        <Layout title={'Contact us'}>
            <section className="bg-gradient-to-b from-sky-100 to-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-center text-sky-800 mb-12">Contact Us</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white rounded-lg shadow-xl p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-sky-700">Get in Touch</h2>
                            <form>
                                <div className="mb-6">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea id="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-sky-600 text-white font-semibold py-3 rounded-md hover:bg-sky-700 transition duration-300">Send Message</button>
                            </form>
                        </div>
                        <div>
                            <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
                                <h2 className="text-2xl font-semibold mb-6 text-sky-700">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <RiMapPin2Line className="w-6 h-6 text-sky-600 mr-4 mt-1 flex-shrink-0" />
                                        <p>Mohammodia Housing Society,<br />Mohammodpur, Dhaka-1207,<br />Bangladesh</p>
                                    </div>
                                    <div className="flex items-center">
                                        <RiPhoneLine className="w-6 h-6 text-sky-600 mr-4 flex-shrink-0" />
                                        <p>(0421) 431 2030</p>
                                    </div>
                                    <div className="flex items-center">
                                        <RiMailLine className="w-6 h-6 text-sky-600 mr-4 flex-shrink-0" />
                                        <p>contact@example.com</p>
                                    </div>
                                    <div className="flex items-center">
                                        <RiTimeLine className="w-6 h-6 text-sky-600 mr-4 flex-shrink-0" />
                                        <p>Mon - Fri: 9AM - 5PM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.7951801813173!2d90.35517331498088!3d23.75577478458662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf5c7a7f2db3%3A0x4a2ce5056f5c4d5c!2sMohammadia%20Housing%20Society%2C%20Dhaka%201207!5e0!3m2!1sen!2sbd!4v1631234567890!5m2!1sen!2sbd"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Google Maps - Mohammodia Housing Society"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;