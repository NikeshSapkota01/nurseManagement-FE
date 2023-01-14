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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mb-4">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Nikesh Sapkota" />
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="johndoe@gmail.com" />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <div>
              <input type={"password"} placeholder="Password" />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex">
              <input type="checkbox" id="selectCheckbox" />
              <label htmlFor="acceptAggrement">
                <div>
                  <span>
                    Creating an account means you’re okay with our &nbsp;
                    <Link href="/">Terms of Service</Link>
                    &nbsp; and &nbsp;
                    <Link href="/">Privacy Policy</Link>
                  </span>
                </div>
              </label>
            </div>
          </div>

          <button type="submit">Signup</button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
