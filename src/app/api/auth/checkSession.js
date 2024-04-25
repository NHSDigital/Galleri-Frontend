const SESSION_MANAGER = process.env.NEXT_PUBLIC_SESSION_MANAGER;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

// NOT NEEDED
export async function checkSession(sessionId) {
  const url = `https://${SESSION_MANAGER}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/cis2-signed-jwt`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId: sessionId }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (response.ok) {
      const sessionData = data;
      console.log("Session Data:", sessionData);
    } else {
      console.error("Error:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
