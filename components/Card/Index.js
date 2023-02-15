export default function FlightCard({ trip }) {
  return (
    <article>
      <p>from: {trip.from}</p>
      <p>to: {trip.to}</p>
      <p>passengers: {trip.passengerCount}</p>
      <p>co2. {parseInt(trip.co2e)} kg</p>
    </article>
  );
}
