import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Contact = () => {
  return (
    <div>
      <Header />
      <section className="bg-[linear-gradient(30deg,_#fff1eb,_#ace0f9)]">
        <div className="py-8 lg:py-10 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white italic">
            Get in Touch
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-600 dark:text-gray-400 sm:text-xl">
            Have a question? Want to discuss a project? Reach out to us.
          </p>
          <form action="#" className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 focus:outline-none"
                placeholder="example@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                placeholder="How can we assist you?"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                placeholder="Leave us a message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
