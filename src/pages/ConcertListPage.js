// src/pages/ConcertListPage.js
import React, { useEffect, useState } from "react";
import { fetchConcerts, fetchLocations } from "../api/service/concertService";
import ConcertList from "../components/ConcertList/ConcertList";
import DateRangeSearch from "../components/DateRangeSearch/DateRangeSearch";
import FilterOptions from "../components/FilterOptions/FilterOptions";
import Pagination from "../components/Pagination/Pagination";
import "./ConcertListPage.css";

export default function ConcertListPage() {
  const [filteredConcerts, setFilteredConcerts] = useState([]);

  const [filters, setFilters] = useState({ country: "", city: "", venue: "" });
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const [pendingFilters, setPendingFilters] = useState({
    country: "",
    city: "",
    venue: "",
  });
  const [pendingDateRange, setPendingDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [locationData, setLocationData] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allVenues, setAllVenues] = useState([]);
  const [cityMap, setCityMap] = useState({});
  const [venueMap, setVenueMap] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const concertsPerPage = 10;

  useEffect(() => {
    const getLocationsData = async () => {
      try {
        const locations = await fetchLocations();
        const dataMap = {};
        const citySet = new Set();
        const venueSet = new Set();

        locations.forEach((loc) => {
          const { country, cities } = loc;
          dataMap[country] = {};
          cities.forEach((c) => {
            dataMap[country][c.city] = c.venues;
            c.venues.forEach((v) => venueSet.add(v));
            citySet.add(c.city);
          });
        });

        setLocationData(dataMap);
        const cArr = Object.keys(dataMap).sort();
        setAllCountries(cArr);

        const cityArray = Array.from(citySet).sort();
        const venueArray = Array.from(venueSet).sort();

        setAllCities(cityArray);
        setAllVenues(venueArray);

        const cMap = {};
        const vMap = {};
        for (let country of cArr) {
          const countryCities = Object.keys(dataMap[country]);
          for (let city of countryCities) {
            const vList = dataMap[country][city];
            if (!cMap[city]) cMap[city] = [];
            cMap[city].push({ country, venues: vList });

            for (let ven of vList) {
              if (!vMap[ven]) vMap[ven] = [];
              vMap[ven].push({ country, city });
            }
          }
        }

        setCityMap(cMap);
        setVenueMap(vMap);
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    };
    getLocationsData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchConcerts({
          country: filters.country,
          city: filters.city,
          venue: filters.venue,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        });

        let result = data || [];
        result.sort((a, b) => {
          const dateA = new Date(a.concertStartTime);
          const dateB = new Date(b.concertStartTime);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredConcerts(result);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };
    getData();
  }, [filters, dateRange, sortOrder]);

  const indexOfLastConcert = currentPage * concertsPerPage;
  const indexOfFirstConcert = indexOfLastConcert - concertsPerPage;
  const currentConcerts = filteredConcerts.slice(
    indexOfFirstConcert,
    indexOfLastConcert,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePendingFilterChange = (newFilters) => {
    setPendingFilters(newFilters);
  };

  const handlePendingDateRangeChange = (range) => {
    setPendingDateRange(range);
  };

  const applyFiltersAndDate = () => {
    setFilters(pendingFilters);
    setDateRange(pendingDateRange);
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // New function to clear all filters and date range
  const clearAllFiltersAndDates = () => {
    // Reset pendingFilters and pendingDateRange
    const clearedFilters = { country: "", city: "", venue: "" };
    const clearedDateRange = { startDate: "", endDate: "" };

    setPendingFilters(clearedFilters);
    setPendingDateRange(clearedDateRange);

    // Apply immediately
    setFilters(clearedFilters);
    setDateRange(clearedDateRange);
  };

  return (
    <div className="concert-list-page">
      <main className="container">
        <h1>Upcoming Concerts</h1>
        <FilterOptions
          onFilterChange={handlePendingFilterChange}
          initialFilters={pendingFilters}
          locationData={locationData}
          allCountries={allCountries}
          allCities={allCities}
          allVenues={allVenues}
          cityMap={cityMap}
          venueMap={venueMap}
          onClearAllFilters={clearAllFiltersAndDates} // pass the callback
        />
        <DateRangeSearch
          onRangeChange={handlePendingDateRangeChange}
          initialRange={pendingDateRange}
          onApplyFilters={applyFiltersAndDate}
        />
        <button onClick={handleSort} className="sort-button">
          Sort by Date (
          {sortOrder === "asc" ? "Earliest First" : "Latest First"})
        </button>
        <ConcertList concerts={currentConcerts} />
        <Pagination
          concertsPerPage={concertsPerPage}
          totalConcerts={filteredConcerts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}
