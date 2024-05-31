import { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { PlayerStatsCard } from "@/components/player-stats-card";
import Header from "@/components/Header";
import bg1Image from "../assets/bg.jpeg";
import { Avatar } from "@readyplayerme/visage";

function AvatarInAction() {
  const { avatarId } = useParams<{ avatarId: string }>();

  const [url, setUrl] = useState<string>(
    `https://models.readyplayer.me/${avatarId}.glb`
  );
  const [isLoading, setIsLoading] = useState(false);

  const style = { width: "100%", height: "100vh", border: "none", margin: 0 };

  return (
    <>
      <div className="flex font-oxanium min-h-screen w-full h-full relative">
        <div
          style={{ backgroundImage: `url(${bg1Image})` }}
          className="background-image z-10"
        ></div>
        <div className="max-w-7xl mx-auto absolute top-0 z-50 ">
          <div className="bg-black w-screen z-50 px-10 py-2">
            <Header />
          </div>
        </div>
        <div className="flex backdrop-blur-sm bg-black/30 items-center w-full justify-center relative z-10">
          <div className="flex-1 p-4">
            {url && <Avatar style={style} modelSrc={url} />}
          </div>
          <div className="flex flex-col p-4 mr-20 text-white w-108">
            <PlayerStatsCard avatarId={avatarId || ""} />
            <div className="mt-5 w-96 bg-black p-2 px-4 flex flex-col items-start">
              <h1 className="my-2 font-medium">Immersive Experience</h1>
              <Link to={`/avatar/immersive-top/${avatarId}`}>
                <button className="btn btn-link btn-accent">
                  Facial capture
                </button>
              </Link>
              <button className="btn btn-accent btn-link">
                Full body motion capture
              </button>
              <Link to="/docs">
                <button className="btn  btn-link">Developer docs</button>
              </Link>
              <Link to={`/profile/${avatarId}`}>
                <button className="btn btn-link btn-accent">
                  Global ID example
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default AvatarInAction;
