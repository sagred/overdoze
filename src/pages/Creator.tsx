import { useNavigate } from "react-router-dom";
import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
} from "@readyplayerme/react-avatar-creator";

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: false,
  language: "en",
};

const style = { width: "100%", height: "100vh", border: "none", margin: 0 };

function Creator() {
  const navigate = useNavigate();

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    const avatarId = event.data.avatarId;
    navigate(`/avatar/in-action/${avatarId}`);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AvatarCreator
        subdomain="global-avatar"
        config={config}
        style={{ display: "inherit", ...style }}
        onAvatarExported={handleOnAvatarExported}
      />
    </div>
  );
}

export default Creator;
