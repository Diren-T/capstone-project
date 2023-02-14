export default function FlightCard({ trip }) {
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
