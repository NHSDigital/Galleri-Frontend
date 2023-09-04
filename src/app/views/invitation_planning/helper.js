export function sumQuintiles(quintileValues) {
  return Object.values(quintileValues).reduce(
    (acc, cur) => acc + Number(cur),
    0
  );
}
