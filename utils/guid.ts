import { customAlphabet } from "nanoid";
import {CHARACTER_SET, GUID_LEN} from "./constants";

const nanoid = (length = GUID_LEN) => customAlphabet(CHARACTER_SET, length)();

export default nanoid;
