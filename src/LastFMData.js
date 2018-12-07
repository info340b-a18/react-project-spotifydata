import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';
const BASE_URL = "https://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "d07648f4e1a607c3f1e8b962745df5ee";

// Renders list of similar tracks
// expected props: track name, artist, viewTrack callback func
class SimilarTrackDisplay extends Component {
  componentDidMount() {
    this.getAJAX();
  }

  componentDidUpdate(prevProps) {
    if (this.props.track !== prevProps.track || this.props.artist !== prevProps.artist) {
      this.getAJAX();
    }
  }

  async getAJAX() {
    this.setState({loading: true});
    let artist = await fetch(BASE_URL + "artist.getcorrection&artist=" + this.props.artist +
            "&format=json&api_key=" + API_KEY)
          .then(response => response.json())
          .then(data => {
            return (data.corrections.correction ? data.corrections.correction.artist.name : this.props.artist);
          });

    fetch(BASE_URL + "track.getsimilar&artist=" + artist + "&track=" + this.props.track +
            "&format=json&autocorrect=1&api_key=" + API_KEY)
          .then(response => response.json())
          .then(data => this.process(data));
  }

  process(data) {
    if (data.error) {
      this.setState({error: data.message});
    } else if (data.similartracks.track.length === 0) {
      this.setState({error: 'No similar tracks found'});
    } else {
      data = data.similartracks.track;
      let newData = data.map(track => {
        let img = track.image.filter(img => {return img.size === 'large'})[0]['#text'];

        return {name: track.name,
                match: track.match,
                playcount: track.playcount,
                artist: track.artist.name,
                img: img};
      });

      this.setState({similarTracks: newData, error: null});
    }
    this.setState({loading: false});
  }

  setSort(event) {
    event.preventDefault();
    this.setState({sort: event.target.value});
  }

  setShow(event) {
    event.preventDefault();
    this.setState({show: event.target.value});
  }

  render() {
    if (this.state) {
      if (this.state.loading) {
        return (
          <div className="text-center">
              <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
          </div>
        );
      }

      if (this.state.error) {
        return (
          <div className="container mx-auto">
          <div className="alert alert-danger">
            {this.state.error}
          </div>
          </div>
        )
      }

      let tracks = this.state.similarTracks;

      if (this.state.sort) {
        tracks = tracks.sort((a, b) => {
          return b[this.state.sort] - a[this.state.sort];
        });
      }

      tracks = tracks.slice(0, this.state.show ? this.state.show : 10);

      tracks = tracks.map(track => {
        return <SimilarTrack key={track.name + "-" + track.artist} uid={this.props.uid}
                name={track.name} artist={track.artist} img={track.img} playcount={track.playcount}
                match={track.match} />
      });

      return (
        <div>
          <div className="container">
            <h2>Similar Tracks</h2>
            <div className="form-group row">
              <label className="col-form-label" for="sort">Sort by:</label>
              <div className="col">
                <select className="form-control col" id="sort" name="sort" onChange={e => this.setSort(e)}>
                  <option value="match">Similarity</option>
                  <option value="playcount">Most Played</option>
                </select>
              </div>
              <label className="col-form-label" for="show">Show:</label>
              <div className="col">
                <select className="form-control" id="show" name="show" onChange={e => this.setShow(e)}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="card-deck">
                {tracks} 
              
              </div>
            </div>
            
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

// Renders clickable track element
// expected props: track name, artist, playcount, match, image src (String), viewTrack callback func
class SimilarTrack extends Component {
  render() {
    console.log(this.props.uid);
    return (
        <div className="col-sm-3">
        <div className="card bg-dark text-white">
          <img className="card-img-top" src={this.props.img} alt={this.props.name}/>
            <div className="card-body">
              <h5 className="card-title">{this.props.name + " by " + this.props.artist}</h5>
              <p className="card-text">Playcount: {this.props.playcount}</p>
              <button class="btn btn-primary" aria-label="Like"  onClick={() => this.sendData()}>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                </button>
          </div>
        </div>
        </div>
    )
  }

  sendData() {
    console.log(this.props.artist + ' - ' + this.props.name);
    let tmp = localStorage.getItem('uid');
    console.log(tmp);
    firebase.database().ref(tmp + '/likes').push({
      name: this.props.name,
      artist: this.props.artist
    });
    console.log("done");
  }
}




export { SimilarTrackDisplay };