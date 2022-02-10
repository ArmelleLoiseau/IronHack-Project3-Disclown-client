import React from "react";

const SearchChan = ({ searchChan, callbackSearch }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Looking for a spécific chan"
        value={searchChan}
        onChange={(e) => callbackSearch(e.target.value)}
      />
    </>
  );
};

export default SearchChan;
