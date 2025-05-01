export const fetchCountryDetails = async (cca3) => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
    return response.json();
  };
  
  export const getCountryDetails = (country) => {
    return {
      officialName: country.name.official,
      nativeNames: country.name.nativeName
        ? Object.values(country.name.nativeName)[0].official
        : country.name.official,
      currencies: country.currencies
        ? Object.values(country.currencies).map(
            (c) => `${c.name} (${c.symbol || "—"})`
          )
        : ["N/A"],
      languages: country.languages
        ? Object.values(country.languages)
        : ["N/A"],
      timezones: country.timezones || ["N/A"],
      drivingSide: country.car?.side || "N/A",
      unMember: country.unMember ? "Yes" : "No",
    };
  };