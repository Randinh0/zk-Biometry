import { useEffect } from "react";

export default function useContractEvents(onRegistered, onVerified) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "Registered" && onRegistered) {
        onRegistered(msg.data);
      } else if (msg.type === "Verified" && onVerified) {
        onVerified(msg.data);
      }
    };

    return () => {
      socket.close();
    };
  }, [onRegistered, onVerified]);
}
