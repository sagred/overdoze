import React from "react";
import {
  ArrowDownIcon,
  ArrowLeftRightIcon,
  ArrowUpIcon,
  CheckBadgeIcon,
} from "./icons";
import Plaid from "./Plaid";
import Lottie from "react-lottie";
import dogSadAnimation from "../../public/animations/dogSad.json";
import dogHappyAnimation from "../../public/animations/dogHappy.json";
import { useVeFeStore } from "@/utils/store";

function AccountOverView() {
  const { isPetActive, totalB3TRTokens, totalVETBalance, wallet } =
    useVeFeStore();

  console.log("Wallet", wallet);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: isPetActive ? dogHappyAnimation : dogSadAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const TrimmedWalletAddress = ({ address, startChars = 6, endChars = 4 }) => {
    const start = address.substring(0, startChars);
    const end = address.substring(address.length - endChars);
    return (
      <p className="bg-black px-2 text-white rounded-lg mb-2">
        {`${start}...${end}`}
      </p>
    );
  };
  return (
    <>
      <div className="card w-full bg-gradient-to-br from-primary via-green-800 to-slate-950 rounded-3xl text-primary-content">
        <div className="card-body flex flex-row items-center justify-between">
          <div>
            {wallet && (
              <TrimmedWalletAddress
                address={wallet}
                startChars={10}
                endChars={4}
              />
            )}
            <h2 className="card-title">Your Balance</h2>
            <h1 className="text-4xl font-bold">{totalVETBalance} VET</h1>
            <div className="flex items-center justify-center gap-2 mr-10 mt-4">
              <img
                src="https://vechainstats.com/assets/media/token-icon_b3tr.png?r=1.2"
                className="w-8 h-8"
              />
              <h1 className="text-2xl font-bold">{totalB3TRTokens} B3TR</h1>
            </div>
          </div>
          <div className="justify-end">
            <Lottie options={defaultOptions} height={100} width={110} />
          </div>
          {/* <div className="card-actions justify-end">
            <button className="btn">Connect bank account</button>
          </div> */}
        </div>
      </div>
      <div className="mt-10">
        <div className="flex gap-2 text-base-content">
          <div className="flex flex-col gap-2 flex-1 items-center border border-neutral-700 justify-center bg-base-300 font-semibold rounded-2xl p-6">
            <ArrowDownIcon />
            <h3>Deposit</h3>
          </div>

          <div className="flex flex-col gap-2 flex-1 items-center justify-center bg-base-300 border border-neutral-700 font-semibold  rounded-2xl p-6">
            <ArrowUpIcon />
            <h3>Withdraw</h3>
          </div>

          <div className="flex flex-col gap-2 flex-1 items-center justify-center bg-base-300 border border-neutral-700 font-semibold  rounded-2xl p-6">
            <ArrowLeftRightIcon />
            <h3>Transfer</h3>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Plaid />
      </div>
    </>
  );
}

export default AccountOverView;
