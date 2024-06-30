import { useWallet, useWalletModal } from "@vechain/dapp-kit-react";
import { humanAddress } from "../utils/FormattingUtils";
import dogSadAnimation from "../../public/animations/dogSad.json";
import dogHappyAnimation from "../../public/animations/dogHappy.json";
import Lottie from "react-lottie";

export const Wallet = () => {
  const { account } = useWallet();
  console.log(account);
  const { open } = useWalletModal();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dogHappyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (!account)
    return (
      <div>
        <Lottie options={defaultOptions} height={200} width={201} />
        <button className="btn btn-primary" onClick={open}>
          Connect Wallet
        </button>
      </div>
    );

  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={201} />
      <button onClick={open} className="btn btn-primary">
        <h2 className="text-white">Hello</h2>

        <h2>{humanAddress(account, 4, 6)}</h2>
      </button>
    </div>
  );
};
