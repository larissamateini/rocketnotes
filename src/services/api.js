import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-rocketnotes-20wa.onrender.com" //http://localhost:3333
});