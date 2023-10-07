"use client";
import { useEffect, useState } from "react";
import { FilterItems } from "@components/FilterItems";
import { useFiltersStore } from "@store/filters";
import { usePinsStore } from "@store/pins";
import io from "socket.io-client";
import { log } from "console";

const socket = io("http://localhost:8080", {
  transports: ["websocket"],
}); // Use the correct port if it's different
socket.on("connect", () => {
  console.log("Connected to server");
});

export const FiltersButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pins = usePinsStore((state) => state.pins);
  const updatePins = usePinsStore((state) => state.updatePins);
  const { filters, updateFilter } = useFiltersStore();
  const [uav1Data, setUav1Data] = useState<any>();
  const [uav2Data, setUav2Data] = useState<any>();

  // Démarrez la mise à jour des données à intervalles de 1 seconde
  const [uav1, setuav1] = useState({
    batInf: { id: "1", vl: "16.2", pt: "1.0" },
    gpsdata: {
      fx: "3",
      ns: "10",
      lat: "31.04197",
      lon: "3.7525",
      abs: "-121.7388",
      rel: "",
    },
    uavstat: {
      in_air: "True",
      armed: "2",
      state: "3",
      mav_msg: "",
      health: "",
      fm: "",
    },
  });
  const [uav2, setuav2] = useState({
    batInf: { id: "1", vl: "16.2", pt: "1.0" },
    gpsdata: {
      fx: "3",
      ns: "10",
      lat: "31.04197",
      lon: "3.7525",
      abs: "-121.7388",
      rel: "",
    },
    uavstat: {
      in_air: "True",
      armed: "2",
      state: "3",
      mav_msg: "",
      health: "",
      fm: "",
    },
  });

  useEffect(() => {
    // Écoutez les événements émis par le serveur Socket.io
    socket.on("gpsData-uav1", (data) => {
      setUav1Data(data);
      console.log("Hello Zords", data);

      setuav1((prevUav1) => ({
        ...prevUav1,
        gpsdata: {
          ...prevUav1.gpsdata,
          lat: (data as any)?.gpsdata1?.lat || 0,
          lon: (data as any)?.gpsdata1?.lon || 0,
        },
      }));
    });

    socket.on("gpsData-uav2", (data) => {
      setUav2Data(data);
      setuav2((prevUav2) => ({
        ...prevUav2,
        gpsdata: {
          ...prevUav2.gpsdata,
          lat: (data as any)?.gpsdata2?.lat || 0,
          lon: (data as any)?.gpsdata2?.lon || 0,
        },
      }));
    });
  }, []);

  useEffect(() => {
    // Votre code à exécuter lorsque uav1 change
    // Vous pouvez mettre à jour chargingStation ici en utilisant les nouvelles valeurs de uav1
    const newChargingStation = {
      id: parseFloat(uav1.batInf.id),
      vl: parseFloat(uav1.batInf.vl),
      pt: parseFloat(uav1.batInf.pt),
      fx: parseFloat(uav1.gpsdata.fx),
      ns: parseFloat(uav1.gpsdata.ns),
      latitude: parseFloat(uav1.gpsdata.lat),
      longitude: parseFloat(uav1.gpsdata.lon),
      abs: parseFloat(uav1.gpsdata.abs),
      rel: parseFloat(uav1.gpsdata.rel),
      in_air: parseFloat(uav1.uavstat.in_air),
      armed: parseFloat(uav1.uavstat.armed),
      state: parseFloat(uav1.uavstat.state),
      mav_msg: parseFloat(uav1.uavstat.mav_msg),
      health: parseFloat(uav1.uavstat.health),
      fm: parseFloat(uav1.uavstat.fm),
    };
    const newChargingStation2 = {
      id: parseFloat(uav2.batInf.id),
      vl: parseFloat(uav2.batInf.vl),
      pt: parseFloat(uav2.batInf.pt),
      fx: parseFloat(uav2.gpsdata.fx),
      ns: parseFloat(uav2.gpsdata.ns),
      latitude: parseFloat(uav2.gpsdata.lat),
      longitude: parseFloat(uav2.gpsdata.lon),
      abs: parseFloat(uav2.gpsdata.abs),
      rel: parseFloat(uav2.gpsdata.rel),
      in_air: parseFloat(uav2.uavstat.in_air),
      armed: parseFloat(uav2.uavstat.armed),
      state: parseFloat(uav2.uavstat.state),
      mav_msg: parseFloat(uav2.uavstat.mav_msg),
      health: parseFloat(uav2.uavstat.health),
      fm: parseFloat(uav2.uavstat.fm),
    };

    // Mettez à jour chargingStation avec les nouvelles valeurs
    setChargingStation(newChargingStation);
    setChargingStation2(newChargingStation2);
  }, [uav1, uav2]);
  // useEffect(() => {
  //   // Fonction pour mettre à jour lat et lon chaque seconde
  //   const updateLatLon = () => {
  //     // if uav1Data ? existe

  //     setuav1((prevUav1) => ({
  //       ...prevUav1,
  //       gpsdata: {
  //         ...prevUav1.gpsdata,
  //         lat: (uav1Data as any)?.gpsdata?.lat || 0,
  //         lon: (uav1Data as any)?.gpsdata?.lon || 0,
  //       },
  //     }));
  //   };

  //   // Démarrez l'intervalle pour mettre à jour lat/lon chaque seconde
  //   const intervalId = setInterval(updateLatLon, 1000);

  //   // Nettoyez l'intervalle lorsque le composant est démonté
  //   return () => clearInterval(intervalId);
  // }, []);

  const [chargingStation, setChargingStation] = useState({
    id: parseFloat(uav1.batInf.id),
    vl: parseFloat(uav1.batInf.vl),
    pt: parseFloat(uav1.batInf.pt),
    fx: parseFloat(uav1.gpsdata.fx),
    ns: parseFloat(uav1.gpsdata.ns),
    latitude: parseFloat(uav1.gpsdata.lat),
    longitude: parseFloat(uav1.gpsdata.lon),
    abs: parseFloat(uav1.gpsdata.abs),
    rel: parseFloat(uav1.gpsdata.rel),
    in_air: parseFloat(uav1.uavstat.in_air),
    armed: parseFloat(uav1.uavstat.armed),
    state: parseFloat(uav1.uavstat.state),
    mav_msg: parseFloat(uav1.uavstat.mav_msg),
    health: parseFloat(uav1.uavstat.health),
    fm: parseFloat(uav1.uavstat.fm),
  });
  const [chargingStation2, setChargingStation2] = useState({
    id: parseFloat(uav2.batInf.id),
    vl: parseFloat(uav2.batInf.vl),
    pt: parseFloat(uav2.batInf.pt),
    fx: parseFloat(uav2.gpsdata.fx),
    ns: parseFloat(uav2.gpsdata.ns),
    latitude: parseFloat(uav2.gpsdata.lat),
    longitude: parseFloat(uav2.gpsdata.lon),
    abs: parseFloat(uav2.gpsdata.abs),
    rel: parseFloat(uav2.gpsdata.rel),
    in_air: parseFloat(uav2.uavstat.in_air),
    armed: parseFloat(uav2.uavstat.armed),
    state: parseFloat(uav2.uavstat.state),
    mav_msg: parseFloat(uav2.uavstat.mav_msg),
    health: parseFloat(uav2.uavstat.health),
    fm: parseFloat(uav2.uavstat.fm),
  });

  useEffect(() => {
    const ar: any = [chargingStation, chargingStation2];
    console.log(ar);
    updatePins(ar);
  }, [chargingStation, updatePins, chargingStation2]);

  // Appeler la fonction pour commencer à générer des coordonnées proches périodiquement

  const handleButtonCLick = () => {
    setIsOpen(!isOpen);
  };

  const handleFilters = () => {
    console.log("filters", filters);
    setIsLoading(true);
    const filtersData = Array.from(filters)
      .filter((d) => d[1].length > 0)
      .map((d) => {
        return d[1].includes("all")
          ? `${d[0]}=all`
          : `${d[0]}=${d[1].join(",")}`;
      });
    console.log("filtersData", filtersData);
    fetch("/api/load-pins/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtersData),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log("results", results);
        console.log("URL===========>>>>", results.url);

        updatePins(results.data.fuel_stations);
        setIsLoading(false);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <div
        onClick={handleButtonCLick}
        className="p-2 border cursor-pointer select-none rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
      >
        Filters
      </div>
      {isOpen && (
        <div className="w-10/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-opacity-90 bg-white border rounded-xl shadow-md p-4">
          <div
            className="absolute top-0 right-0 p-2 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <img src="/icons/close.svg" alt="" width={40} />
          </div>
          <FilterItems
            title="Charger type"
            parameter="ev_charging_level"
            list={[
              { displayName: "All", value: "all" },
              { displayName: "Level 1", value: "1" },
              { displayName: "Level 2", value: "2" },
              { displayName: "DC Fast", value: "dc_fast" },
            ]}
            selectedFilters={filters}
            updateFilter={updateFilter}
          />
          <FilterItems
            title="Connector type"
            parameter="ev_connector_type"
            list={[
              { displayName: "All", value: "all" },
              { displayName: "NEMA 14-50", value: "NEMA1450" },
              { displayName: "NEMA 5-15", value: "NEMA515" },
              { displayName: "NEMA 5-20", value: "NEMA520" },
              { displayName: "J1772", value: "J1772" },
              { displayName: "CCS", value: "J1772COMBO" },
              { displayName: "CHAdeMO", value: "CHADEMO" },
              { displayName: "Tesla", value: "TESLA" },
            ]}
            selectedFilters={filters}
            updateFilter={updateFilter}
          />
          <FilterItems
            title="Charging network"
            parameter="ev_network"
            list={[
              { displayName: "All", value: "all" },
              { displayName: "7Charge", value: "7CHARGE" },
              { displayName: "AddÉnergie", value: "AddÉnergie Technologies" },
              { displayName: "AmpUp", value: "AMPUP" },
              { displayName: "BC Hydro", value: "BCHYDRO" },
              { displayName: "Blink", value: "Blink Network" },
              { displayName: "ChargeLab", value: "CHARGELAB" },
              { displayName: "ChargePoint", value: "ChargePoint Network" },
              { displayName: "ChargeUp", value: "CHARGEUP" },
              { displayName: "Chargie", value: "CHARGIE" },
              { displayName: "CircleK Charge", value: "CIRCLE_K" },
              {
                displayName: "CircleK/Couche-Tard Recharge",
                value: "COUCHE_TARD",
              },
              {
                displayName: "Circuit électrique",
                value: "Circuit électrique",
              },
              { displayName: "eCharge Network", value: "eCharge Network" },
              { displayName: "Electrify America", value: "Electrify America" },
              { displayName: "Electrify Canada", value: "Electrify Canada" },
              { displayName: "EV Charging Solutions", value: "EVCS" },
              { displayName: "EV Connect", value: "EV Connect" },
              { displayName: "evGateway", value: "EVGATEWAY" },
              { displayName: "EVgo", value: "eVgo Network" },
              { displayName: "EV Range", value: "EVRANGE" },
              { displayName: "FLASH", value: "FLASH" },
              { displayName: "FLO", value: "FLO" },
              { displayName: "FPL EVolution", value: "FPLEV" },
              { displayName: "Francis", value: "FCN" },
              { displayName: "Graviti Energy", value: "GRAVITI_ENERGY" },
              { displayName: "Ivy", value: "IVY" },
              { displayName: "Livingston Energy Group", value: "LIVINGSTON" },
              { displayName: "Non-Networked", value: "Non-Networked" },
              { displayName: "Noodoe", value: "NOODOE" },
              { displayName: "OpConnect", value: "OpConnect" },
              { displayName: "Petro-Canada", value: "PETROCAN" },
              { displayName: "PowerFlex", value: "POWERFLEX" },
              { displayName: "Red E Charging", value: "RED_E" },
              {
                displayName: "Rivian Adventure Network",
                value: "RIVIAN_ADVENTURE",
              },
              { displayName: "Rivian Waypoints", value: "RIVIAN_WAYPOINTS" },
              { displayName: "SemaConnect", value: "SemaCharge Network" },
              { displayName: "Shell Recharge", value: "SHELL_RECHARGE" },
              {
                displayName: "Sun Country Highway",
                value: "Sun Country Highway",
              },
              { displayName: "Swtch Energy", value: "SWTCH" },
              { displayName: "Tesla Destination", value: "Tesla Destination" },
              { displayName: "Tesla Supercharger", value: "Tesla" },
              { displayName: "Universal EV Chargers", value: "UNIVERSAL" },
              { displayName: "Volta", value: "Volta" },
              { displayName: "WAVE", value: "WAVE" },
              { displayName: "ZEF Network", value: "ZEFNET" },
            ]}
            selectedFilters={filters}
            updateFilter={updateFilter}
          />
          <FilterItems
            title="Status"
            parameter="status_code"
            list={[
              { displayName: "Available", value: "E" },
              { displayName: "Planned", value: "P" },
              { displayName: "Temporarily Unavailable", value: "T" },
            ]}
            selectedFilters={filters}
            updateFilter={updateFilter}
          />
          <FilterItems
            title="Status"
            parameter="ev_pricing"
            list={[
              { displayName: "Free", value: "Free" },
              { displayName: "Paid", value: "Paid" },
            ]}
            selectedFilters={filters}
            updateFilter={updateFilter}
          />
          <div
            onClick={handleFilters}
            className={`select-none ${
              isLoading ? "pointer-events-none" : ""
            } inline-block  text-white rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 cursor-pointer p-2 width-fit`}
          >
            {isLoading ? "Loading..." : "Show chargers"}
          </div>
        </div>
      )}
    </>
  );
};
