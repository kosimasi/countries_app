import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/homePage/HomePage';
import CountriesList from './pages/countryList/CountryList';
import CountryDetails from './pages/countryDetails/CountryDetails';
import FilterByPopulation from './pages/filter/filterByPopulation';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/countries" element={<CountriesList />} />
          <Route path="/country/:cca3" element={<CountryDetails />} />
          <Route path="/:filterType" element={<FilterByPopulation />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
