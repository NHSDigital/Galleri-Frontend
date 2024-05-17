function getCookieSessionToken(req) {
  const cookies = req.cookies || ""; // Get cookies from request object
  const cookieArray = cookies.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookieArray) {
    const [name, value] = cookie.split("=");
    if (name === "next-auth.session-token") {
      return decodeURIComponent(value);
    }
  }
  return null; // Cookie not found
}

const sessionToken = getCookieSessionToken();
console.log("Session Token:", sessionToken);
