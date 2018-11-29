import React, { Component } from 'react';
import image from './img/spotify-music.jpg';


export class Home extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                            <div className="col-xl-5 spotify-img">
                                <img className="img-fluid" src={image}/>
                            </div>
                            <div className="col-xl-7 overview">
                                <h2>Topic Overview</h2>
                                <p>
                                    The topic domain I’m most interested in pursuing is music. I really would like to do something related to someone’s Spotify user history whether, it would be like the memories function on Snapchat or a web app for suggesting new music. 
                                    I feel like there are a lot of options that you can get into with this domain and its something I find really interesting.
                                    Additionally, there are a lot of possible music api's that can be used here whether that be Spotify or something else. It would be very effective to combine a few of these into a web app.
                                </p>
                                <p>
                                    The creation of apps in this space could be really beneficial, 
                                    because almost everyone listens to some sort of music and I’m sure people would be able to benefit from any additional music or any insights that can be gained from their music history. 
                                    Right now there are some ways to get new music selections, but I would like to further customize this process by allowing the user of the app to input any information for the search. From genre, to artists, I would like to use the users Spotify history if possible as well.
                                </p>
                            </div>
                    </div>
                </div>
                <div className="container-fluid">
                <div className="row Applications">
                        <h2>Applications</h2>
                        <ul>
                            <div className="col-sm">
                                <h3>
                                    Profile Overview 
                                </h3>
                                <p>
                                    This section will allow you to login via Spotify and then see an overview of your profile. This overview will include your name, 
                                    number of followers, link to your profile, and profile picture. 
                                </p>
                            </div>
                            <div className="col-sm">
                                <h3>
                                    Top Artists 
                                </h3>
                                <p>
                                    This section will allow you to display your top 10 artists on spotify based on prior listening, their popularity rating on a scale from 1-100, and 
                                    a link to their profile. The headers of each column are interactible, so you can click the popularity header to sort your top artists from low to high 
                                    or high to low popularity. 
                                </p>
                            </div>
                            <div className="col-sm">
                                <h3>
                                    Top Songs 
                                </h3>
                                <p>
                                    This section will allow you to display your top 10 songs on spotify in the form of a bar chart. When you hover over any bar in the chart it will show you
                                    the name of the song and its popularity indexed by spotify. 
                                </p>
                                
                            </div>
                        </ul>
                </div>
            </div>
            <div>
                <section className="further-links" id="further-link">
                    <h2 className="card-title">Further Links and Resources</h2>
                    <li>
                        <a href="https://developer.spotify.com/documentation/web-api/">Spotify API</a>
                    </li>
                    <li>
                        <a href="https://developer.spotify.com/community/showcase/">Showcase of Spotify Web App Ideas</a>
                    </li>
                    <li>
                        <a href="https://musicmachinery.com/music-apis/">Different Useful Music Api's Aside From Spotify</a>
                    </li>
                </section>
            </div>
            <footer>
                <p>Posted by: Chai Gangavarapu</p>
                <p>Contact information: <a href="mailto:chaitanya.gangavarapu@gmail.com">
                chaitanya.gangavarapu@gmail.com</a>.</p>
            </footer>
        </div>
        )
    }
}

export default Home;