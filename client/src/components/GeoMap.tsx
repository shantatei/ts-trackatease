import Map, {
  NavigationControl,
  Marker,
  Source,
  Layer,
  GeolocateControl,
} from "react-map-gl";
import { Box } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import type { RootState } from "../store";

import { useSelector, useDispatch } from "react-redux";


const GeoMap: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const markerLatitude = useSelector(
    (state: RootState) => state.marker.latitude
  );
  const markerLongitude = useSelector(
    (state: RootState) => state.marker.longitude
  );
  const dispatch = useDispatch();

  const initialViewState = {
    longitude: 103.93173401321536,
    latitude: 1.3454414032635071,
    zoom: 14,
  };

 

  

  

  const safezone = {
    type: "FeatureCollection" as "FeatureCollection",
    features: [
      {
        type: "Feature" as "Feature",
        properties: { id: "Temasek-Polytechnic" },
        geometry: {
          coordinates: [
            [
              [103.92860769024338, 1.3486822327186303],
              [103.9275418454394, 1.3469621307175998],
              [103.93413485687296, 1.3412233745612667],
              [103.93585543491406, 1.3453638047613339],
              [103.92860769024338, 1.3486822327186303],
            ],
          ],
          type: "Polygon" as "Polygon",
        },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "fill" as "sky",
    paint: {
      "fill-color": "#0080ff", // blue color fill
      "fill-opacity": 0.5,
    },
  };

  const layerLineStyle = {
    id: "outline",
    type: "line" as "line",
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  };

  return (
    <Box>
      <Map
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={import.meta.env.VITE_MAP_API_KEY}
      >
        <NavigationControl position="top-left" />
        <Marker
          longitude={markerLongitude}
          latitude={markerLatitude}
          color="red"
        />
        <Source id="my-data" type="geojson" data={safezone}>
          <Layer {...layerStyle} />
          <Layer {...layerLineStyle} />
        </Source>
        <GeolocateControl />
      </Map>
    </Box>
  );
};

export default GeoMap;
