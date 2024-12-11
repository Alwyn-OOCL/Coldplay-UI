// src/services/concertService.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/', // Backend base URL
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Fetch concerts from the backend with optional filters and date range.
 * @param {Object} filtersAndDates - { country, city, venue, startDate, endDate }
 * @returns {Promise<Array>} - Array of concert detail objects
 */
export async function fetchConcerts({ country, city, venue, startDate, endDate }) {
    const params = {};
    if (country) params.country = country;
    if (city) params.city = city;
    if (venue) params.venue = venue;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await axiosInstance.get('concerts/search', { params });
    const result = response.data;

    if (result.success) {
        return result.data; // Array of concerts with venue and areas
    } else {
        throw new Error(result.errorMsg || 'Failed to fetch concerts');
    }
}
