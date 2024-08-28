"use client"

import React, { useRef } from "react";
import { Grid } from "./_components/grid";
import { Nav } from "./_components/nav";

const HomePage = () => {
  const isVisualizationRunningRef = useRef(false);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Nav isVisualizationRunningRef={isVisualizationRunningRef} />
      <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
      <div className="hidden lg:w-tile-lg md:w-tile-md xs:w-tile-xs w-tile lg:h-tile-lg md:h-tile-md xs:h-tile-xs h-tile border-t border-r border-sky-200 bg-green-400 border-l bg-red-400 bg-gray-400 bg-green-500 bg-cyan-400 animate-traversed animate-path animate-wall" />
    </div>
  );
};

export default HomePage;
