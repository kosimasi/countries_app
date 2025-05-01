export const filterCountries = (countries, searchTerm, selectedContinent) => {
    return countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((country) =>
        selectedContinent === "all" ? true : country.region === selectedContinent
      )
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  };
  
  export const paginateCountries = (countries, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return countries.slice(startIndex, endIndex);
  };