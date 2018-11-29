import React, { Component } from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import { Button, Table } from 'reactstrap';
import {Bar} from 'react-chartjs-2';

class SpotifyData extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userTablePresent: false,
            artistTablePresent: false,
            songChartPresent: false,
            songButtonClicked: false,
            artistButtonClicked: false
        }
        this.userTableData = [];
        this.artistTableData = [];
        this.songChartData = [];
        this.songButtonClick = this.songButtonClick.bind(this);
        this.artistButtonClick = this.artistButtonClick.bind(this);
    }

    songButtonClick() {
        this.setState({songButtonClicked: true});
        this.setState({songChartPresent: true});
    }

    artistButtonClick() {
        this.setState({artistButtonClicked: true});
        this.setState({artistTablePresent: true});
    }

    render() {
        if (this.userTableData.length == 0) {
            var userTable = <h1>Please login first</h1>
        } else {
            var userTable =  <UserTable userTableData={this.userTableData}></UserTable>    
        }
        return(
            <div>
                {userTable}
                {this.state.songButtonClicked == true &&
                <SongChart songChartData={this.songChartData}></SongChart>}
                {this.state.artistButtonClicked == true &&
                <ArtistTable artistTableData={this.artistTableData}></ArtistTable>}
                {this.state.artistTablePresent == false && 
                <Button color='primary' onClick={()=> this.artistButtonClick()} >Top Artists</Button>}{' '}
                {this.state.songChartPresent == false && 
                <Button color='primary' onClick={()=> this.songButtonClick()}>Top Songs</Button>} {' '}
                
                
            </div>
        )
    }

    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.props.accessToken);
        var options = {
            headers: myHeaders
        };
        var requestMe = "https://api.spotify.com/v1/me/";
        var requestArtist = "https://api.spotify.com/v1/me/top/artists?limit=10";
        var requestSong = "https://api.spotify.com/v1/me/top/tracks?limit=10";
        if (this.props.accessToken != undefined) {
            await fetch(requestMe, options).then((response) => response.json()).then(json => {
                let images = json.images;
                let arr = [];
                arr.push(json);
                arr[0].images = (images[0].url);
                this.userTableData = arr;
                this.setState({userTablePresent: true})
            });  
            await fetch(requestArtist, options).then((response) => response.json()).then(json => {
                json.items.map((artist) => {
                    this.artistTableData.push(artist);                    
                })
            });
            await fetch(requestSong, options).then((response) => response.json()).then(json => {
                json.items.map((song) => {
                    this.songChartData.push(song);
                })
            })
            console.log(this.artistTableData);
            console.log(this.songChartData);
        }
    }

}
class SongChart extends Component {
    render() {
        
        let labels = [];
        let ratings = [];
        this.props.songChartData.forEach((song) => {
            labels.push(song.name)
            ratings.push(song.popularity)
        });
        var data =  {
            labels: labels,
            datasets: [
                {
                  label: "Popularity (Spotify Index)",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: ratings
                }
              ]
        }
        return (
            <div>
                <h1>Your Top 10 Songs!</h1>
                <Bar data={data}/>
            </div>
        )
        
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


class UserTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Spotify User Data Table</h1>
                <ReactTabulator
                columns={
                    [ //Define Table Columns
                        {title:"Name", field:"display_name", width:150},
                        {title:"Followers", field:"followers.total", align:"left"},
                        {title:"Link to Profile", field:"uri", formatter:"link"}, 
                        {title:"Picture", field:"images", formatter:"image"}
                        
                    ]
                }
                data={this.props.userTableData}
                />
            </div>
        )
    }
}

export default SpotifyData