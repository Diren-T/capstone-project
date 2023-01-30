import { useState } from "react";
import FlightCard from "../components/FlightCard";

export default function Home() {
  const [trips, setTrips] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTrips([...trips, { departure, destination, passengerCount }]);
    setDeparture("");
    setDestination("");
    setPassengerCount(1);
  };

  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">from</label>
        <input
          id=""
          type="text"
          maxLength="3"
          placeholder="IATA code"
          value={departure}
          onChange={(event) => setDeparture(event.target.value)}
          required
        />
        <br />
        <label htmlFor="">to</label>
        <input
          type="text"
          maxLength="3"
          placeholder="IATA code"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          required
        />
        <br />
        <label htmlFor="">Passengers</label>
        <input
          type="number"
          min="1"
          max="10"
          value={passengerCount}
          onChange={(event) => setPassengerCount(Number(event.target.value))}
        />
        <br />
        <button type="submit">add</button>
      </form>
      <section>
        {trips.slice(0, 2).map((trip, index) => (
          <FlightCard
            key={index}
            departure={trip.departure}
            destination={trip.destination}
            passengerCount={trip.passengerCount}
          />
        ))}
      </section>
    </section>
  );
}
