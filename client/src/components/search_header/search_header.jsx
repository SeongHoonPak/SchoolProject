import React, { memo, useRef } from "react";

const SearchHeader = memo(({ onSearch }) => {
  const inputRef = useRef();
  const handleSearch = () => {
    const value = inputRef.current.value;
    onSearch(value);
  };
  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = event => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <header>
      <div>
        <h1>하방</h1>
      </div>
      <input
        ref={inputRef}
        type="search"
        placeholder="Search..."
        onKeyPress={onKeyPress}
      />
      <button type="submit" onClick={onClick}>
        검색
      </button>
    </header>
  );
});

export default SearchHeader;
