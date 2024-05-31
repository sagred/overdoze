import Footer from "./components/Footer";
import Header from "./components/Header";
import InActionHome from "./components/InActionHome";

function App() {
  return (
    <>
      <div
        className="bg-black min-h-screen relative bg-gradient-to-tr
    
    background-animate"
      >
        <div className="max-w-7xl  px-10 py-5 mx-auto flex">
          <div className="flex flex-col w-full min-h-screen">
            <Header />
            <div className="relative">
              <div className="absolute inset-6   background-animate  bg-gradient-to-r to-blue-800 from-pink-800 rounded-lg blur-3xl opacity-75 group-hover:opacity-100 transition duration-800 group-hover:duration-200 animate-tilt"></div>
              <InActionHome />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
