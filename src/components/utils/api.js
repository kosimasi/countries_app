import axios from "axios";
/**
 * Fetches all countries with specified fields from the API
 * @returns {Promise<Array>} Array of country objects
 * @throws {Error} If the request fails
 */

const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,region,subregion,population,area,languages,currencies,capital,cca3";

const fetchCountries = async () => {
  const response = await axios.get(API_URL);
  if (!response.data) {
    throw new Error("Failed to fetch countries");
  }
  return response.data;
};

export { fetchCountries };
