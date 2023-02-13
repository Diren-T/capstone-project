import React, { useState } from "react";
import FlightCard from "../components/Card/Index.js";
import styled from "styled-components";
import Header from "@/Components/Header/index";
import Footer from "@/Components/Footer/index.js";

const FormGroup = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  // background-color: #eae;
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

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: px;
`;

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [tripType, setTripType] = useState("");
  const [tripClass, setTripClass] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    setTrips([
      ...trips,
      {
        departure: formData.get("departure"),
        destination: formData.get("destination"),
        passengerCount: formData.get("passengerCount"),
        tripType: formData.get("tripType"),
        tripClass: formData.get("tripClass"),
      },
    ]);
    event.target.reset();
  };

  return (
    <article>
      <Header />
      <section>
        <form onSubmit={handleSubmit}>
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
            <RadioContainer>
              <label htmlFor="oneWay">One Way</label>
              <input
                type="radio"
                id="oneWay"
                name="tripType"
                value="oneWay"
                checked={tripType === "oneWay"}
                onChange={(event) => setTripType(event.target.value)}
              />
              <label htmlFor="roundTrip">Round Trip</label>
              <input
                type="radio"
                id="roundTrip"
                name="tripType"
                value="roundTrip"
                checked={tripType === "roundTrip"}
                onChange={(event) => setTripType(event.target.value)}
              />
            </RadioContainer>
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
          <RadioContainer>
            <FormGroup>
              <label htmlFor="economyClass">economy class</label>
              <input
                type="radio"
                id="economyClass"
                name="tripClass"
                value="economyClass"
                checked={tripClass === "economyClass"}
                onChange={(event) => setTripClass(event.target.value)}
              />
              <label htmlFor="businessClass">business class</label>
              <input
                type="radio"
                id="businessClass"
                name="tripClass"
                value="businessClass"
                checked={tripClass === "businessClass"}
                onChange={(event) => setTripClass(event.target.value)}
              />
              <label htmlFor="firstClass">first class</label>
              <input
                type="radio"
                id="firstClass"
                name="tripClass"
                value="firstClass"
                checked={tripClass === "firstClass"}
                onChange={(event) => setTripClass(event.target.value)}
              />
            </FormGroup>
          </RadioContainer>

          <section>
            <button type="submit">add</button>
            {trips.length > 0 && (
              <FlightCard
                departure={trips[trips.length - 1].departure}
                destination={trips[trips.length - 1].destination}
                passengerCount={trips[trips.length - 1].passengerCount}
                tripType={trips[trips.length - 1].tripType}
                tripClass={trips[trips.length - 1].tripClass}
              />
            )}
          </section>
        </form>
      </section>
      <Footer />
    </article>
  );
}
