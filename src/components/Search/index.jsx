import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const SearchInputContainer = styled.div`
  position: relative;
`;

const SearchInputStyled = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 1.8rem;
  position: relative;
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
`;

const SearchItem = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SearchInputIcon = styled.span`
position: absolute;
display: inline-block;
right: 0;
top: 50%;
transform: translateY(-50%);
`;

const SearchInput = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const debouncedSearch = debounce(onSearch, 300);
    debouncedSearch(newQuery);

    setShowResults(true);
  };

  useEffect(() => {
    if (!showResults) {
      setResults([]);
    }
  }, [showResults]);

  return (
    <SearchInputContainer>
      <SearchInputStyled
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowResults(true)}
      />
      <SearchInputIcon>
        <FontAwesomeIcon icon={faSearch} />
      </SearchInputIcon>
      {showResults && (
        <SearchResults>
          {results.map((result) => (
            <SearchItem key={result.id} onClick={() => console.log(result)}>
              {result.name}
            </SearchItem>
          ))}
        </SearchResults>
      )}
    </SearchInputContainer>
  );
};

export default SearchInput;
