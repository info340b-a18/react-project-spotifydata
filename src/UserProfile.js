import React, { Component } from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import { Button, Table } from 'reactstrap';
import {Bar} from 'react-chartjs-2';
import FooterPage from './FooterPage';

class UserProfile extends Component {
    
    constructor(props) {
        super(props);
        this.userTableData = [];
    }


    render() {
        if (this.userTableData.length == 0) {
            var userTable = <h1 className="login">Please login with Spotify first.</h1>
        } else {
            var userTable =  <UserTable userTableData={this.userTableData}></UserTable>    
        }
        return(
            <div className="main-container">
                {userTable}
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

export default UserProfile