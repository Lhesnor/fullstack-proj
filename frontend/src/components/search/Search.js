import React from "react";
import { SearchBar } from "./SearchBar";
import SearchResult from "./SearchResult";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: null };
  }

  searchInputHandler = async (searchText) => {
    this.setState({ searchText });
  };

  render() {
    return (
      <div className="search-interface">
        <SearchBar searchHandler={this.searchInputHandler} />
        <SearchResult searchText={this.state.searchText} />
      </div>
    );
  }
}
