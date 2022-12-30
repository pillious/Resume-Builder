import { customAlphabet } from "nanoid";

const characterSet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const idLength = 6;
// const nanoid = customAlphabet(characterSet, idLength);

const nanoid = (length = idLength) => customAlphabet(characterSet, length)();

export default nanoid;
