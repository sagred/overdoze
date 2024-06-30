import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout.tsx";
import Trending from "./Pages/Trending.tsx";
import Rewards from "./Pages/Rewards.tsx";
import Home from "./Pages/Home.tsx";
import { DAppKitProvider } from "@vechain/dapp-kit-react";
import { Wallet } from "./components/Wallet.tsx";
import Map from "./components/Map.tsx";
import { PrivyProvider } from "@privy-io/react-auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/explore",
    element: (
      <Layout>
        <Trending />
      </Layout>
    ),
  },
  {
    path: "/rewards",
    element: (
      <Layout>
        <Rewards />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider
      appId="cly1788dl04831zy70yoa2f8e"
      config={{
        // Display email and wallet as login methods
        loginMethods: ["google", "twitter", "apple"],
        // Customize Privy's appearance in your app
        appearance: {
          theme: "dark",
          accentColor: "#24950d",
          logo: "https://your-logo-url",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <DAppKitProvider
        usePersistence
        requireCertificate={false}
        genesis="test"
        nodeUrl="https://testnet.vechain.org/"
        logLevel={"DEBUG"}
      >
        <RouterProvider router={router} />
      </DAppKitProvider>
    </PrivyProvider>
  </React.StrictMode>
);
