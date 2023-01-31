import React, { useState } from "react";
import FlightCard from "../components/FlightCard/Index.js";
import styled from "styled-components";

const FormGroup = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

export default function Home() {
  const [trips, setTrips] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setTrips([
      ...trips,
      {
        departure: formData.get("departure"),
        destination: formData.get("destination"),
        passengerCount: formData.get("passengerCount"),
      },
    ]);
    event.target.reset();
  };

  return (
    <section>
      <form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="departure">from</Label>
          <Input
            id="departure"
            name="departure"
            type="text"
            maxLength="3"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="destination">to</Label>
          <Input
            id="destination"
            name="destination"
            type="text"
            maxLength="3"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="passengerCount">Passengers</Label>
          <Input
            id="passengerCount"
            name="passengerCount"
            type="number"
            min="1"
            max="10"
          />
        </FormGroup>
        <button type="submit">add</button>
      </form>
      <section>
        {trips.slice(Math.max(trips.length - 3, 0)).map((trip, index) => (
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
