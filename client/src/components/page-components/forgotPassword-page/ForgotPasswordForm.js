import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

export default function ForgotPasswordForm() {
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState(false);
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("/api/v1/auth/forgot-password", {
                email,
                answer,
            });
            setLoading(false);
            if (res && res.data.success) {
                setOk(true);
                toast.success(res.data && res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message || "An error occurred. Please try again.");

        }
    };
  return (
    <>
          {loading ? <Loader message={'Email is on the way'} /> :
              <div className="min-h-screen rounded-3xl my-10 bg-gradient-to-tr from-violet-200 from-10% via-indigo-300 via-30% to-90% flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <img
                          className="mx-auto h-20 w-auto rounded-full"
                          src="https://img.freepik.com/premium-vector/art-gallery-logo-design_92167-616.jpg?w=740"
                          alt="Your Company"
                      />
                      <h2 className="mt-6 text-center text-3xl leading-9 font-bold text-gray-900">
                          Forgot your password?
                      </h2>
                  </div>
                  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                          <form onSubmit={handleSubmit}>
                              {ok && <div className="bg-green-200 py-1 text-center"><p>Resetting Password link has been sent to <span className="text-blue-600">{email}</span></p></div>}
                              <div className="mt-6">
                                  <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">
                                      Email address
                                  </label>
                                  <div className="mt-1 relative rounded-md shadow-sm">
                                      <input id="email" name="email" value={email}
                                          onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" type="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                  </div>
                              </div>
                              <div className="mt-6">
                                  <label htmlFor="security-question" className="block text-sm font-medium leading-5 text-gray-700">
                                      Security Question
                                  </label>
                                  <div className="mt-1 rounded-md shadow-sm">
                                      <input id="security-question" name="security-question" value={answer}
                                          onChange={(e) => setAnswer(e.target.value)} type="text" placeholder="What is Your Favourite Food ?" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                  </div>
                              </div>
                              <div className="mt-6">
                                  <span className="block w-full rounded-md shadow-sm">
                                      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                          Send Mail For Resetting Password
                                      </button>
                                  </span>
                              </div>
                              <hr />
                              <div className="flex justify-between mt-2">
                                  <div className="text-center">
                                      <Link to='/register' className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800" href="#">
                                          Regiser for an account
                                      </Link>
                                  </div>
                                  <div className="text-center">
                                      <Link to='/login' className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800" href="./index.html">
                                          Already have an account? Login!
                                      </Link>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          }
    </>
  )
}
