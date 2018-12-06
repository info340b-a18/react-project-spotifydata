import React, { Component } from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import { Button, Table } from 'reactstrap';
import {Bar} from 'react-chartjs-2';
import FooterPage from './FooterPage';

class SpotifyArtists extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userTablePresent: false,
            artistTablePresent: false,
            artistButtonClicked: false
        }
        this.userTableData = [];
        this.artistTableData = [];
        this.artistButtonClick = this.artistButtonClick.bind(this);
    }

    artistButtonClick() {
        this.setState({artistButtonClicked: true});
        this.setState({artistTablePresent: true});
    }

    render() {
        if (this.props.accessToken == undefined) {
            var heading = <h1 className="login">Please login with Spotify first.</h1>
        } else {
            var heading = <h1>Click to see your top artists!</h1>
        }
        return(
            <div className="main-container">
                {this.state.artistButtonClicked == false &&
                heading}
                {this.state.artistButtonClicked == true &&
                <ArtistTable artistTableData={this.artistTableData}></ArtistTable>}
                {this.state.artistTablePresent == false && this.props.accessToken != undefined &&
                <Button color='primary' onClick={()=> this.artistButtonClick()}>Top Artists</Button>} {' '}
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
    }

}

class ArtistTable extends Component {
    render() {
        var ArtistData = []
        this.props.artistTableData.forEach((artist) => {
            let artistObject = {
                display_name: "",
                popularity: "",
                link: ""
            }
            artistObject.display_name = artist.name;
            artistObject.popularity = artist.popularity;
            artistObject.link = artist.uri;
            ArtistData.push(artistObject);
        });
        return(
            <div>
                <h1>Your Top Artists!</h1>
                <ReactTabulator
                columns={
                    [
                        {title:"Name", field:"display_name", width:150},
                        {title:"Popularity", field:"popularity", align:"left"},
                        {title:"Link to Profile", field:"link", formatter:"link"}, 
                    ]
                }
                data={ArtistData}
                />
            </div>
        )
    }
}


export default SpotifyArtists