import axios from "axios";
import {serverUrl} from "../config";

export const imagesInstance = axios.create({
  baseURL: `http://${serverUrl}/images/api/v1/`,
});
