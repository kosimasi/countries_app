import axios from "axios";
// The API endpoint am using now requires all fields query parameter.
// const API_URL = "https://restcountries.com/v3.1/all";
const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,region,subregion,population,area,languages,currencies";

const fetchCountries = async () => {
  const response = await axios.get(API_URL);
  if (!response.data) {
    throw new Error("Failed to fetch countries");
  }
  return response.data;
};

export { fetchCountries };
