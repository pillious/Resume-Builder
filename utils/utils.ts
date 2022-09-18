// Generate a pastel color using HSL values.
export const pastelHSLColor = () => [360 * Math.random(), 100, 70];

// Generate the HSL CSS string.
export const buildHSLString = (vals: number[]) =>
    `hsl(${vals[0]}, ${vals[1]}%, ${vals[2]}%)`;
