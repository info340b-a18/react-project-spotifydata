import React, { Component } from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import { Button, Table } from 'reactstrap';
import {Bar} from 'react-chartjs-2';
import FooterPage from './FooterPage';
import { element } from 'prop-types';
import { SimilarTrackDisplay } from './LastFMData';

class SpotifySongs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            songChartPresent: false,
        }
        this.songChartData = [];
        this.songButtonClick = this.songButtonClick.bind(this);
    }

    songButtonClick() {
        this.setState({songButtonClicked: true});
        this.setState({songChartPresent: true});
    }

    render() {
        console.log('SpotifySongs: ' + this.props.uid);
        if (this.props.accessToken == undefined) {
            var heading = <h1 className="login headings">Please login with Spotify first.</h1>
        } else {
            var heading = ""
        }
        return(
            <div className="main-container">
                {this.songChartData.length == 0 && heading}
                {this.songChartData.length != 0 && <SongChart songChartData={this.songChartData} uid={this.props.uid} />}
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
        var requestSong = "https://api.spotify.com/v1/me/top/tracks?limit=10";
        if (this.props.accessToken != undefined) {
            await fetch(requestSong, options).then((response) => response.json()).then(json => {
                json.items.map((song) => {
                    this.songChartData.push(song);
                })
            })
            this.setState({songChartPresent: true});
        }
    }
}

class SongChart extends Component {
    render() {
        console.log('SongChart: ' + this.props.uid);
        let labels = [];
        let ratings = [];
        this.props.songChartData.forEach((song) => {
            labels.push(song.name + ' | ' + song.artists[0].name)
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
        };
        let options = {
            onClick: this.handleClick,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Top 10 Songs'
                    },
                    ticks: {
                        display: false
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Spotify Popularity Index'
                    }
                }]
            }
        };
        return (
            <div>
                <h1>Your Top 10 Most Played Songs!</h1>
                <h4>Click a song to discover similar tracks</h4>
                <Bar data={data} options={options} />
                {this.state ?
                <SimilarTrackDisplay uid={this.props.uid} track={this.state.track} artist={this.state.artist} />
                : ''}
            </div>
        )   
    }

    handleClick = (event, elements) => {
        if (elements.length !== 0) {
            let data = elements[0]['_view'].label.split(' | ');
            this.setState({track: data[0], artist: data[1]});
        }
    }
}


export default SpotifySongs;