import { useState } from "react";
import FlightCard from "../components/Card/Index.js";
import styled from "styled-components";
import Header from "@/components/Header/index";
import Navbar from "@/components/Navbar/index.js";
import { useRouter } from "next/router.js";
import { atom, useAtom } from "jotai";
import globalTrips from "@/public/data";

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid gray;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const globalTrip = atom({});

export default function Home() {
  const [tripClass, setTripClass] = useState("economyClass");
  const [tripType, setTripType] = useState("oneWay");
  const [, setTrip] = useAtom(globalTrip);

  const [trips] = useAtom(globalTrips);

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const tripData = Object.fromEntries(formData);
    try {
      const response = await fetch("/api/climatiq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          legs: [
            {
              from: tripData.departure,
              to: tripData.destination,
              passengers: parseInt(tripData.passengerCount),
            },
          ],
        }),
      });

      if (!response.ok) {
        console.error(response.status);
      }
      const { requestco2 } = await response.json();

      let co2e = requestco2.co2e;
      console.log(requestco2.co2e);
      if (tripType === "roundTrip") {
        co2e *= 2;
      }
      if (tripClass === "businessClass") {
        co2e *= 2;
      }
      if (tripClass === "firstClass") {
        co2e *= 2.5;
      }

      const newTrip = {
        id: crypto.randomUUID,
        from: tripData.departure,
        to: tripData.destination,
        co2e: co2e,
        passengerCount: tripData.passengerCount,
        type: tripData.tripType,
        class: tripData.tripClass,
      };

      setTrip(newTrip);
      router.push("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleTripTypeChange(event) {
    setTripType(event.target.value);
  }
  function handleTripClassChange(event) {
    setTripClass(event.target.value);
  }
  return (
    <>
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
              <input type="radio" id="oneWay" name="tripType" value="oneWay" />
              <label htmlFor="roundTrip">Round Trip</label>
              <input
                type="radio"
                id="roundTrip"
                name="tripType"
                value="roundTrip"
                checked={tripType === "roundTrip"}
                onChange={handleTripTypeChange}
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
                onChange={handleTripClassChange}
              />
              <label htmlFor="businessClass">business class</label>
              <input
                type="radio"
                id="businessClass"
                name="tripClass"
                value="businessClass"
                checked={tripClass === "businessClass"}
                onChange={handleTripClassChange}
              />
              <label htmlFor="firstClass">first class</label>
              <input
                type="radio"
                id="firstClass"
                name="tripClass"
                value="firstClass"
                checked={tripClass === "firstClass"}
                onChange={handleTripClassChange}
              />
            </FormGroup>
          </RadioContainer>
          <button type="submit">add</button>
        </form>
        <section>
          {trips &&
            trips.map((trip) => <FlightCard key={trip.id} trip={trip} />)}
        </section>
      </section>
      {/* <Navbar /> */}
    </>
  );
}
