// Generate a pastel color using HSL values.
export const pastelHSLColor = () => [360 * Math.random(), 100, 70];

// Generate the HSL CSS string.
export const buildHSLString = (vals: number[]) =>
    `hsl(${vals[0]}, ${vals[1]}%, ${vals[2]}%)`;

// Sort array of objects by "order" property in ascending order.
export const sortByOrder = <T extends { order: number }>(arr: T[]): T[] =>
    arr.sort((prev, curr) => prev.order - curr.order);
