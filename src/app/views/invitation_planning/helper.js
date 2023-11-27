const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

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

export function getEndpoint(api_id, endpoint) {
  return `https://${api_id}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/${endpoint}`;
}
