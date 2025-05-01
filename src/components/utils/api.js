import axios from "axios";

const API_URL = "https://restcountries.com/v3.1/all";

const fetchCountries = async () => {
  const response = await axios.get(API_URL);
  if (!response.data) {
    throw new Error("Failed to fetch countries");
  }
  return response.data;
};

export { fetchCountries };