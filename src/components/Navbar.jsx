import { Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../context/AppProvider";

import logoGuestWise from "../img/logo-guest-wise.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiSignOutBold } from "react-icons/pi";
import { LuBookMinus } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const [toggled, setToggled] = useState(false);

  const handleLogOut = () => {
    setUserInfo({});
    navigate("/");
    toast.success("Successfully logged out!");
    localStorage.removeItem("userInfo");
  };

  return userInfo?.access_token ? (
    <header className="flex-1 h-full sticky top-0">
      <div className="flex h-[100vh]">
        <Sidebar
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
          breakPoint="md"
          backgroundColor="#FFFFFF"
        >
          <div className="flex flex-col justify-between h-full mx-5 py-6">
            <div>
              <div className="flex items-start justify-between">
                <Link to={`/`}>
                  <img
                    loading="lazy"
                    decoding="async"
                    className="w-36"
                    src={logoGuestWise}
                  />
                </Link>

                <button className="md:hidden -mt-3" type="button">
                  <MdClose
                    onClick={() => setToggled(!toggled)}
                    className="hover:scale-110 animation-fade size-6 text-primary-colour"
                  />
                </button>
              </div>

              <Link to={`/events`}>
                <div className="flex bg-primary-colour-hover gap-3 items-center text-white bg-primary-colour py-3 px-2 hover:bg-primary-colour/55 animation-fade mt-20 rounded-sm">
                  <div>
                    <LuBookMinus className="size-6" />
                  </div>
                  <div>
                    <h3>Events</h3>
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center w-12 h-12 bg-white shadow-black/60 shadow-lg rounded-full">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 object-cover rounded-full"
                    src={`https://dummyimage.com/600x400/000/fff`}
                  />
                </div>

                <div>
                  <h3 className="text-secondary-colour text-xs">
                    {userInfo?.name}
                  </h3>
                  <h4 className="text-secondary-colour text-xs">
                    {userInfo?.email}
                  </h4>
                </div>
              </div>

              <div>
                <button type="button">
                  <PiSignOutBold
                    onClick={handleLogOut}
                    className="size-5 text-secondary-colour hover:text-tertiary-colour animation-fade"
                  />
                </button>
              </div>
            </div>
          </div>
        </Sidebar>

        <main>
          <div className="pt-3 ps-4">
            <button
              className="fixed left-6 top-3 md:hidden sb-button"
              onClick={() => setToggled(!toggled)}
            >
              <GiHamburgerMenu className="size-8" />
            </button>
          </div>
        </main>
      </div>
    </header>
  ) : null;
};

export default Navbar;
