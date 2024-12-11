// src/components/FilterOptions/FilterOptions.js
import React, { useState, useEffect } from 'react';
import './FilterOptions.css';

export default function FilterOptions({ onFilterChange, initialFilters }) {
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...filters, [name]: value };
        setFilters(updated);
        onFilterChange(updated); // Update pending filters in parent
    };

    return (
        <div className="filter-options">
            <input
                type="text"
                name="country"
                placeholder="Filter by country"
                value={filters.country}
                onChange={handleChange}
            />
            <input
                type="text"
                name="city"
                placeholder="Filter by city"
                value={filters.city}
                onChange={handleChange}
            />
            <input
                type="text"
                name="venue"
                placeholder="Filter by venue"
                value={filters.venue}
                onChange={handleChange}
            />
        </div>
    );
}
