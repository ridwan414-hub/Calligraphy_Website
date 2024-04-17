import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer py-10 text-gray-100">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col lg:mr-10">
          <h6 className="text-xl font-bold mb-4">Services</h6>
          <ul className="list-none space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Calligraphy Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Custom Artwork
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Personalized Designs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Special Occasion Gifts
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col lg:mr-10">
          <h6 className="text-xl font-bold mb-4">Company</h6>
          <ul className="list-none space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                About Bristy's Artwork
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Press Releases
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col lg:mr-10">
          <h6 className="text-xl font-bold mb-4">Legal</h6>
          <ul className="list-none space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Cookies Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h6 className="text-xl font-bold mb-4">Newsletter</h6>
          <form>
            <fieldset className="flex flex-col space-y-2">
              <label className="text-gray-300">
                <span className="text-sm">Subscribe to our newsletter</span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="input "
                />
                <button className="btn btn-primary ml-2 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Subscribe
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
