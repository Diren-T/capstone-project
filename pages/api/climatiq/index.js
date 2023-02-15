export default async function handler(request, response) {
  const result = await fetch("https://beta3.api.climatiq.io/travel/flights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify(request.body),
  });
  console.log("request.body", request.body);
  if (request.method === "POST") {
    try {
      console.log("result", result);
      const requestco2 = await result.json();
      console.log(requestco2);
      return response.status(201).json({ requestco2 });
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ status: "Method not allowed" });
}
