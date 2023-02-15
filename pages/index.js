import React, { useState } from "react";
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
              class: tripData.tripClass,
            },
          ],
        }),
      });

      if (!response.ok) {
        console.error(response.status);
      }
      const { requestco2 } = await response.json();
      console.log(requestco2);
      const newTrip = {
        id: crypto.randomUUID,
        from: tripData.departure,
        to: tripData.destination,
        co2e: requestco2.co2e,
        passengerCount: tripData.passengerCount,
        type: tripData.tripType,
        class: tripData.tripClass,
      };
      console.log(newTrip);
      setTrip(newTrip);
      router.push("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
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
              <input type="radio" id="oneWay" name="tripType" value="oneWay" />
              <label htmlFor="roundTrip">Round Trip</label>
              <input
                type="radio"
                id="roundTrip"
                name="tripType"
                value="roundTrip"
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
              />
              <label htmlFor="businessClass">business class</label>
              <input
                type="radio"
                id="businessClass"
                name="tripClass"
                value="business"
              />
              <label htmlFor="firstClass">first class</label>
              <input
                type="radio"
                id="firstClass"
                name="tripClass"
                value="first"
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
    </>
  );
}
