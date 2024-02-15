import React from "react";

export function SearchBar(props) {
  return (
    <div>
      <input
        type="text"
        className="search-bar"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.searchHandler(e.target.value);
          }
        }}
      />
    </div>
  );
}
