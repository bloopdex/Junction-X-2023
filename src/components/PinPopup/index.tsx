import { use, useEffect, useState } from "react";
import { Tabs } from "../Tabs";
import { useDirectionsStore } from "@store/directions";
import VideoPlayer from "../VideoPlayer";

export interface PinProps {
  id: number;
  vl: number;
  pt: number;
  fx: number;
  ns: number;
  latitude: number;
  longitude: number;
  abs: number;
  rel: number;
  in_air: number;
  armed: number;
  state: number;
  mav_msg: number;
  health: number;
  fm: number;
}

interface PinPopupProps {
  pin: PinProps;
  setSelectedPin: (pin: PinProps | any) => void;
}

interface VideoPlayerProps {
  videoStreamUrl: string;
}

interface VideoPlayerProps {
  videoStreamUrl: string;
}

export const PinPopup = ({ pin, setSelectedPin }: PinPopupProps) => {
  const { updateRoute } = useDirectionsStore();
  const [checkInVisible, setCheckInVisible] = useState<boolean>(false);

  const handleCheckInClick = () => {
    setCheckInVisible(!checkInVisible);
  };
  const handleGetDirectionsClick = () => {
    console.log("get directions");
    //get uuser position
    navigator.geolocation.getCurrentPosition((position) => {
      const userPosition = `${position.coords.longitude},${position.coords.latitude}`;
      const destination = `${pin.longitude},${pin.latitude}`;

      //&overview=full
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userPosition};${destination}?steps=true&geometries=geojson&access_token=` +
          "pk.eyJ1IjoiYm91aHppbGExIiwiYSI6ImNsbmRvNXd0MDA1emcyam9obTR5ZWd1MnIifQ.am_ZMozQCpGPyQD0u3fuAQ"
      )
        .then((response) => response.json())
        .then((data) => {
          // Process the directions data and display it on the map or in your UI
          console.log(data);
          updateRoute(data.routes);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log(position);
    });
  };

  const videoStreamUrl1 = "ws://13.38.173.241:3333/app/1";

  return (
    <div className="w-100 h-screen absolute top-1/2 right-[150px] transform translate-x-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-lg ">
      <div
        className="absolute top-0 right-0 p-2 cursor-pointer"
        onClick={() => {
          setSelectedPin(undefined);
        }}
      >
        <img src="/icons/close.svg" alt="" width={40} />
      </div>
      <div className="flex flex-col">
        {/* vide  */}
        <VideoPlayer />
        <div className="p-4">
          <div className="text-lg font-bold flex flex-row justify-between">
            <div className="flex justify-center align-middle "></div>
          </div>
          <div className="flex flex-row justify-between ">
            <div>{}</div>
            <div>
              <a
                target="_blank"
                href={""}
                className=" underline text-[#FF4166] font-bold"
              >
                {}
              </a>
            </div>
          </div>
          <div>
            <div className="info p-4 border border-gray-300 rounded-md mb-2">
              <h1 className="text-lg font-semibold mb-2">
                Battery Information
              </h1>
              <ul>
                <li>
                  <strong>Battery ID:</strong> {pin.id}
                </li>
                <li>
                  <strong>Battery Voltage:</strong> {pin.vl}
                </li>
                <li>
                  <strong>Battery Power Supply Status:</strong> {pin.pt}
                </li>
              </ul>
            </div>

            <div className="info p-4 border border-gray-300 rounded-md mb-2">
              <h1 className="text-lg font-semibold mb-2">GPS Data</h1>
              <ul>
                <li>
                  <strong>GPS Fixation status (Boolean):</strong> {pin.fx}
                </li>
                <li>
                  <strong>Satellites Number:</strong> {pin.ns}
                </li>
                <li>
                  <strong>Latitude:</strong> {pin.latitude}
                </li>
                <li>
                  <strong>Longitude:</strong> {pin.longitude}
                </li>
                <li>
                  <strong>Absolute Altitude:</strong> {pin.abs}
                </li>
                <li>
                  <strong>Relative altitude to starting point: </strong>{" "}
                  {pin.rel}
                </li>
              </ul>
            </div>

            <div className="info p-4 border border-gray-300 rounded-md mb-4">
              <h1 className="text-lg font-semibold mb-2">UAV Status</h1>
              <ul>
                <li>
                  <strong>UAV in flight (Boolean):</strong> {pin.in_air}
                </li>
                <li>
                  <strong>Armed UAV (Boolean):</strong> {pin.armed}
                </li>
                <li>
                  <strong>State:</strong> {pin.state}
                </li>
                <li>
                  <strong>MAVLink messages: </strong> {pin.mav_msg}
                </li>
                <li>
                  <strong>System Health Status:</strong> {pin.health}
                </li>
                <li>
                  <strong>Flight mode:</strong> {pin.fm}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
