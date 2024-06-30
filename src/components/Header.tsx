import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useVeFeStore } from "@/utils/store";
import { useEffect } from "react";

const Header = () => {
  const { setWallet } = useVeFeStore();
  const { ready, authenticated, user, login, logout } = usePrivy();

  console.log(ready, authenticated, user, login, logout);
  useEffect(() => {
    if (user) {
      setWallet(user?.wallet?.address);
    }
  }, [user]);

  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          {" "}
          <h1 className="text-3xl font-inkutAntiqua font-bold text-white">
            VeFé
          </h1>
        </a>
      </div>
      <div className="flex-none gap-2 mr-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="my-2">
                <a className="justify-between">Profile</a>
              </li>
              <li className="my-2">
                <a>Settings</a>
              </li>
              <li onClick={logout} className="my-2">
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={login}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
