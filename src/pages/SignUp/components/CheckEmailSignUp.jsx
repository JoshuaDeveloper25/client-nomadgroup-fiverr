import { useLocation, useParams, useSearchParams } from "react-router-dom";
import logoGuestWise from "../../../img/logo-guest-wise.png";

const CheckEmailSignUp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (
    <>
      <section className="container-page space-y-5 px-5 flex flex-col mt-10 items-center justify-center h-[80vh]">
        <img
          loading="lazy"
          decoding="async"
          className="w-52 mx-auto"
          src={logoGuestWise}
        />

        <h2 className="text-4xl font-medium text-center">
          Verify your email! <span className="block text-2xl">{email}</span>
        </h2>

        <div className="h-1 mx-auto w-60 bg-black/85 my-4"></div>

        <p className="max-w-lg text-center text-md text-primary-colour/70">
          We sent an email to {email} to make sure you owned it. Please, check
          your inbox and follow the instructions to verify or validate your
          account.
        </p>

        <p className="text-center text-md mt-4 text-primary-colour/70">
          HINT: The mail may take up to 5 minutes or it may be in the span box.
        </p>
        <div className="h-1 mx-auto w-60 bg-black/85 my-4"></div>
        <p className="text-center  text-sm font-bold ">
          You can close this window...
        </p>
      </section>
    </>
  );
};

export default CheckEmailSignUp;
