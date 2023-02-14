import React, { useState } from "react";
import FlightCard from "../components/Card/Index.js";
import styled from "styled-components";
import Header from "@/Components/Header/index";
import Navbar from "@/Components/Navbar/index.js";
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

const url = "https://beta3.api.climatiq.io/travel/flights";
const key = "Bearer 1592SDMAYNMEM5HXCP8S7953NK93";

export const globalTrip = atom({});

export default function Home() {
  const [, setTrip] = useAtom(globalTrip);
  const [tripType, setTripType] = useState("");
  const [tripClass, setTripClass] = useState("");
  const [trips] = useAtom(globalTrips);

  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const tripData = Object.fromEntries(formData);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: key,
        },
        body: JSON.stringify({
          legs: [
            {
              from: tripData.departure,
              to: tripData.destination,
              passengers: parseInt(tripData.passengerCount),
              class: tripData.tripClass,
            },
          ],
        }),
      });
      if (!response.ok) {
        console.error(response.status);
      }
      const responseData = await response.json();

      const newTrip = {
        id: crypto.randomUUID,
        from: tripData.departure,
        to: tripData.destination,
        co2e: responseData.co2e,
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

  return (
    <article>
      <Header />
      <section>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
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
                value="economy"
                checked={tripClass === "economy"}
                onChange={(event) => setTripClass(event.target.value)}
              />
              <label htmlFor="businessClass">business class</label>
              <input
                type="radio"
                id="businessClass"
                name="tripClass"
                value="business"
                checked={tripClass === "business"}
                onChange={(event) => setTripClass(event.target.value)}
              />
              <label htmlFor="firstClass">first class</label>
              <input
                type="radio"
                id="firstClass"
                name="tripClass"
                value="first"
                checked={tripClass === "first"}
                onChange={(event) => setTripClass(event.target.value)}
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
      <Navbar />
    </article>
  );
}
