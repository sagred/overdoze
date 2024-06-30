import { Link, useLocation } from "react-router-dom";
import {
  GiftFilledIcon,
  GiftIcon,
  HomeFilledIcon,
  HomeIcon,
  MapFilledIcon,
  MapIcon,
} from "./icons";

const Nav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed w-full bottom-0 z-50 border-t">
      <div className="flex h-16 pb-4 pt-4 justify-evenly items-center bg-black w-full">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center ${
            path === "/" ? "text-white" : "text-neutral-500"
          }`}
        >
          {path === "/" ? <HomeFilledIcon /> : <HomeIcon />}
          <h3 className="text-sm">Home</h3>
        </Link>
        <Link
          to="/explore"
          className={`flex flex-col items-center justify-center ${
            path === "/explore" ? "text-white" : "text-neutral-500"
          }`}
        >
          {path === "/explore" ? <MapFilledIcon /> : <MapIcon />}
          <h3 className="text-sm">Explore</h3>
        </Link>
        <Link
          to="/rewards"
          className={`flex flex-col items-center justify-center ${
            path === "/rewards" ? "text-white" : "text-neutral-500"
          }`}
        >
          {path === "/rewards" ? <GiftFilledIcon /> : <GiftIcon />}

          <h3 className="text-sm">Rewards</h3>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
