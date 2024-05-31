import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Docs() {
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
              <div className="bg-black mt-16">
                <h1 className="text-xl font-medium text-white">
                  Developer Docs
                </h1>

                <div className="mockup-code mt-10">
                  <pre data-prefix="1">
                    <code>{"import { OverdozeNFT } from 'overdoze'"}</code>
                  </pre>
                  <pre data-prefix="2">
                    <code></code>
                  </pre>
                  <pre data-prefix="3">
                    <code>{"const AvatarNFT = () => {"}</code>
                  </pre>
                  <pre data-prefix="4">
                    <code>{"    return ("}</code>
                  </pre>
                  <pre data-prefix="5">
                    <code>{"        <OverdozeNFT"}</code>
                  </pre>
                  <pre data-prefix="6">
                    <code>
                      {"            nftId={6658f24836c854537e2b1ac8}"}
                    </code>
                  </pre>
                  <pre data-prefix="7">
                    <code>{"        />"}</code>
                  </pre>
                  <pre data-prefix="8">
                    <code>{"    )"}</code>
                  </pre>
                  <pre data-prefix="9">
                    <code>{"}"}</code>
                  </pre>
                  <pre data-prefix="10">
                    <code>{""}</code>
                  </pre>
                  <pre data-prefix="11">
                    <code>{"export default AvatarNFT"}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Docs;
