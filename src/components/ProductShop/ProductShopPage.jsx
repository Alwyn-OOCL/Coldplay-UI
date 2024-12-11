// src/pages/ConcertListPage.js
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { fetchConcerts } from "../../api/service/concertService";
import ProductList from "./ProductList";
import products from "../../data/products";
import "./ProductShopPage.css";

export default function ProductShopPage() {
  const [filteredConcerts, setFilteredConcerts] = useState([]);

  // Actual applied filters and date range
  const [filters, setFilters] = useState({ country: "", city: "", venue: "" });
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  // Pending filters and date range that user is typing/selecting
  const [pendingFilters, setPendingFilters] = useState({
    country: "",
    city: "",
    venue: "",
  });
  const [pendingDateRange, setPendingDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Sort by latest first by default
  const [sortOrder, setSortOrder] = useState("desc");
  const concertsPerPage = 10;

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

        // Sort by concertStartTime according to sortOrder
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
    indexOfLastConcert
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle changes from FilterOptions - update pending filters only
  const handlePendingFilterChange = (newFilters) => {
    setPendingFilters(newFilters);
  };

  // Handle changes from DateRangeSearch - update pending date range only
  const handlePendingDateRangeChange = (range) => {
    setPendingDateRange(range);
  };

  // Only when "Apply Filters" is clicked do we apply pendingFilters and pendingDateRange
  const applyFiltersAndDate = () => {
    setFilters(pendingFilters);
    setDateRange(pendingDateRange);
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="concert-list-page">
      <main className="container">
        <h1>Cold Play Exclusive Products</h1>

        <button onClick={handleSort} className="sort-button">
          Sort by Date (
          {sortOrder === "asc" ? "Earliest First" : "Latest First"})
        </button>
        <ProductList products={products} />
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
