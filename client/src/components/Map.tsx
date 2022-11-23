import { useState, useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import { Box } from "@chakra-ui/react";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [long] = useState(103.93173401321536);
  const [lat] = useState(1.3454414032635071);
  const [zoom] = useState(14);
  const [API_KEY] = useState("v0GQqfmV7LxqEyckKPTU");
//   const API_KEY : string  = process.env.REACT_APP_MAP_API_KEY as string;

  useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [long, lat],
      zoom: zoom,
    });
  });
  return (
    <Box style={{ position: "relative", width: "100%" }}>
      <div
        ref={mapContainer}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
    </Box>
  );
};

export default Map;
