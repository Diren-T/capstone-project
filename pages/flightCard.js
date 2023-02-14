import React from "react";
import { useAtom } from "jotai";
import globalTrips from "@/public/data";

export default function FlightCard({ trip }) {
  const [trips, setTrips] = useAtom(globalTrips);

  return (
    <article>
      <section>
        <p>Departure: {trip.from}</p>
        <p>Destination: {trip.to}</p>
        <p>Passengers: {trip.passengerCount}</p>
        <p>co2: {parseInt(trip.co2e)} kg</p>
      </section>
    </article>
  );
}
