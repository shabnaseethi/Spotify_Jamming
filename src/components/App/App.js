import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import PlayList from "../PlayLIst/PlayList.js";
import Spotify from "../../util/Spotify";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My PlayList",
      playListTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playListTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({
      playListTracks: tracks,
    });
  }
  removeTrack(track) {
    let tracks = this.state.playListTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({ playListTracks: tracks });
  }
  updatePlaylistName(names) {
    this.setState({
      playlistName: names,
    });
  }
  savePlaylist() {
    let trackURIs = this.state.playListTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New PlayList",
        playListTracks: [],
      });
    });
  }
  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({
        searchResults: searchResults,
      });
    });
    console.log(searchResults);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <PlayList
              playlistName={this.state.playlistName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
