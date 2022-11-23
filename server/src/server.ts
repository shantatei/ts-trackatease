import { device as Device } from "aws-iot-device-sdk";
import express from 'express'
import http from 'http'
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

interface FormValues {
  deviceid: string;
}

io.on('connection', socket => {
  const device = new Device({
    keyPath: "./certs/private.pem.key",
    certPath: "./certs/device-certificate.pem.crt",
    caPath: "./certs/AmazonRootCA1.pem",
    clientId: socket.id,
    host: "aeco1oxzejb6i-ats.iot.us-east-1.amazonaws.com",
  });

  device.on('connect', () => {

    console.log('connected')

    socket.on('track', (data:FormValues) => {
      console.log(data)
      // device.publish('device/location', data)
    })

    device.on("message", (topic, payload) => {
      console.log("message", topic, payload.toString());
    });
  })
})


const current = Date.now();

// device.on("connect", function () {
//   console.log("connect");
//   device.subscribe("device/location");
//   device.publish(
//     "device/location",
//     JSON.stringify({
//       long: 103.93173401321536,
//       lat: 1.3454414032635071,
//       deviceid: "Temasek",
//       timestamp: current,
//     })
//   );
// });



server.listen(8080, () => {
  console.log(`server listening on port 8080`)
})
