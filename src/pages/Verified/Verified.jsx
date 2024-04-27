import logoGuestWise from "../../img/logo-guest-wise.png";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Verified = () => {
  const params = useParams();

  const { isPending, error } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/verify/${params.token}`
      ),
  });

  return (
    <section className="container-page flex justify-center items-center h-[70vh]">
      <div>
        <img
          loading="lazy"
          decoding="async"
          className="w-52 mx-auto"
          src={logoGuestWise}
        />
        {isPending ? (
          <>
            <h2 className="text-4xl font-medium text-center text-primary-colour/90">
              Your account is being verified...
            </h2>

            <p className="text-center text-2xl text-primary-colour/70">
              We care about your security!
            </p>
          </>
        ) : error ? (
          <>
            <h2 className="text-4xl font-medium mt-10 text-center text-primary-colour/90">
              Invalid token
            </h2>

            <p className="text-center my-5 text-2xl text-primary-colour/70">
              We care about your security!
            </p>

            <div className="text-center">
              <Link
                className="text-center text-primary-colour text-lg"
                to={`/sign-up`}
              >
                Sign Up
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-medium text-center text-primary-colour/90">
              Your account has been verified!
            </h2>

            <p className="text-center my-5 text-2xl text-primary-colour/70">
              We care about your security!
            </p>

            <div className="text-center">
              <Link className="text-center text-primary-colour text-lg" to={`/`}>
                Log In
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Verified;
