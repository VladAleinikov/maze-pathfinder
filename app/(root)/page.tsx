"use client"

import React, { useRef } from "react";
import { Grid } from "./_components/grid";

const HomePage = () => {
  const isVisualizationRunningRef = useRef(false);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
    </div>
  );
};

export default HomePage;
