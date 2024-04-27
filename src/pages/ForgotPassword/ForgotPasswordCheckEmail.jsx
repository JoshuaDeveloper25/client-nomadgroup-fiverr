import logoGuestWise from "../../img/logo-guest-wise.png";

const ForgotPasswordCheckEmail = () => {
  return (
    <>
      <section className="container-page flex flex-col items-center justify-center h-[80vh]">
        <img
          loading="lazy"
          decoding="async"
          className="w-52 mx-auto"
          src={logoGuestWise}
        />

        <h2 className="text-4xl my-6 font-medium text-center text-primary-colour/90">
          Check your email
        </h2>

        <p className="text-center text-xl text-primary-colour/70">
          We have sent a link to change your password!
        </p>

        <p className="text-center text-lg mt-2 text-primary-colour/70">
          Check your spam filter{" "}
          <span className="block mt-2">You can close this window...</span>
        </p>
      </section>
    </>
  );
};

export default ForgotPasswordCheckEmail;
