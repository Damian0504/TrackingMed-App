import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000"; // Cambiá según tu backend o Docker

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("Conectado a Socket.IO con ID:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor Socket.IO");
});

socket.on("connect_error", (err) => {
  console.error("Error de conexión Socket.IO:", err.message);
});

export default socket;
