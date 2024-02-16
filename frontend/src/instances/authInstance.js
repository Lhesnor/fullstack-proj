import axios from "axios";
import {serverUrl} from "../config";

export const authInstance = axios.create({
  baseURL: `http://${serverUrl}/auth/`,
});
