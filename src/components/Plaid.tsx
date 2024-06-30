import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import { CheckBadgeIcon } from "./icons";
import Lottie from "react-lottie";
import greenDotsSpinning from "../../public/animations/greenDotsSpinning.json";
import { useVeFeStore } from "@/utils/store";
import dogHappyAnimation from "../../public/animations/dogHappy.json";

axios.defaults.baseURL = "https://48t4ac-ip-172-56-208-64.tunnelmole.net";

function PlaidAuth({ publicToken }) {
  const {
    account,
    setAccount,
    transactions,
    setTransactions,
    setTotalB3TRTokens,
    setIsPetActive,
  } = useVeFeStore();

  const [accLoading, setAccLoading] = useState(false);

  const petConfig = {
    loop: true,
    autoplay: true,
    animationData: accLoading ? greenDotsSpinning : dogHappyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const afterAccModalRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/exchange_public_token", {
        public_token: publicToken,
      });
      console.log("accessToken", accessToken.data);
      const auth = await axios.post("/auth", {
        access_token: accessToken.data.accessToken,
      });
      console.log("auth data ", auth.data);
      setAccount(auth.data.numbers.ach[0]);
    }
    fetchData();
  }, [publicToken]);

  const fetchTransactions = async () => {
    try {
      let accessToken = await axios.post("/exchange_public_token", {
        public_token: publicToken,
      });
      const response = await axios.post("/transactions", {
        access_token: accessToken.data.accessToken,
      });

      const manualTransactions = [
        {
          transaction_id: "1",
          name: "WAYMO",
          date: "2024-06-30",
          amount: 15.65,
        },
        {
          transaction_id: "2",
          name: "Clipper Systems",
          date: "2024-06-29",
          amount: 3,
        },
        {
          transaction_id: "3",
          name: "LYFT HQ",
          date: "2024-06-29",
          amount: 21.36,
        },
        {
          transaction_id: "4",
          name: "UNIQLO",
          date: "2024-06-25",
          amount: 198.14,
        },
        // Simulated sustainable transactions
        {
          transaction_id: "5",
          name: "Starbucks",
          date: "2024-06-28",
          amount: 5.75,
        },
        { transaction_id: "6", name: "Uber", date: "2024-06-27", amount: 12.5 },
        {
          transaction_id: "7",
          name: "Whole Foods Market",
          date: "2024-06-26",
          amount: 45.0,
        },
        {
          transaction_id: "8",
          name: "Trader Joe's",
          date: "2024-06-24",
          amount: 30.0,
        },
      ];

      setTransactions([...manualTransactions, ...response.data]);
      setTimeout(() => {
        document.getElementById("after_acc_modal").showModal();
        setIsPetActive(true);
      }, 2000);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (account != null && transactions.length === 0) {
      fetchTransactions();
    }
  }, [account, fetchTransactions]);

  const calculateRoundup = (amount) => {
    const decimalPart = amount % 1;
    return decimalPart === 0 ? 1 : (1 - decimalPart).toFixed(2);
  };

  const isSustainable = (name) => {
    const sustainableKeywords = [
      "Uber",
      "Starbucks",
      "Whole Foods Market",
      "Trader Joe's",
      "WAYMO",
      "LYFT",
    ];
    return sustainableKeywords.some((keyword) => name.includes(keyword));
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: greenDotsSpinning,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const sustainableTransactions = transactions.filter((transaction) =>
    isSustainable(transaction.name)
  );
  const totalSustainableAmount = sustainableTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const handleGetMyTokens = (tokenCount) => {
    setTotalB3TRTokens(tokenCount);
    setAccLoading(true);
    setTimeout(() => {
      afterAccModalRef.current.close();
      setAccLoading(false);
    }, 5000);
  };

  return (
    account && (
      <>
        {/* <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          open modal
        </button> */}

        <dialog
          ref={afterAccModalRef}
          id="after_acc_modal"
          className="modal modal-bottom sm:modal-middle "
        >
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Congratulations! 🎉</h3>
            <p className="py-4">
              We are thrilled to share some great news with you! Here's what we
              found:
            </p>
            <div className="flex flex-col gap-2">
              <p>
                🌱{" "}
                <strong>
                  {sustainableTransactions.length} sustainable transactions
                </strong>{" "}
                in your account over the last week!
              </p>
              <p>
                🎁 As a first-time user, you’ve earned{" "}
                <strong>{sustainableTransactions.length} B3TR tokens</strong>!
              </p>
              <p>
                🌟 From now on, you'll continue to earn B3TR tokens with each
                sustainable transaction you make.
              </p>
              <p>
                🐾 Your virtual pet is delighted and healthier thanks to your
                green choices!
              </p>

              <div className="mt-8 mb-20 ">
                <Lottie options={petConfig} height={100} width={110} />
              </div>
            </div>

            <button
              onClick={() => handleGetMyTokens(sustainableTransactions.length)}
              className="btn bg-primary text-white w-full mt-4"
            >
              Get My Tokens
            </button>
          </div>
        </dialog>

        <div>
          <h2 className="font-semibold text-xl">Sustainable Transactions</h2>
          <div className="py-4">
            <h4 className="text-md">
              Total Sustainable Amount: ${totalSustainableAmount.toFixed(2)}
            </h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{
                  width: `${
                    (sustainableTransactions.length / transactions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {transactions.length === 0 && (
            <div>
              <Lottie options={defaultOptions} height={200} width={200} />
            </div>
          )}
          {transactions.map((transaction) => (
            <div
              key={transaction.transaction_id}
              className={`flex items-center border-b border-neutral-900 gap-2 py-4`}
            >
              <div
                className={
                  isSustainable(transaction.name)
                    ? "text-primary animate-pulse"
                    : "text-neutral-500"
                }
              >
                <CheckBadgeIcon />
              </div>
              <div className="flex justify-between w-full text-base-content">
                <div className="flex flex-col">
                  <h4 className="text-md">{transaction.name}</h4>
                  <h4 className="text-xs text-base-content text-opacity-70">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h4>
                </div>
                <div className="flex flex-col items-end">
                  <h4 className="text-md">${transaction.amount}</h4>
                  <h4 className="text-xs text-base-content text-opacity-70">
                    ${calculateRoundup(transaction.amount)}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  );
}

function Plaid() {
  const [linkToken, setLinkToken] = useState();
  const { publicToken, setPublicToken } = useVeFeStore();

  useEffect(() => {
    async function fetch() {
      const response = await axios.post("/create_link_token");
      setLinkToken(response.data.link_token);
    }
    fetch();
    // document.getElementById("my_modal_3").showModal();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("success", public_token, metadata);
      // send public_token to server
    },
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: greenDotsSpinning,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return publicToken ? (
    <PlaidAuth publicToken={publicToken} />
  ) : (
    <>
      <div>
        <h2>Connected Accounts</h2>
        <h4 className="mt-2 text-sm text-neutral-500">
          You don't have any connected accounts
        </h4>
      </div>
      <button
        className="btn w-full mt-4 z-50 btn-primary"
        onClick={() => open()}
        disabled={!ready}
      >
        Connect your credit card
      </button>

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button></button>
          </form>
          <h3 className="font-bold text-lg">Welcome to VeFe</h3>
          <p className="py-4">
            VeFe rewards you for making eco-friendly purchases. Here’s what you
            can do with our app:
          </p>
          <ul className="list-disc list-inside">
            <li>Track your eco-friendly purchases automatically.</li>
            <li>Earn B3TR tokens for every green purchase.</li>
            <li>Find eco-friendly stores and zones on our map.</li>
            <li>
              Take care of a virtual pet that grows with your green actions.
            </li>
            <li>See live updates and events for sustainable shopping.</li>
          </ul>
          <p className="py-4">
            Join us in making the world a greener place with VeFe!
          </p>
          <form method="dialog">
            <button className="btn bg-white text-black w-full mt-4">
              Let's go 🚀
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Plaid;
