import { ConnectButton } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-black">
      <h1 className="font-oxanium text-4xl font-medium  text-white">
        Overdoze.xyz
      </h1>
      <div className="flex justify-between">
        <Link to="/create">
          <button className="btn btn-primary">Create Your Alter-Ego</button>
        </Link>
        <div className="px-4">
          <ConnectButton className="px-4 rounded-none h-12 bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default Header;
