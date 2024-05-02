import { Sidebar } from "react-pro-sidebar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../context/AppProvider";

import logoGuestWise from "../img/logo-guest-wise.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
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
    <header className="flex-1 h-full sticky top-0 z-50">
      <div className="flex h-[100vh] ">
        <Sidebar
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
          breakPoint="md"
          backgroundColor="#FFFFFF"
        >
          <div className="flex flex-col justify-between h-full mx-5 py-6">
            <div>
              <div className="flex items-start justify-between ">
                <Link to={`/`} onClick={() => setToggled(!toggled)}>
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

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 items-center text-white bg-secondary-colour py-3 px-2 animation-fade mt-20 rounded-sm"
                    : "flex bg-primary-colour-hover gap-3 items-center text-white bg-primary-colour py-3 px-2 hover:bg-primary-colour/55 animation-fade mt-20 rounded-sm"
                }
                to={`/events`}
                onClick={() => setToggled(!toggled)}
              >
                <div>
                  <LuBookMinus className="size-6" />
                </div>
                <div>
                  <h3>Events</h3>
                </div>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-3 items-center text-white bg-secondary-colour py-3 px-2 animation-fade mt-4 rounded-sm"
                    : "flex bg-primary-colour-hover gap-3 items-center text-white bg-primary-colour py-3 px-2 hover:bg-primary-colour/55 animation-fade mt-4 rounded-sm"
                }
                to={`/guests`}
                onClick={() => setToggled(!toggled)}
              >
                <div>
                  <FaPeopleGroup className="size-6" />
                </div>
                <div>
                  <h3>Guests</h3>
                </div>
              </NavLink>
            </div>

            <div className="flex flex-col justify-between gap-2">
              <div className="flex items-center">
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
                <button
                  onClick={handleLogOut}
                  className="bg-tertiary-colour hover:bg-red-600 hover:text-white animation-fade flex justify-center py-1 rounded-md gap-2 items-center text-tertiary-colour border border-tertiary-colour w-full text-center"
                  type="button"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </Sidebar>

        <main>
          <div className="pt-3 ps-4">
            <button
              className="fixed left-6 top-3 p-1 md:hidden sb-button rounded-md text-white bg-primary-colour"
              onClick={() => setToggled(!toggled)}
            >
              <GiHamburgerMenu className="size-7" />
            </button>
          </div>
        </main>
      </div>
    </header>
  ) : null;
};

export default Navbar;
