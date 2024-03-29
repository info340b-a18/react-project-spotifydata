import React, { Component } from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import { Button, Table } from 'reactstrap';
import {Bar} from 'react-chartjs-2';
import FooterPage from './FooterPage';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';
import _ from 'lodash';


class UserProfile extends Component {
    
    constructor(props) {
        super(props);
        this.showLikes = this.showLikes.bind(this);
        this.state = {
            userLikes: []
        }
        this.userTableData = [];
        this.showLikes();
    }


    render() {
        var likes = "";
        if (this.userTableData.length == 0) {
            var userTable = <h1 className="headings">Please login with Spotify first.</h1>
        } else {
            var userTable =  <UserTable userTableData={this.userTableData}></UserTable>    
        }
        if (this.state.userLikes.length != 0) {
            likes = this.state.userLikes.map((like) => {
                return <LikeCard like={like}></LikeCard>
            })
        }
        
        return(
            <div className="main-container">
                {userTable}
                {this.state.userLikes.length != 0 && 
                <div>
                    <h1 className="headings">Your Likes:</h1>
                    {likes}
                </div>
                }
                {this.state.userLikes.length == 0 &&
                <h1 className="headings">You have no liked songs! Go like some</h1>
                }
                <FooterPage />
                
            </div>
        )
    }

    showLikes() {
        let uid = localStorage.getItem('uid');
        if (uid === null) {
            return [];
        }
        let task = "";
        firebase.database().ref(uid).once('value').then(function(snapshot) {
            if (snapshot.val() == null) {
                return [];
            }
            snapshot = snapshot.val().likes; 
            let taskKeys = Object.keys(snapshot);
            let taskArr = taskKeys.map((key) => { //map array of keys into array of tasks
                task = snapshot[key]; //access element at that key
                return task; //save the key for later referencing!
            })
            return taskArr
        }).then((taskArr) => {
            taskArr = _.uniqWith(taskArr, _.isEqual);
            this.setState({userLikes: taskArr})
        });
    }

    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.props.accessToken);
        var options = {
            headers: myHeaders
        };
        var requestMe = "https://api.spotify.com/v1/me/";
        if (this.props.accessToken != undefined) {
            await fetch(requestMe, options).then((response) => response.json()).then(json => {
                let images = json.images;
                let arr = [];
                arr.push(json);
                arr[0].images = (images[0].url);
                this.userTableData = arr;
                this.setState({userTablePresent: true})
            });  
        }
       
    }

}

class LikeCard extends Component {
    render() {
        return(
            <div className="col-sm">
            <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">{this.props.like.name}{" - "}{this.props.like.artist}</h5>
              </div>
            </div>
            </div>
        )
    }
}

class UserTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.userTableData[0];
        return(
            <div className="container-fluid">
                <h1>Spotify Profile</h1>
                <div className="row">
                    <div className="col-3">
                        <img src={data.images} />
                    </div>
                    <div className="col-7s">
                        <h2 className="display-4">{data.display_name}</h2>
                        <h3>Followers: {data.followers.total}</h3>
                        <h3><a href={data.uri}>Open Profile</a></h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile