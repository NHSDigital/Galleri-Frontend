export default async function returnUser(context) {
  try {
    return context.tokens;
  } catch (error) {
    console.error("ERROR ON RETURNING USER: ", error);
  }
}
