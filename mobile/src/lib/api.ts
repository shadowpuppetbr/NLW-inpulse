import axios from "axios";

export const api = axios.create({
  baseURL: "https://nlw-inpulse-production.up.railway.app/",
});
