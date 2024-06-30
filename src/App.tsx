import AccountOverView from "./components/AccountOverView";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Plaid from "./components/Plaid";

function App() {
  return (
    <div className="max-w-2xl bg-black mx-auto">
      <div className="min-h-screen font-manrope relative bg-gradient-to-tr">
        <div className="max-w-7xl px-2 py-5 mx-auto flex">
          <div className="flex flex-col w-full min-h-screen">
            <Header />
            <div className="relative mt-10">
              {/* <div className="absolute inset-6 background-animate  bg-gradient-to-r from-blue-900 via-lime-950 to-green-950 rounded-lg blur-3xl opacity-75 group-hover:opacity-100 transition duration-800 group-hover:duration-200 animate-tilt"></div> */}
              <div className=" text-white bg-black h-screen">
                <AccountOverView />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
