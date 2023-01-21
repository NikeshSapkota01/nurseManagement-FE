import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { createUsers } from "@/services/auth";
import InputField from "@/components/common/InputField";
import { signupValidationSchema } from "@/rules/validation";

import Eye from "@/assets/Eye.svg";
import withAuth from "src/lib/withAuth";
import { handleError } from "@/utils/error";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  acceptAggrement: boolean;
};

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      acceptAggrement: false,
    },
    resolver: yupResolver(signupValidationSchema),
  });

  const router = useRouter();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const hasPassword = watch("password");

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const user = await createUsers(data);

      router.push("/login");
    } catch (error: any) {
      handleError(error);
    }
  };

  return (
    <section className="h-screen">
      <div className="container h-full">
        <ToastContainer />

        <div className="lg:grid lg:grid-cols-2 lg:gap-4 justify-center items-center">
          <div className="hidden lg:block ImgContainer h-full relative">
            <section className="background" />
          </div>
          <div className="lg:ml-20 xl:ml-40 px-6 py-12">
            <Head>
              <title>Nurse Management: | Signup</title>
              <meta
                name="description"
                content="Signup page of nurse management"
              />
            </Head>
            <h1 className="text-grey-900 text-5xl font-bold ">
              Create account
            </h1>
            <p className="text-sm mt-2 mb-6 text-grey-600">
              Please enter your details to create an account.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label="Full Name:"
                type="text"
                id="name"
                placeholder="Nikesh Sapkota"
                register={register}
                name={"name"}
                errorMessage={errors?.name}
              />

              <InputField
                label=" Email:"
                type="text"
                id="email"
                placeholder="nikesh@gmail.com"
                register={register}
                name={"email"}
                errorMessage={errors?.email}
              />

              <InputField
                label=" Password:"
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="Password"
                register={register}
                name={"password"}
                errorMessage={errors?.password}
                icon={
                  <i
                    className="absolute right-4 top-2.5"
                    onClick={togglePasswordVisiblity}
                  >
                    <Eye />
                  </i>
                }
              >
                {!hasPassword && !errors.password && (
                  <p
                    className={`text-sm mb-2 ${
                      errors.password ? "text-red-600" : "text-grey-500"
                    }`}
                  >
                    Use 6 or more characters that contain a mixture of letters,
                    digits, and symbols.
                  </p>
                )}
              </InputField>

              <div className="mb-4">
                <div className="flex">
                  <input
                    type="checkbox"
                    id="selectCheckbox"
                    className="text-grey-300 w-4 h-4 rounded"
                    {...register("acceptAggrement")}
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
                {errors.acceptAggrement && (
                  <p className="text-red-600 text-sm mt-1 ">
                    {errors.acceptAggrement.message}
                  </p>
                )}
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
            <div className="text-center text-sm">
              <p className="text-grey-900 inline-block ">
                Already have an account? &nbsp;
              </p>
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withAuth(Signup);
