import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { useAtom } from "jotai";
import globalTrips from "@/public/data";
import { globalTrip } from ".";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  margin: 2rem;
  width: 80%;
  max-width: 500px;
`;

const StyledCardContent = styled.div`
  flex: 1;
  padding: 1rem;
  text-align: center;
  font-size: 15px;
  color: #333333;
`;

export default function Dashboard() {
  const [trips, setTrips] = useAtom(globalTrips);
  const [trip, setTrip] = useAtom(globalTrip);

  return (
    <>
      <Header />
      <StyledCard>
        <StyledCardContent>
          {!trip.id ? (
            <div>nothing to show</div>
          ) : (
            <div>
              <p style={{ display: "inline-block", marginRight: "10px" }}>
                {trip.from}
              </p>
              <p style={{ display: "inline-block", marginRight: "10px" }}>
                {trip.to}
              </p>
              <p style={{ display: "inline-block" }}>CO₂ {trip.co2e} kg</p>
            </div>
          )}
        </StyledCardContent>
      </StyledCard>

      <Navbar />
    </>
  );
}
