import React from "react";
import AccountOverView from "@/components/AccountOverView";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Rewards() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="min-h-screen font-manrope relative bg-black">
        <div className="max-w-7xl px-2 py-5 mx-auto flex">
          <div className="flex flex-col w-full min-h-screen">
            <Header />
            <div className="relative mt-10">
              <div className="text-white h-full">
                <div className="space-y-10">
                  {/* Referral Section */}
                  <section className="bg-blue-900 bg-opacity-70 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">
                      Referral Program 🌟
                    </h2>
                    <p>
                      Invite your friends to join our eco-friendly community and
                      earn rewards! For every 5 B3TR tokens your referred
                      friends earn, you will receive 1 B3TR token. Start sharing
                      and earning today!
                    </p>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Enter your friend's email"
                        className="p-2 rounded bg-gray-700 text-white w-full mb-2"
                      />
                      <button className="btn bg-primary text-white w-full">
                        Invite & Earn 🎉
                      </button>
                    </div>
                  </section>

                  {/* Badges Section */}
                  <section className="bg-green-900 bg-opacity-70 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">
                      Badges & Achievements 🏅
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                        <h3 className="text-lg font-semibold">Eco Warrior</h3>
                        <p>For making 10 sustainable purchases</p>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                        <h3 className="text-lg font-semibold">
                          Green Champion
                        </h3>
                        <p>For earning 50 B3TR tokens</p>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                        <h3 className="text-lg font-semibold">Referral Star</h3>
                        <p>For referring 5 friends</p>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                        <h3 className="text-lg font-semibold">
                          Sustainability Leader
                        </h3>
                        <p>For making 20 sustainable purchases</p>
                      </div>
                    </div>
                  </section>

                  {/* Challenges and Goals Section */}
                  <section className="bg-red-900 bg-opacity-70 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">
                      Challenges & Goals 🎯
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">
                          Weekly Challenge
                        </h3>
                        <p>
                          Make 5 sustainable purchases this week and earn 10
                          B3TR tokens.
                        </p>
                        <button className="btn bg-primary text-white mt-2">
                          Start Challenge 🚀
                        </button>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">Monthly Goal</h3>
                        <p>
                          Refer 3 friends and make 10 sustainable purchases this
                          month to earn 50 B3TR tokens.
                        </p>
                        <button className="btn bg-primary text-white mt-2">
                          Accept Goal 🌟
                        </button>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">Daily Task</h3>
                        <p>
                          Make 1 sustainable purchase today and earn 2 B3TR
                          tokens.
                        </p>
                        <button className="btn bg-primary text-white mt-2">
                          Complete Task ✅
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Redeemable Rewards Section */}
                  <section className="bg-purple-900 bg-opacity-70 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">
                      Redeemable Rewards 🎁
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">
                          Eco-friendly Water Bottle
                        </h3>
                        <p>
                          Redeem 10 B3TR tokens for a reusable water bottle.
                        </p>
                        <button className="btn bg-primary text-white mt-2">
                          Redeem Now 💧
                        </button>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">
                          Organic Cotton Tote Bag
                        </h3>
                        <p>
                          Redeem 15 B3TR tokens for an organic cotton tote bag.
                        </p>
                        <button className="btn bg-primary text-white mt-2">
                          Redeem Now 👜
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Special Offers Section */}
                  <section className="bg-yellow-900 bg-opacity-70 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">
                      Special Offers ✨
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">
                          Double Tokens Weekend
                        </h3>
                        <p>
                          Earn double B3TR tokens for all purchases made this
                          weekend.
                        </p>
                        <button className="btn bg-primary text-white mt-2">
                          Learn More 🛍️
                        </button>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">
                          Limited Time Offer
                        </h3>
                        <p>
                          Get a 20% discount at participating stores when you
                          use B3TR tokens.
                        </p>
                        <button className="btn bg-primary text-white mt-2">
                          Get Discount 🎉
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Leaderboards Section */}
                  <section className="bg-teal-900 bg-opacity-70 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Leaderboards 🏆</h2>
                    <div className="space-y-4">
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">
                          Top Users This Week
                        </h3>
                        <ul className="list-disc list-inside">
                          <li>Jane Doe - 150 B3TR tokens</li>
                          <li>John Smith - 140 B3TR tokens</li>
                          <li>Emily Davis - 130 B3TR tokens</li>
                        </ul>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">
                          All-Time Leaders
                        </h3>
                        <ul className="list-disc list-inside">
                          <li>Michael Brown - 1200 B3TR tokens</li>
                          <li>Sarah Wilson - 1100 B3TR tokens</li>
                          <li>David Johnson - 1000 B3TR tokens</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Rewards;
