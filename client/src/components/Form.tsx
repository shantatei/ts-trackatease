import { useState, useEffect, FC } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Heading,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import socket from "../socket";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { ResetMarker } from "../redux/markerSlice";
import useInterval from "../hooks/useInterval";
import { SetMarker } from "../redux/markerSlice";
import { ResetTracker, SetTracker } from "../redux/trackerSlice";

interface FormValues {
  deviceid: string;
  long: number;
  lat: number;
  timestamp: number;
}

const Form: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const [tracking, setTracking] = useState<boolean>(false);

  const markerLatitude = useSelector(
    (state: RootState) => state.marker.latitude
  );
  const markerLongitude = useSelector(
    (state: RootState) => state.marker.longitude
  );

  const deviceID = useSelector((state: RootState) => state.tracker.deviceid);

  const route = [
    [103.94136894924048, 1.354119067616665],
    [103.94139402764387, 1.35163699781792],
    [103.93931252020957, 1.3517372835158312],
    [103.93795828645739, 1.3503834262480012],
    [103.93835954090218, 1.346522421753619],
    [103.93830938409678, 1.344667131702792],
    [103.93284229227987, 1.3467731365166031],
    [103.931312509708, 1.3460209921494908],
    [103.92926702667108, 1.3471365933660167],
    [103.92632678463741, 1.34867251092993],
  ];
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    data.lat = markerLatitude;
    data.long = markerLongitude;
    data.timestamp = currentTime;

    dispatch(SetTracker(data));
    if (route.length == currentIndex + 1) {
      setTracking(false);
    } else {
      setTracking(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(Date.now());
    }, 5000);
  }, [currentTime]);

  useInterval(
    () => {
      if (tracking !== true) return;
      setCurrentIndex((currentIndex) => {
        if (route.length == currentIndex + 1) {
          setTracking(false);
          return currentIndex;
        }

        return currentIndex + 1;
      });
    },
    5000,
    [tracking]
  );

  useEffect(() => {
    const coordinate = route[currentIndex];
    dispatch(
      SetMarker({
        longitude: coordinate[0],
        latitude: coordinate[1],
      })
    );
  }, [currentIndex]);

  useEffect(() => {
    dispatch(
      SetTracker({
        deviceid: deviceID,
        lat: markerLatitude,
        long: markerLongitude,
        timestamp: currentTime,
      })
    );
  }, [markerLatitude, markerLongitude]);

  useEffect(() => {
    if (tracking !== true) return;
    socket.emit("track", {
      deviceid: deviceID,
      lat: markerLatitude,
      long: markerLongitude,
      timestamp: currentTime,
    });
  }, [markerLatitude, markerLongitude, tracking]);

  return (
    <VStack
      as="form"
      mx="auto"
      w={{ base: "90%", md: 500 }}
      h="100vh"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>Tracker</Heading>
      <FormControl isInvalid={errors.deviceid != null}>
        <FormLabel>Device Id</FormLabel>
        <Input
          placeholder="Enter Device ID"
          {...register("deviceid", {
            required: "Device ID is Required",
          })}
        />
        <FormErrorMessage>{errors.deviceid?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.long != null}>
        <FormLabel>Longitude</FormLabel>
        <Input
          readOnly
          value={markerLongitude}
          {...register("long", {
            required: "Longitude is Required",
          })}
        />
        <FormErrorMessage>{errors.long?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.lat != null}>
        <FormLabel>Latitude</FormLabel>
        <Input
          readOnly
          value={markerLatitude}
          {...register("lat", {
            required: "Latitude is Required",
          })}
        />
        <FormErrorMessage>{errors.lat?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.timestamp != null}>
        <FormLabel>TimeStamp</FormLabel>
        <Input
          readOnly
          value={currentTime}
          {...register("timestamp", {
            required: "Timestamp is Required",
          })}
        />
        <FormErrorMessage>{errors.timestamp?.message}</FormErrorMessage>
      </FormControl>
      <HStack w="100%">
        <Button
          type="submit"
          variant="outline"
          w="100%"
          isLoading={tracking}
          loadingText="Tracking"
        >
          Confirm
        </Button>
        <Button
          colorScheme="pink"
          variant="solid"
          w="100%"
          onClick={() => {
            setTracking(false);
            setCurrentIndex(0);
            dispatch(ResetMarker());
            dispatch(ResetTracker());
          }}
        >
          Reset
        </Button>
      </HStack>
    </VStack>
  );
};

export default Form;
