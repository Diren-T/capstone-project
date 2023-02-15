import { useState } from "react";
import FlightCard from "../components/Card/Index.js";
import styled from "styled-components";
import { useRouter } from "next/router.js";
import { atom, useAtom } from "jotai";
import globalTrips from "@/public/data";
import { nanoid } from "nanoid";

export const globalTrip = atom({});

const Form = styled.form`
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  font-size: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #333;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  background-color: #f0f0f0;
`;

const RadioContainer = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

const Ul1 = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Ul2 = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 0.875rem;
  color: #333;
`;

const RadioButton = styled.input`
  margin-right: 0.5rem;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  cursor: pointer;
`;

const Section = styled.section`
  padding: 2rem;
`;

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
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="departure">from</Label>
            <Input
              id="departure"
              name="departure"
              type="text"
              maxLength="5"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="destination">to</Label>
            <Input
              id="destination"
              name="destination"
              type="text"
              maxLength="5"
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
          <RadioContainer>
            <Ul1>
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
            </Ul1>
            <Ul2>
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
            </Ul2>
          </RadioContainer>
          <Button type="submit">add</Button>
        </Form>
        <Section>
          {trips &&
            trips.map((trip) => <FlightCard key={trip.id} trip={trip} />)}
        </Section>
      </section>
    </>
  );
}
