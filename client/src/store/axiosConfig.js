import axios from "axios";
import { Token } from "./variable";

// Next we make an 'instance' of it
const instance = axios.create();

instance.defaults.headers.common["Authorization"] = Token ? `Bearer ${Token.accessToken}` : undefined;

export default instance;
