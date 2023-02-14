export default function FlightCard({
  departure,
  destination,
  passengerCount,
  tripType,
  tripClass,
}) {
  return (
    <article>
      <section>
        <p>Departure: {departure}</p>
        <p>Destination: {destination}</p>
        <p>Passengers: {passengerCount}</p>
        <p>Trip Type: {tripType}</p>
        <p>Trip Class: {tripClass}</p>
      </section>
    </article>
  );
}
