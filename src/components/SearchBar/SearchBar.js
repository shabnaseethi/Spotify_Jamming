import React, { Component } from "react";
import "../SearchBar/SearchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {
      searchTerm: "",
    };
  }
  search() {
    this.props.onSearch(this.state.searchTerm);
  }
  handleTermChange(event) {
    // event.preventDefault();
    this.state.searchTerm = event.target.value;
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
        />
        <button className="SearchButton" onClick={this.search}>
          SEARCH
        </button>
      </div>
    );
  }
}
