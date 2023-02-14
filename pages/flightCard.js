import React from "react";
import { useAtom } from "jotai";
import globalTrips from "@/public/data";

export default function FlightCard({ trip }) {
  const [trips, setTrips] = useAtom(globalTrips);

  //   function handelDeleteItem(id) {
  //     setTrips(
  //       trips.filter((trip) => {
  //         return trip.id !== id;
  //       })
  //     );
  //   }
  return (
    <article>
      <section>
        <p>Departure: {trip.from}</p>
        <p>Destination: {trip.to}</p>
        <p>Passengers: {trip.passengerCount}</p>
        <p>co2: {parseInt(trip.co2e)} kg</p>
        {/* <button onClick={() => handelDeleteItem(trip.id)}>Delete </button> */}
      </section>
    </article>
  );
}
