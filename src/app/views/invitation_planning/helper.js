export function sumQuintiles(quintileValues) {
  return Object.values(quintileValues).reduce(
    (acc, cur) => acc + Number(cur),
    0
  );
}

export function quintileHintText(quintile) {
  switch (quintile) {
    case "0":
      return `${Number(quintile) + 1} - Most deprived`;
    case "4":
      return `${Number(quintile) + 1} - Least deprived`;
    default:
      return `${Number(quintile) + 1}`;
  }
}

// export function getEndpoint(endpoint) {
//   const API_ID = "eqsnf31ud8";
//   return `https://${API_ID}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/"/${endpoint}`;
// }
