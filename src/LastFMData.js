import React, { Component } from 'react';

// import {Treemap} from 'react-vis';
// import '../node_modules/react-vis/dist/style.css';

const BASE_URL = "https://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "d07648f4e1a607c3f1e8b962745df5ee";

// Renders treemap of popular tags
// expected props: track name, artist
class TagDisplay extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.track !== prevProps.track || this.props.artist !== prevProps.artist) {
      this.getAJAX();
    }
  }

  getAJAX() {
    fetch(BASE_URL + "track.gettoptags&artist=" + this.props.artist + "&track=" + this.props.track +
          "&format=json&autocorrect=1&api_key=" + API_KEY)
      .then(response => response.json())
      .then(data => this.process(data),
            error => console.error(error));
  }

  process(data) {
    data = data.toptags;

    let children = data.tag.slice(0, 10).map(tag => {
      return {title: tag.name,
              size: tag.count,
              color: '#f6b342'}
    });
    
    if (children.length === 0) {
      children = [
        {title: 'No User Generated Tags', size: 70, color: '#FF6666'},
        {title: data['@attr'].track, size: 20, color: '#FFA0A0'},
        {title: data['@attr'].artist, size: 20, color: '#FFA0A0'}
      ];
    }

    this.setState({
      data: {
        color: '#29b6f6',
        children: children
      }
    });
  }

  render() {
    return (
      <div>
        {this.state ? <h2>Frequently Tagged As</h2> : ''}
        {/* {this.state ?
          <Treemap
            data={this.state.data}
            title={'Top Tags'}
            mode={'circlePack'}
            // renderMode={'SVG'}
            width={600}
            height={600}
            padding={6}
            colorType={'literal'}
            animation={{damping: 9,
                        stiffness: 300}}
            style={{border:'2px solid black',
                    color: 'black'}}
          />
          : ''
        } */}
      </div>
    );
  }
}

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
        let img = track.image.filter(img => {return img.size === 'medium'})[0]['#text'];

        return {name: track.name,
                match: track.match,
                playcount: track.playcount,
                artist: track.artist.name,
                img: img};
      });

      this.setState({similarTracks: newData, error: null});
    }
  }

  setSort(event) {
    event.preventDefault();
    this.setState({sort: event.target.value});
  }

  render() {
    if (this.state) {
      if (this.state.error) {
        return (
          <div>
            {this.state.error}
          </div>
        )
      }

      let tracks = this.state.similarTracks;

      if (this.state.sort) {
        tracks = tracks.sort((a, b) => {
          return b[this.state.sort] - a[this.state.sort];
        });
      }

      tracks = tracks.map(track => {
        return <SimilarTrack key={track.name + "-" + track.artist}
                name={track.name} artist={track.artist} img={track.img} playcount={track.playcount}
                match={track.match} />
      });

      return (
        <div>
          <h2>Similar Tracks</h2>
          <select name="sort" onChange={e => this.setSort(e)}>
            <option value="match">Similarity</option>
            <option value="playcount">Most Played</option>
          </select>
          {tracks}
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
    return (
      <div>
        <img src={this.props.img} alt={this.props.name}/>
        <h5>{this.props.name + " by " + this.props.artist}</h5>
      </div>
    )
  }
}

export { TagDisplay, SimilarTrackDisplay };