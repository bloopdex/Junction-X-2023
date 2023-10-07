import { DroneCard } from "@/components/DroneCard";
import React from "react";

function Statistics() {
  return (
    <div className="grid grid-cols-3 gap-4 place-items-stretch">
      <DroneCard
        youtube="https://www.youtube.com/embed/nsI2eMFEvkc?si=7ccFUEmP9oaSZLLm"
        title="Drone 1"
        air="In Air"
        battery="20%"
        power="In Power Supply"
      />
      <DroneCard
        youtube="https://www.youtube.com/embed/bBb_kSO3vTo?si=_WgO3LRfcGoSqBWJ"
        title="Drone 2"
        air="On Ground"
        battery="15%"
        power="In Power Supply"
      />
    </div>
  );
}

export default Statistics;
