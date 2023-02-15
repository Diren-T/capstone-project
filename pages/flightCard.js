import { useAtom } from "jotai";
import globalTrips from "@/public/data";
import FlightCard from "@/components/Card/Index";

export default function FlightCardPage() {
  const [trip, setTrip] = useAtom(globalTrips);

  return <FlightCard trip={trip} />;
}
