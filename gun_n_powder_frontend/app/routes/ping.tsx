import { useState } from "react";
import { BACKEND_URL } from "~/constants";

export default function Ping() {
  const [pong, setPong] = useState("");
  async function fetchPong() {
    try {
      const res = await fetch(BACKEND_URL + "/api/ping");
      const pong = await res.json();
      setPong(pong.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <p>This is the ping page.</p>
        <button onClick={fetchPong}> Try Ping </button>
        <p> {pong} </p>
      </div>
    </div>
  );
}
