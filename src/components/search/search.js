import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

// Define the Search component
const Search = ({ onSearchChange }) => {
    // State to hold the current search input value
    const [search, setSearch] = useState(null);

    // Function to load options asynchronously based on the input value
    const loadOptions = (inputValue) => {
        return fetch(
            // Construct the URL for fetching city data from the API using the input value
            `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then((response) => response.json()) // Convert the response to JSON
            .then((response) => {
                console.log('API Response:', response);

                // Map the data from the API response to the format expected by the react-select component
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    })
                };
            })
            .catch((err) => console.log(err)); // Handle any errors that might occur
    };

    // Function to handle the onChange event of the search input
    const handleOnChange = (searchData) => {
        // Update the search state with the new search data
        setSearch(searchData);
        // Call the provided onSearchChange function with the new search data
        onSearchChange(searchData);
    };

    // Custom styles for the react-select components
    const customStyles = {
        // Styles for the control/container of the react-select
        control: (provided, state) => ({
            ...provided,
            color: 'white', 
            borderRadius: '5px',
            boxShadow: state.isFocused ? '0 0 0 2px #ffffff' : null,
            backgroundColor: 'rgba(255, 255, 255, 0)',
        }),
        // Styles for each option in the dropdown
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'rgba(242, 242, 242)' : null,
            color: 'rgba(106, 119, 133)',
        }),
        // Styles for the input field
        input: (provided, state) => ({
            ...provided,
            color: 'white', 
        }),
        // Styles for the selected value
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white', 
        }),
    };

    // JSX structure for the Search component
    return (
        <AsyncPaginate
            placeholder="Search city"
            debounceTimeout={600} // Delay before making the API call after user input
            value={search}
            onChange={handleOnChange} // Handle the change event when the user selects an option
            loadOptions={loadOptions} // Provide the function to fetch and format options
            styles={customStyles} // Apply the custom styling to react-select components
        />
    );
};
export default Search;