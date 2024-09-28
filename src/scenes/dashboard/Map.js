import React from "react";
import MapContainer from "./MapContainer";

function Maps() {
  return (
    <div style={{ display: "flex", height: "calc(100vh - 50px)" }}>
      {/* Google maps has whitelisted codesandbox with overlay, so there is enough to pass an empty string, but for your own app, you need to provide your own api key. Please do not forget to restrict it for your own domain name. */}
      <MapContainer />
    </div>
  );
}

export default Maps;
