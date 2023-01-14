import { NextPage } from "next";
import Link from "next/link";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  acceptAggrement: boolean;
};

const Signup: NextPage = () => {
  return (
    <section className="h-screen">
      <div className="container h-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 justify-center items-center">
          <div className="hidden lg:block ImgContainer h-full relative">
            <section className="background" />
          </div>
          <div className="lg:ml-20 xl:ml-40 px-6 py-12">
            <h1 className="text-grey-900 text-5xl font-bold ">
              Create account
            </h1>
            <p className="text-sm mt-2 mb-6 text-grey-600">
              Please enter your details to create an account.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className={`block font-medium text-sm mb-2 `}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nikesh Sapkota"
                  className={`form-control block w-full px-4 text-sm font-normal text-grey-700 bg-white border border-solid border-grey-300 rounded h-10 focus:text-grey-900 focus:bg-white focus:border-blue-600 focus:outline-none focus:shadow-md focus:shadow-blue-300`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className={`block font-medium text-sm mb-2`}
                >
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="nikesh@gmail.com"
                  className={`form-control block w-full px-4 text-sm font-normal text-grey-700 bg-white border border-solid border-grey-300 rounded h-10 focus:text-grey-900 focus:bg-white focus:border-blue-600 focus:outline-none focus:shadow-md focus:shadow-blue-300`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className={`block font-medium text-sm mb-2 `}
                >
                  Password
                </label>
                <div className="flex relative">
                  <input
                    type={"password"}
                    placeholder="Password"
                    className={`form-control inline-block w-full px-4 text-sm font-normal text-grey-700 bg-white border border-solid border-grey-300 rounded h-10 focus:text-grey-900 focus:bg-white focus:border-blue-600 focus:outline-none focus:shadow-md focus:shadow-blue-300`}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex">
                  <input
                    type="checkbox"
                    id="selectCheckbox"
                    className="text-grey-300 w-4 h-4 rounded"
                  />
                  <label htmlFor="acceptAggrement" className="form-check-label">
                    <div className={`text-sm text-grey-500 ml-2`}>
                      <span>
                        Creating an account means you’re okay with our &nbsp;
                        <Link href="/" className="text-blue-600">
                          Terms of Service
                        </Link>
                        &nbsp; and &nbsp;
                        <Link href="/" className="text-blue-600">
                          Privacy Policy
                        </Link>
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="inline-block mb-9 mt-5 h-10 bg-blue-500 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full disabled:bg-blue-200"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
