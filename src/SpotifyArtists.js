import React, { Component } from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import FooterPage from './FooterPage';
const BASE_URL = "https://ws.audioscrobbler.com/2.0/?method=";
const API_KEY = "d07648f4e1a607c3f1e8b962745df5ee";

class SpotifyArtists extends Component {
    
    constructor(props) {
        super(props);
        this.state = {artistTablePresent: false}
        this.artistTableData = [];
    }

    render() {
        if (this.props.accessToken == undefined) {
            var heading = <h1 className="login">Please login with Spotify first.</h1>
        } else {
            var heading = <h1>Click to see your top artists!</h1>
        }
        return(
            <div className="main-container">
                {this.artistTableData.length == 0 && heading}
                {this.artistTableData.length != 0 && <Artists artistTableData={this.artistTableData}></Artists>}
                <FooterPage />
            </div>
        )
    }

    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.props.accessToken);
        var options = {
            headers: myHeaders
        };
        var requestArtist = "https://api.spotify.com/v1/me/top/artists?limit=10";
        if (this.props.accessToken != undefined) {
            await fetch(requestArtist, options).then((response) => response.json()).then(json => {
                json.items.map((artist) => {
                    this.artistTableData.push(artist);                    
                })
            });
        }
        this.setState({artistTablePresent: true})
    }

}

class Artists extends Component {
    render() {
        var ArtistData = []
        this.props.artistTableData.forEach((artist) => {
            let artistObject = {
                display_name: "",
                popularity: "",
                link: "",
                picture: ""
            }
            artistObject.display_name = artist.name;
            artistObject.popularity = artist.popularity;
            artistObject.link = artist.uri;
            artistObject.picture = artist.images[0].url;
            ArtistData.push(artistObject);
        });
        let artistCards = ArtistData.map((artist) => {
            return (
                <ArtistCard artist={artist}></ArtistCard>
            )
        })
        return(
            <div>
                <h1>Your Top Artists!</h1>
                <div className="container">
                    <div className="row">
                        <div className="card-columns">
                            {artistCards}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ArtistCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistButtonName: ""
        }
        this.getTopAlbums = this.getTopAlbums.bind(this)
    }
    render() {
        return (
            <div className="col-sm">
            <div className="card bg-dark text-white">
              <img className="card-img-top" src={this.props.artist.picture} alt={this.props.artist.display_name}/>
                <div className="card-body">
                  <h5 className="card-title">{this.props.artist.display_name}</h5>
                  <button class="btn btn-primary" onClick={this.getTopAlbums}>Get Top Albums</button>
                  <button class="btn btn-primary" aria-label="Like">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            </div>
        )
    }

    getTopAlbums() {
        console.log(BASE_URL + "artist.gettopalbums&" + "artist=" + this.props.artist.display_name + "&format=json&autocorrect=1&api_key=" + API_KEY);
        fetch(BASE_URL + "artist.gettopalbums&" + "artist=" + this.props.artist.display_name + "&format=json&autocorrect=1&api_key=" + API_KEY)
        .then((response) => response.json()).then((data) => {
            console.log(data);
        });
    }
}


export default SpotifyArtists