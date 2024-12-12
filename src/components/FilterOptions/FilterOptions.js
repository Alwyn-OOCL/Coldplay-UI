// src/components/FilterOptions/FilterOptions.js
import React, { useEffect, useState } from "react";
import "./FilterOptions.css";

export default function FilterOptions({
  onFilterChange,
  initialFilters,
  locationData,
  allCountries,
  allCities,
  allVenues,
  cityMap,
  venueMap,
  onClearAllFilters,
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const [filteredCities, setFilteredCities] = useState(allCities);
  const [filteredVenues, setFilteredVenues] = useState(allVenues);

  useEffect(() => {
    setFilters(initialFilters);
    updateFilteredLists(initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilters]);

  useEffect(() => {
    updateFilteredLists(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCountries, allCities, allVenues]);

  const updateFilteredLists = (f) => {
    // Same logic as before to build filtered lists based on f
    let cList = allCountries.slice();
    let ciList = allCities.slice();
    let vList = allVenues.slice();

    if (f.venue && venueMap[f.venue]) {
      const matches = venueMap[f.venue];
      const countriesSet = new Set(matches.map((m) => m.country));
      const citiesSet = new Set(matches.map((m) => m.city));
      cList = Array.from(countriesSet).sort();
      ciList = Array.from(citiesSet).sort();
      vList = [f.venue];
    } else if (f.city && cityMap[f.city]) {
      const matches = cityMap[f.city];
      const countriesSet = new Set();
      const venuesSet = new Set();
      matches.forEach((m) => {
        countriesSet.add(m.country);
        m.venues.forEach((v) => venuesSet.add(v));
      });
      cList = Array.from(countriesSet).sort();
      ciList = [f.city];
      vList = Array.from(venuesSet).sort();
    } else if (f.country && locationData[f.country]) {
      const countryCities = Object.keys(locationData[f.country]);
      const countryVenuesSet = new Set();
      countryCities.forEach((ct) => {
        locationData[f.country][ct].forEach((v) => countryVenuesSet.add(v));
      });
      cList = [f.country];
      ciList = countryCities.sort();
      vList = Array.from(countryVenuesSet).sort();
    } else {
      cList = allCountries.slice();
      ciList = allCities.slice();
      vList = allVenues.slice();
    }

    setFilteredCountries(cList);
    setFilteredCities(ciList);
    setFilteredVenues(vList);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...filters, [name]: value };
    setFilters(updated);
    onFilterChange(updated);
    updateFilteredLists(updated);
  };

  const clearCountry = () => {
    const updated = { ...filters, country: "" };
    setFilters(updated);
    onFilterChange(updated);
    updateFilteredLists(updated);
  };

  const clearCity = () => {
    const updated = { ...filters, city: "" };
    setFilters(updated);
    onFilterChange(updated);
    updateFilteredLists(updated);
  };

  const clearVenue = () => {
    const updated = { ...filters, venue: "" };
    setFilters(updated);
    onFilterChange(updated);
    updateFilteredLists(updated);
  };

  // No direct date clearing here. "Clear All" triggers parent's onClearAllFilters
  const clearAll = () => {
    onClearAllFilters();
    // This will clear filters and date range in ConcertListPage and immediately apply
  };

  return (
    <div className="filter-options">
      <div className="filter-field">
        <input
          type="text"
          name="country"
          placeholder="Filter by country"
          value={filters.country}
          onChange={handleChange}
          list="countryList"
        />
        <datalist id="countryList">
          {filteredCountries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {filters.country && (
          <button type="button" onClick={clearCountry}>
            X
          </button>
        )}
      </div>

      <div className="filter-field">
        <input
          type="text"
          name="city"
          placeholder="Filter by city"
          value={filters.city}
          onChange={handleChange}
          list="cityList"
        />
        <datalist id="cityList">
          {filteredCities.map((ci) => (
            <option key={ci} value={ci} />
          ))}
        </datalist>
        {filters.city && (
          <button type="button" onClick={clearCity}>
            X
          </button>
        )}
      </div>

      <div className="filter-field">
        <input
          type="text"
          name="venue"
          placeholder="Filter by venue"
          value={filters.venue}
          onChange={handleChange}
          list="venueList"
        />
        <datalist id="venueList">
          {filteredVenues.map((v) => (
            <option key={v} value={v} />
          ))}
        </datalist>
        {filters.venue && (
          <button type="button" onClick={clearVenue}>
            X
          </button>
        )}
      </div>

      <button type="button" onClick={clearAll} className={"filter-options-clear-all"}>
        Clear All
      </button>
    </div>
  );
}
