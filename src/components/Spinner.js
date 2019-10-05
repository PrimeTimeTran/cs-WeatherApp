import { Spinner } from "react-bootstrap";
import React from "react";

function WeatherSpinner() {
  return (
    <Spinner
      size="lg"
      variant="info"
      animation="border"
      style={{
        width: 200,
        height: 200,
        color: "#37FF8B",
        marginTop: "40vh",
        marginLeft: "45vw"
      }}
    />
  );
}

export default WeatherSpinner;
