import React, { Component } from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import FooterPage from './FooterPage';
import _ from 'lodash';
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
            var heading = <h1 className="headings">Please login with Spotify first.</h1>
        } else {
            var heading = ''
        }
        return(
            <div className="main-container">
                {this.artistTableData.length == 0 && heading}
                {this.artistTableData.length != 0 && <Artists artistTableData={this.artistTableData} accessToken={this.props.accessToken}></Artists>}
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
    constructor(props) {
        super(props)
        this.state = {
            albumArtistName: ""
        }
        this.albumData = []
        this.albumCardsRender = "";
    }
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
                <ArtistCard artist={artist} albumCards={this.albumCards} accessToken={this.props.accessToken}></ArtistCard>
            )
        })

        if (this.albumData.length != 0) {
            this.albumCardsRender = this.albumData.map((album) => {
                return (
                    <AlbumCard album={album}></AlbumCard>
                )
            })
        }

        return(
            <div>
                {this.state.albumArtistName != "" && 
                <div>
                    <h2>{this.state.albumArtistName + "'s " + "Top Albums:"}</h2>
                    <div className="container">
                    <div className="row">
                        <div className="card-columns">
                            {this.albumCardsRender}
                        </div>
                    </div>
                </div>
                </div>
                }
                <h1 className="headings">Your Top Artists!</h1>
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

    albumCards = (albumData, artistName) => {
        this.albumData = [];
        albumData = albumData.items;
        albumData = _.uniqBy(albumData, (album) => {
            return album.name;
        });
        console.log(albumData);
        albumData.map((album) => {
            this.albumData.push(album);
            this.setState({albumArtistName: artistName});
        })
    }
}

class AlbumCard extends Component {
    render() {
        return(
            <div className="col-sm">
                <div className="card bg-dark text-white">
                <img className="card-img-top" src={this.props.album.images[0].url} alt={this.props.album.name}/>
                    <div className="card-body">
                    <h5 className="card-title">{this.props.album.name}{" - "}{this.props.album.album_group}</h5>
                    <a href={this.props.album.uri} className="card-link">View on Spotify</a>
                </div>
                </div>
            </div>
        );
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
                </div>
                </div>
            </div>
        )
    }

    async getTopAlbums() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.props.accessToken);
        var options = {
            headers: myHeaders
        };
        var searchArtist = "https://api.spotify.com/v1/search/?q=";
        var searchAlbums = "https://api.spotify.com/v1/artists/{id}/albums"
        await fetch(searchArtist + this.props.artist.display_name+ "&type=artist", options).then((response) => response.json()).then((data => {
            return data.artists.items[0].id
        })).then((artistID) => {
            fetch(searchAlbums.replace('{id}', artistID), options).then((response) => response.json()).then((data => {
                this.props.albumCards(data, this.props.artist.display_name);
            }));
        });
    }
}


export default SpotifyArtists