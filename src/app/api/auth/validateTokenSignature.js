import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// Function to validate the signature of id token received
export async function validateTokenSignature(idToken, jwksUri) {
  try {
    // Function to get the key for verification
    const client = jwksClient({ jwksUri });
    function getKey(header, getKeyCallback) {
      client.getSigningKey(header.kid, (err, key) => {
        if (err) {
          console.error("Error fetching signing key:", err);
          return getKeyCallback(err);
        }
        const signingKey = key.publicKey || key.rsaPublicKey;
        getKeyCallback(null, signingKey);
      });
    }

    // Verify the token using the callback-based approach
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(idToken, getKey, (err, decoded) => {
        if (err) {
          console.error("Error with JWT verify method:", err);
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    console.log("ID token signature is valid.");
    return decoded;
  } catch (error) {
    console.error("Error validating ID token signature:", error.message);
    throw error;
  }
}
