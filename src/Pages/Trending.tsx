import Map from "@/components/Map";

function Trending() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col w-full">
        <div className="relative">
          <div className=" text-white h-screen">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trending;
