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

interface FormValues {
  deviceid: string;
  long: number;
  lat: number;
  timestamp: number;
}

const Form: FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const markerLatitude = useSelector(
    (state: RootState) => state.marker.latitude
  );
  const markerLongitude = useSelector(
    (state: RootState) => state.marker.longitude
  );
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
    console.log(data);
    socket.emit("track", data);
  };

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(Date.now());
    }, 5000);
  }, [currentTime]);

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
          value={currentTime}
          {...register("timestamp", {
            required: "Timestamp is Required",
          })}
        />
        <FormErrorMessage>{errors.timestamp?.message}</FormErrorMessage>
      </FormControl>
      <HStack w="100%">
        <Button type="submit" variant="outline" w="100%">
          Confirm
        </Button>
        <Button
          colorScheme="pink"
          variant="solid"
          w="100%"
          onClick={() => dispatch(ResetMarker())}
        >
          Reset
        </Button>
      </HStack>
    </VStack>
  );
};

export default Form;
