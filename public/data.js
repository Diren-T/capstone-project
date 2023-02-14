import { atomWithStorage } from "jotai/utils";

const trips = [];

const globalTrips = atomWithStorage("trips", trips);

export default globalTrips;
