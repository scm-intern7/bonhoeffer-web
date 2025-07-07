"use client";
import React from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../../data/globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 2,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#989b2e",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 2,
    maxRings: 5,
    initialPosition: { lat: 28.6139, lng: 77.209 },
    autoRotate: true,
    autoRotateSpeed: 100,
  };
  const colors = ["#989b2e"];
  const sampleArcs = [
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.3,
      color: colors[0]
    },
    {
      order: 2,
      startLat: 35.8617,
      startLng: 104.1954,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.6,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 23.6345,
      startLng: -102.5528,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.2,
      color: colors[0]
    },
    {
      order: 3,
      startLat: -9.19,
      startLng: -75.0152,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.4,
      color: colors[0]
    },
    {
      order: 3,
      startLat: -16.2902,
      startLng: -63.5887,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.6,
      color: colors[0]
    },
    {
      order: 3,
      startLat: -14.235,
      startLng: -51.9253,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.2,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 18.7357,
      startLng: -70.1627,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.3,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 4.5709,
      startLng: -74.2973,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.5,
      color: colors[0]
    },
    {
      order: 3,
      startLat: -1.8312,
      startLng: -78.1834,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.6,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 13.2,
      startLng: -85.6667,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.6,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 12.8654,
      startLng: -85.2072,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.2,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 9.7489,
      startLng: -83.7534,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.2,
      color: colors[0]
    },
    {
      order: 3,
      startLat: -23.4425,
      startLng: -58.4438,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.6,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 38.9637,
      startLng: 35.2433,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.4,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 8.538,
      startLng: -80.7821,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.3,
      color: colors[0]
    },
    {
      order: 3,
      startLat: -35.6751,
      startLng: -71.543,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.5,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 15.7835,
      startLng: -90.2308,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.2,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 28.3949,
      startLng: 84.124,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.5,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 13.7942,
      startLng: -88.8965,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[0]
    },
    {
      order: 3,
      startLat: 18.1096,
      startLng: -77.2975,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.5,
      color: colors[0]
    }
  ];

  return (
    // <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto bg-black relative w-full">
      <div className="max-w-xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        {/* <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-black z-40" /> */}
          <div className="w-full h-96 md:h-full z-10">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
      </div>
    // </div>
  );
}
