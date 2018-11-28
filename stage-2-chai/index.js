var accessToken;
$(document).ready(function() {

    // Get the hash of the url
    const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
    if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
    }, {});

    // Set token
    accessToken = hash.access_token;
    
    $(".load-data").click(() => {
        if (accessToken) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + accessToken);
            var options = {
                headers: myHeaders
            };
            var request = "https://api.spotify.com/v1/me/";
            return fetch(request, options).then((response) => response.json()).then(json => {
               var exampleTable = $('<div id="example-table"></div>');
                $("body").append(exampleTable);
                let images = json.images;
                let arr = [];
                arr.push(json);
                arr[0].images = (images[0].url);
                console.log(arr);
                var table = new Tabulator("#example-table", {
                    data:arr, 
                    layout:"fitColumns", //fit columns to width of table (optional)
                    columns:[ //Define Table Columns
                        {title:"Name", field:"display_name", width:150},
                        {title:"Followers", field:"followers.total", align:"left"},
                        {title:"Link to Profile", field:"uri", formatter:"link"}, 
                        {title:"Picture", field:"images", formatter:"image"}
                        
                    ]
                });
           });  
     
        }
    });

    $(".top-artists").click(() => {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                $('#top-artists').empty();
                response.items.map(function(artist) {
                    let item = $('<li>' + artist.name + '</li>');
                    item.appendTo($('#top-artists'));
                });
                console.log(response);
            }
        });
    });

    $(".top-songs").click(() => {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=10',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                console.log(response);
                let songs = response.items;
                let labels = [];
                let ratings = []
                songs.forEach((song) => {
                    labels.push(song.name)
                    ratings.push(song.popularity)
                });
                console.log(labels);
                console.log(ratings);
                var ctx = document.getElementById("myChart").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                              label: "Popularity (Spotify Index)",
                              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                              data: ratings
                            }
                          ]
                    }
                });
            }
        });

    });
});

function authorize() {
    var loginQuery = "https://accounts.spotify.com/authorize?client_id=f09bc8aafe37492495c170958f4282f5&response_type=token&scope=user-top-read&show_dialog=true&redirect_uri=https://info340b-a18.github.io/project-chaig15/userLogin.html";
    window.location = loginQuery;
}

