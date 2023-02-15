export default function FlightCard({ trip }) {
  return (
    <section>
      <p>{trip.from}</p>
      <p> {trip.to}</p>
      <p>{trip.passengerCount}</p>
      <p>co2 {parseInt(trip.co2e)} kg</p>
    </section>
  );
}
