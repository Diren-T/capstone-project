export default function FlightCard({ departure, destination, passengerCount }) {
  return (
    <article>
      <br></br>
      <section>
        <p>Departure: {departure}</p>
        <p>Destination: {destination}</p>
        <p>Passengers: {passengerCount}</p>
      </section>
    </article>
  );
}
