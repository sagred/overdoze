import AccountOverView from "@/components/AccountOverView";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Plaid from "@/components/Plaid";

function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="min-h-screen font-manrope relative bg-gradient-to-tr">
        <div className="max-w-7xl py-5 mx-auto flex">
          <div className="flex flex-col pb-20 w-full min-h-screen">
            <Header />

            <div className="relative px-6 mt-6">
              {/* <div className="absolute inset-6 background-animate  bg-gradient-to-r from-blue-900 via-lime-950 to-green-950 rounded-lg blur-3xl opacity-75 group-hover:opacity-100 transition duration-800 group-hover:duration-200 animate-tilt"></div> */}
              <div className=" text-white">
                <AccountOverView />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
