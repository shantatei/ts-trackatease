import Map, {
  NavigationControl,
  Marker,
  Source,
  Layer,
  GeolocateControl,
} from "react-map-gl";
import { Box } from "@chakra-ui/react";
import { useEffect} from "react";
import type { RootState } from "../store";
import { SetMarker } from "../redux/markerSlice";
import { useSelector, useDispatch } from "react-redux";

const GeoMap = () => {

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

  const route = [
    [103.94136894924048, 1.354119067616665],
    [103.94139402764387, 1.35163699781792],
    [103.93931252020957, 1.3517372835158312],
    [103.93795828645739, 1.3503834262480012],
    [103.93835954090218, 1.346522421753619],
    [103.93830938409678, 1.344667131702792],
    [103.93284229227987, 1.3467731365166031],
    [103.931312509708, 1.3460209921494908],
  ];

  useEffect(() => {
    for (let index = 0; index < route.length; index++) {
      const coordinate = route[index];
      setTimeout(() => {
        dispatch(
          SetMarker({
            longitude: coordinate[0],
            latitude: coordinate[1],
          })
        );
      }, 5000);
    }
  }, []);

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
