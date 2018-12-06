import React, { Component } from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import { Button, Table } from 'reactstrap';
import {Bar} from 'react-chartjs-2';

class SpotifySongs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            songChartPresent: false,
            songButtonClicked: false,
        }
        this.songChartData = [];
        this.songButtonClick = this.songButtonClick.bind(this);
    }

    songButtonClick() {
        this.setState({songButtonClicked: true});
        this.setState({songChartPresent: true});
    }

    render() {
        if (this.props.accessToken == undefined) {
            var heading = <h1>Please login with Spotify first</h1>
        } else {
            var heading = <h1>Click to see your top songs!</h1>
        }
        return(
            <div>
                {this.state.songButtonClicked == false &&
                heading}
                {this.state.songButtonClicked == true &&
                <SongChart songChartData={this.songChartData} ></SongChart>}
                {this.state.songChartPresent == false && this.props.accessToken != undefined &&
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
        var requestSong = "https://api.spotify.com/v1/me/top/tracks?limit=10";
        if (this.props.accessToken != undefined) {
            await fetch(requestSong, options).then((response) => response.json()).then(json => {
                json.items.map((song) => {
                    this.songChartData.push(song);
                })
            })
        }
    }

}
class SongChart extends Component {
    render() {
        let labels = [];
        let ratings = [];
        this.props.songChartData.forEach((song) => {
            labels.push(song.name + '-' + song.artists[0].name)
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
            events: ['click'],
            onClick: this.handleClick
        };
        return (
            <div>
                <h1>Your Top 10 Songs!</h1>
                <Bar data={data} options={options} />
            </div>
        )   
    }

    handleClick(event, elements) {
        console.log(elements[0]['_view'].label);
    }
}


export default SpotifySongs