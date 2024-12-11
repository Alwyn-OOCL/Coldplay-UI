// src/pages/ConcertListPage.js
import React, {
  useEffect,
  useState
} from 'react';
import ConcertList from '../components/ConcertList/ConcertList';
import DateRangeSearch from '../components/DateRangeSearch/DateRangeSearch';
import FilterOptions from '../components/FilterOptions/FilterOptions';
import Pagination from '../components/Pagination/Pagination';
import {fetchConcerts} from '../api/service/concertService';
import './ConcertListPage.css';

export default function ConcertListPage () {
  const [filteredConcerts, setFilteredConcerts] = useState([]);

  // Actual applied filters and date range
  const [filters, setFilters] = useState({
    country: '',
    city: '',
    venue: ''
  });
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // Pending filters and date range that user is typing/selecting
  const [pendingFilters, setPendingFilters] = useState({
    country: '',
    city: '',
    venue: ''
  });
  const [pendingDateRange, setPendingDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Sort by latest first by default
  const [sortOrder, setSortOrder] = useState('desc');
  const concertsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchConcerts({
          country: filters.country,
          city: filters.city,
          venue: filters.venue,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        });

        let result = data || [];

        // Sort by concertStartTime according to sortOrder
        result.sort((a, b) => {
          const dateA = new Date(a.concertStartTime);
          const dateB = new Date(b.concertStartTime);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setFilteredConcerts(result);
        setCurrentPage(1);
      }
      catch (error) {
        console.error('Error fetching concerts:', error);
      }
    };

    getData();
  }, [
    filters,
    dateRange,
    sortOrder
  ]);

  const indexOfLastConcert = currentPage * concertsPerPage;
  const indexOfFirstConcert = indexOfLastConcert - concertsPerPage;
  const currentConcerts = filteredConcerts.slice(indexOfFirstConcert, indexOfLastConcert);

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
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className='concert-list-page'>
      <main className='container'>
        <h1>Upcoming Concerts</h1>
        {/* FilterOptions updates pendingFilters */}
        <FilterOptions onFilterChange={handlePendingFilterChange} initialFilters={pendingFilters}/>
        {/* DateRangeSearch updates pendingDateRange, and the "Apply Filters" button triggers applyFiltersAndDate */}
        <DateRangeSearch
          onRangeChange={handlePendingDateRangeChange}
          initialRange={pendingDateRange}
          onApplyFilters={applyFiltersAndDate}
        />
        <button onClick={handleSort} className='sort-button'>
          Sort by Date ({sortOrder === 'asc' ? 'Earliest First' : 'Latest First'})
        </button>
        <ConcertList concerts={currentConcerts}/>
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
