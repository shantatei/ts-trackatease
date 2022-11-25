import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import socket from "../socket";

interface FormValues {
  deviceid: string;
}

const Form = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    socket.emit('track',data)
  };
  return (
    <VStack
      as="form"
      mx="auto"
      w={{ base: "90%", md: 500 }}
      h="100vh"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>Tracker ID</Heading>
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
      <Button type="submit" variant="outline" w="100%">
        Confirm
      </Button>
    </VStack>
  );
};

export default Form;
