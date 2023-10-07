"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { FiltersButton } from "../FiltersButton";
import { BsBatteryFull } from "react-icons/bs";
import { RiGpsFill } from "react-icons/ri";
import { TbDrone } from "react-icons/tb";
import { AiFillPieChart } from "react-icons/ai";
import Input from "../Input";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import BatterySupply from "../BatterySupply";

function SideBar() {
  const [styleSelected, setStyleSelected] = useState<number>(0);

  useEffect(() => {
    const style = localStorage.getItem("style");
    if (style) {
      setStyleSelected(parseInt(style));
    }
  }, []);
  const [selected, setSelected] = useState<number>(-1);

  const [option, setOption] = useState<string>("ON AIR");

  return (
    <div className="flex p-4 flex-col align-center justify-between h-screen items-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row align-center justify-center items-center">
          <img src="logo.png" className="mr-2 w-20" />
          <div className="flex flex-col gap-1 justify-start items-start">
            <h1 className="text-xl">
              <span className="text-primary-500">Sky</span>Link
            </h1>
            <p className="text-[0.6rem]">tracking your drone</p>
          </div>
        </div>
        {/* <Button text="Create Drone" /> */}
        <div className="flex flex-col gap-2 text-center">
          <p className="text-[.8rem]">Style De Map</p>
          <div className="flex flex-row w-full">
            <button
              type="button"
              className={`w-20 ${
                styleSelected === 0
                  ? "bg-primary-700 text-white"
                  : "bg-grey text-black"
              } disabled:bg-grey  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 focus:outline-none `}
              onClick={() => {
                localStorage.setItem("style", "0");
                setStyleSelected(0);
                window.location.reload();
              }}
            >
              Satellite
            </button>
            <button
              type="button"
              className={`w-20 ${
                styleSelected === 1
                  ? "bg-primary-700 text-white"
                  : "bg-grey text-black"
              } disabled:bg-grey  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 focus:outline-none `}
              onClick={() => {
                localStorage.setItem("style", "1");
                setStyleSelected(1);
                window.location.reload();
              }}
            >
              Streets
            </button>
            <button
              type="button"
              className={`w-20 ${
                styleSelected === 2
                  ? "bg-primary-700 text-white text-center"
                  : "bg-grey text-black"
              } disabled:bg-grey  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 focus:outline-none `}
              onClick={() => {
                localStorage.setItem("style", "2");
                setStyleSelected(2);
                window.location.reload();
              }}
            >
              Navigation Day
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p className="font-bold">Battery</p>
              <BsBatteryFull size={24} className="text-primary-600" />
            </div>
            <p className="text-[.8rem]">Battery Level</p>
            <div className="flex flex-row justify-between gap-4">
              <Input placeholder="min" />
              <Input placeholder="max" />
            </div>
            <BatterySupply />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <p className="font-bold">Proximity</p>
                <RiGpsFill size={24} className="text-primary-600" />
              </div>
              <p className="text-[.8rem]">Proximity</p>
              <div className="flex flex-row items-center gap-4">
                <Input placeholder="100" />
                <div className=" w-full flex flex-row justify-center items-center">
                  <p>Km</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <p className="font-bold">Vehicule</p>
              <TbDrone size={24} className="text-primary-600" />
            </div>
            <p className="text-[.8rem]">Model of your UAV</p>
            <div className="flex flex-row w-full">
              <button
                type="button"
                className={`w-20 ${
                  selected === 0
                    ? "bg-primary-700 text-white"
                    : "bg-grey text-black"
                } disabled:bg-grey  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 focus:outline-none `}
                onClick={() => setSelected(0)}
              >
                Drone
              </button>
              <button
                type="button"
                className={`w-20 ${
                  selected === 1
                    ? "bg-primary-700 text-white"
                    : "bg-grey text-black"
                } disabled:bg-grey  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 focus:outline-none `}
                onClick={() => setSelected(1)}
              >
                UAV No arms
              </button>
              <button
                type="button"
                className={`w-20 ${
                  selected === 2
                    ? "bg-primary-700 text-white"
                    : "bg-grey text-black"
                } disabled:bg-grey  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 focus:outline-none `}
                onClick={() => setSelected(2)}
              >
                Drone with arm
              </button>
            </div>
            <p className="text-[.8rem]">Flight mode</p>
            <Dropdown
              options={["ON AIR", "ON GROUND"]}
              onChange={(option) => {
                setOption(option.value);
              }}
              value={"ON AIR"}
              placeholder="Select an option"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`w-full bg-primary-700 text-white disabled:bg-grey  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none `}
        onClick={() => setSelected(2)}
      >
        Filter
      </button>
      <div className="flex flex-row gap-2 font-bold text-2xl text-primary-700">
        <AiFillPieChart />
        <button type="button" onClick={() => setSelected(2)}>
          Analysis
        </button>
      </div>
      {/* <FiltersButton /> */}
    </div>
  );
}

export default SideBar;
