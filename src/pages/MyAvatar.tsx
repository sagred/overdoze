import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@readyplayerme/visage";

function MyAvatar() {
  const { avatarId } = useParams<{ avatarId: string }>();
  const avatarUrl = `https://models.readyplayer.me/${avatarId}.glb`;

  const [isLoading, setIsLoading] = useState(true);

  const style = { width: "100%", height: "100vh", border: "none", margin: 0 };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mt-10">
        {isLoading ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          <Link to="/create">
            <button className="btn btn-lg btn-accent">Create New Avatar</button>
          </Link>
        )}
      </div>
      <Avatar
        modelSrc={avatarUrl}
        style={style}
        onLoaded={() => setIsLoading(false)}
      />
    </div>
  );
}

export default MyAvatar;
