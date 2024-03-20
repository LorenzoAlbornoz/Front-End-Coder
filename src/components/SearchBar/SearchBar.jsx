import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { axiosInstance } from "../../config/axiosInstance";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const getSearchResults = async (query) => {
    try {
      const resp = await axiosInstance.get(`/products/search?productName=${query}`);
      return resp.data.products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (searchText) {
      const searchResults = await getSearchResults(searchText);

      if (searchResults.length > 0) {
        // For simplicity, navigate to the first result
        navigate(`/product/${searchResults[0]._id}`);
      } else {
        // Handle case when no results are found
        console.log("No results found");
      }
    }
  };

  useEffect(() => {
    const fetchSearchOptions = async () => {
      if (searchText) {
        const filteredProducts = await getSearchResults(searchText);
        setSearchOptions(filteredProducts);
      } else {
        setSearchOptions([]);
      }
    };

    fetchSearchOptions();
  }, [searchText]);

  return (
    <>
      <Stack spacing={2} sx={{ width: 330 }}>
        <Autocomplete
          freeSolo
          id="search"
          disableClearable
          options={searchOptions}
          getOptionLabel={(option) => option?.title || ''}
          renderOption={(props, option) => (
            <li
              {...props}
              onClick={() => navigate(`/product/${option._id}`)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '1.5rem' }}
            >
              <img
                src={option.images[0]}
                alt={option.title}
                style={{ width: '80px', height: '80px', marginRight: '10px', borderRadius: '50%' }}
              />
              <span>{option.title}</span>
            </li>
          )}
          onInputChange={(event, newInputValue) => {
            setSearchText(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar productos"
              variant="outlined"
              color="secondary"
              InputProps={{
                ...params.InputProps,
                type: "search",
                onKeyDown: handleKeyDown,
              }}
            />
          )}
        />
      </Stack>
      <button
        className="search-btn"
        onClick={handleSearch}
      >
        <RiSearch2Line className="nav-header__search" />
      </button>
    </>
  );
};

export default SearchBar;
