import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { login } from "@/services/auth";
import { setLoggedInUser } from "@/reducers/auth";
import InputField from "@/components/common/InputField";
import { loginValidationSchema } from "@/rules/validation";
import { saveTokens, parseUserToken } from "@/services/token";

import Eye from "@/assets/Eye.svg";
import withAuth from "src/lib/withAuth";
import { handleError } from "@/utils/error";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const hasPassword = watch("password");

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const tokens = await login(data);

      saveTokens(tokens);
      const user = parseUserToken(tokens?.accessToken ?? "");
      dispatch(setLoggedInUser(user));
      router.push("/dashboard");
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
              <title>Nurse Management: | Login</title>
              <meta
                name="description"
                content="Login page of nurse management"
              />
            </Head>
            <h1 className="text-grey-900 text-5xl font-bold ">
              Please sign in
            </h1>
            <p className="text-sm mt-2 mb-6 text-grey-600">
              Please enter your details to login to your account.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
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

              <button
                type="submit"
                className="inline-block mb-9 mt-5 h-10 bg-blue-500 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full disabled:bg-blue-200"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Login
              </button>
            </form>
            <div className="text-center text-sm">
              <p className="text-grey-900 inline-block ">
                Don&apos;t have an account? &nbsp;
              </p>
              <Link href="/signup" className="text-blue-600">
                Create One
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withAuth(Login);
