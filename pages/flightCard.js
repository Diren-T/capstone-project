import React from "react";
import { useAtom } from "jotai";
import globalTrips from "@/public/data";

export default function FlightCard({ trip }) {
  const [trip, setTrip] = useAtom(globalTrips);

  return <FlightCard trip={trip} />;
}
