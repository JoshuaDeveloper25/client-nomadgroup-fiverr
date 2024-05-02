import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import AppContext from "../context/AppProvider";

const Root = () => {
  const { userInfo } = useContext(AppContext);

  return (
    <div className="relative flex lg:gap-5">
      {userInfo?.access_token ? <Navbar /> : null}

      <div className="md:flex-[70%] flex-[100%] min-h-full">
        <div className="flex flex-col">
          <main>
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Root;
