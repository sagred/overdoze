import React, { useState } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import { ecoFriendlyStores } from "@/utils/stores";

const LOGO_API_KEY = "pk_LxPaQgP0R9Wkq8_4-ld-Ew";

const Map = () => {
  const [selectedStore, setSelectedStore] = useState(null);

  // Create a circular polygon around San Francisco with a radius of 5 kilometers
  const center = [-122.431297, 37.773972];
  const radius = 5; // in kilometers
  const options = { steps: 200, units: "kilometers" }; // Increase steps for a smoother circle
  const circle = turf.circle(center, radius, options);

  const circleData = {
    type: "FeatureCollection",
    features: [circle],
  };

  const circleLayer = {
    id: "circle-layer",
    type: "fill",
    paint: {
      "fill-color": "green",
      "fill-opacity": 0.2,
    },
  };

  // Fetch logos using Logo.dev API
  const fetchLogo = (domain) =>
    `https://img.logo.dev/${domain}?token=${LOGO_API_KEY}&format=png`;

  const handleMarkerClick = (store) => {
    setSelectedStore(store);
    document.getElementById("map_modal").showModal();
  };

  return (
    <div className="w-full h-screen">
      <dialog id="map_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {selectedStore && (
            <>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <img
                src={fetchLogo(selectedStore.domain)}
                alt={selectedStore.name}
                className="rounded-full w-16 h-16 mx-auto"
              />
              <h3 className="font-bold text-lg text-center mt-2">
                {selectedStore.name}
              </h3>
              <p className="py-4 text-center">{selectedStore.sustainability}</p>
              <p className="py-4 text-center">
                Earn <span className="font-bold text-primary">2X</span> B3TR
                tokens for making purchases from this store! 🛒
              </p>
              <form method="dialog" className="text-center">
                <button className="btn bg-primary text-white w-full mt-4">
                  Shop Now & Earn Big!
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>

      <ReactMapGL
        mapboxAccessToken="pk.eyJ1Ijoic2FncmVkIiwiYSI6ImNseTBubm5ubjBud3IybHB4M2piaXc0OGIifQ.BGHERT36Nl7ptiCtfWtxOw"
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: -122.431297,
          latitude: 37.773972,
          zoom: 10,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <Source id="circle-source" type="geojson" data={circleData}>
          <Layer {...circleLayer} />
        </Source>
        {ecoFriendlyStores.map((store) => (
          <Marker
            key={store.id}
            longitude={store.coordinates[0]}
            latitude={store.coordinates[1]}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <img
              src={fetchLogo(store.domain)}
              alt={store.name}
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              onClick={() => handleMarkerClick(store)}
            />
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;
