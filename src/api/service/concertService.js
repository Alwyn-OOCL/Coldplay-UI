import baseApi from "../baseApi";

const axiosInstance = baseApi;

export async function fetchConcerts({ country, city, venue, startDate, endDate }) {
    const params = {};
    if (country) params.country = country;
    if (city) params.city = city;
    if (venue) params.venue = venue;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await axiosInstance.get('/api/concerts/search', { params });
    const result = response.data;

    if (result.success) {
        return result.data;
    } else {
        throw new Error(result.errorMsg || 'Failed to fetch concerts');
    }
}

export async function fetchLocations() {
    const response = await axiosInstance.get('/api/locations');
    const result = response.data;
    if (result.success) {
        // result.data is a list of {country, cities:[{city, venues:[]}]}
        return result.data;
    } else {
        throw new Error(result.errorMsg || 'Failed to fetch locations');
    }
}
