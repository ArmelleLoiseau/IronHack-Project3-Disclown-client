import React from "react";

const SearchChan = ({ searchChan, callbackSearch }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search for a specific chan"
        value={searchChan}
        onChange={(e) => callbackSearch(e.target.value)}
      />
    </>
  );
};

export default SearchChan;
