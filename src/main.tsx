import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./globals.css";
import "@mysten/dapp-kit/dist/index.css"; // don't forget to import default stylesheet
import Creator from "./pages/Creator.tsx";
import MyAvatar from "./pages/MyAvatar.tsx";
import Docs from "./pages/docs.tsx";
import ImmersiveFace from "./pages/ImmersiveFace.tsx";

import { getFullnodeUrl } from "@mysten/sui.js/client";
import {
  SuiClientProvider,
  WalletProvider,
  createNetworkConfig,
} from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./pages/Profile.tsx";
import AvatarInAction from "./pages/AvatarInAction.tsx";

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "create",
    element: <Creator />,
  },
  {
    path: "avatar/:avatarId",
    element: <MyAvatar />,
  },
  {
    path: "avatar/in-action/:avatarId",
    element: <AvatarInAction />,
  },
  {
    path: "avatar/immersive-top/:avatarId",
    element: <ImmersiveFace />,
  },
  {
    path: "docs",
    element: <Docs />,
  },
  {
    path: "profile/:avatarId",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>
          <RouterProvider router={router} />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
