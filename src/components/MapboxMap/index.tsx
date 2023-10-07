"use client";
import { usePinsStore } from "@store/pins";
import { useDirectionsStore } from "@store/directions";
import * as React from "react";
import Map, {
  Source,
  Layer,
  MapRef,
  MapLayerMouseEvent,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { PinProps, PinPopup } from "@components/PinPopup";
import { Geocoder } from "@components/GeocoderControl";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
  chargingPlugsCount,
  chargingPin,
  changingCurrentPosition,
} from "@components/MapLayers";
import { Pin } from "@components/Pin";
import { useCallback, useEffect, useRef, useState } from "react";
import { Directions } from "@components/Directions";
import mapboxgl from "mapbox-gl";

export const MapboxMap = () => {
  const { pins, updatePins } = usePinsStore();
  // const updatePins = usePinsStore((state) => state.updatePins);

  const [selectedPin, setSelectedPin] = useState<PinProps>();
  const [cursor, setCursor] = useState<string>("auto");
  const [currentMapStyle, setCurrentMapStyle] = useState<string>(
    "mapbox://styles/mapbox/streets-v9"
  );

  useEffect(() => {
    console.log("MapboxMap mounted");
    // get the style from local storage
    const style = localStorage.getItem("style");
    addEventListener("storage", (event) => {
      if (event.key === "style") {
        const style = event.newValue;
        if (style) {
          setCurrentMapStyle("mapbox://styles/mapbox/streets-v9");
        }
      }
    });
    if (style)
      switch (style) {
        case "0":
          setCurrentMapStyle("mapbox://styles/mapbox/streets-v9");
          break;
        case "1":
          setCurrentMapStyle("mapbox://styles/mapbox/satellite-v9");
          break;
        case "2":
          setCurrentMapStyle("mapbox://styles/mapbox/dark-v10");
          break;
        default:
          setCurrentMapStyle("mapbox://styles/mapbox/streets-v9");
          break;
      }
    return () => {
      console.log("MapboxMap unmounted");
    };
  }, []);

  // const evPins = pins
  //   ? pins.map((pin: PinProps, index) => {
  //       const count =
  //         pin.ev_dc_fast_num + pin.ev_level1_evse_num + pin.ev_level2_evse_num;
  //       return (
  //         <Marker
  //           key={`marker-${index}`}
  //           longitude={pin.longitude}
  //           latitude={pin.latitude}
  //           onClick={() => {
  //             console.log("pin", pin);
  //             setSelectedPin(pin);
  //           }}
  //         >
  //           <Pin count={count} size={30} />
  //         </Marker>
  //       );
  //     })
  //   : [];

  const mapRef = useRef<MapRef | null>(null);
  const [location, setLocation] = useState<[number, number]>([60, 30]);
  const mapRefCallback = useCallback((ref: MapRef | null) => {
    if (ref !== null) {
      //Set the actual ref we use elsewhere
      mapRef.current = ref;
      const map = ref;
      console.log("map", map);
      const loadImage = () => {
        if (!map.hasImage("ev-icon")) {
          map.loadImage("icons/pin-8-24.png", (error, image) => {
            if (error || image === undefined) throw error;
            map.addImage("ev-icon", image);
          });
        }
      };
      loadImage();
      //TODO need this?
      map.on("styleimagemissing", (e) => {
        const id = e.id; // id of the missing image
        console.log(id);
        loadImage();
      });

      // Add geolocate control to the map.
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true,
        })
      );
      // current location in variable
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userPosition = [
            position.coords.longitude,
            position.coords.latitude,
          ] as [number, number];
          setLocation(userPosition);
        });
      }
    }
  }, []);

  const onClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const feature = event.features && event.features[0];

      if (pins) {
        console.log("feature", feature);
        console.log("pins", pins);
        const id = feature && feature.properties && feature.properties.id;
        const pin = pins.find((pin: PinProps) => pin.id === id);
        console.log("pin", pin);
        const map = mapRef;
        if (map.current && pin)
          map.current?.flyTo({
            center: [pin!.longitude, pin!.latitude],
            zoom: 20,
          });
        setSelectedPin(pin);
      }
    },
    [pins]
  );

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = useCallback(() => setCursor("auto"), []);

  const geojson = pins
    ? pins.map((pin: PinProps, index) => {
        const count =
          pin.ev_dc_fast_num + pin.ev_level1_evse_num + pin.ev_level2_evse_num;
        return {
          type: "Feature",
          properties: {
            ...pin,
            charging_plugs_count: count,
          },
          geometry: {
            type: "Point",
            coordinates: [pin.longitude, pin.latitude],
          },
        };
      })
    : [];
  const featureCollection = {
    type: "FeatureCollection",
    features: geojson,
  } as GeoJSON.FeatureCollection<GeoJSON.Geometry>;

  return (
    <div className="flex flex-grow">
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYm91aHppbGExIiwiYSI6ImNsbmRvNXd0MDA1emcyam9obTR5ZWd1MnIifQ.am_ZMozQCpGPyQD0u3fuAQ"
        initialViewState={{
          longitude: location[0],
          latitude: location[1],
          zoom: 2,
        }}
        mapStyle={currentMapStyle}
        projection={{ name: "mercator" }}
        ref={mapRefCallback}
        interactiveLayerIds={["charging-pin"]}
        cursor={cursor}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Geocoder
          position={"top-left"}
          onResult={(e: any) => {
            if (e && e.result.place_type.includes("postcode")) {
              const postcode = e.result.text;
              fetch("/api/load-pins/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify([`zip=${postcode}`]),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log("data", data);
                  console.log("data.fuel_stations", data.fuel_stations);
                  updatePins(data.data.fuel_stations);
                })
                .catch((err) => {
                  console.log("err", err);
                });
            }
          }}
        />

        {selectedPin && (
          <PinPopup pin={selectedPin} setSelectedPin={setSelectedPin} />
        )}

        <Source
          id="earthquakes"
          type="geojson"
          data={featureCollection}
          // cluster={false}
          // clusterMaxZoom={14}
          // clusterRadius={50}
        >
          {/* <Layer {...clusterLayer} /> */}
          {/* <Layer {...clusterCountLayer} /> */}
          {/* <Layer {...unclusteredPointLayer} /> */}
          <Layer {...chargingPin} />
          <Layer {...chargingPlugsCount} />
        </Source>

        <Directions />
        <NavigationControl />
        <FullscreenControl />
      </Map>
    </div>
  );
};
