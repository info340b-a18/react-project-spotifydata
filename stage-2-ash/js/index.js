var accessToken; 
var globalArtists;
myStorage = window.localStorage;
$(document).ready(function () {   
	accessToken = "";
	// Get the hash of the url
const hash = window.location.hash    .substring(1)    .split('&')    .reduce(function (initial, item) {      
   if (item) {        
	   var parts = item.split('=');        
	   initial[parts[0]] = decodeURIComponent(parts[1]);      
   }      
   return initial;    
}, {});

	// Set token
   
accessToken = hash.access_token;  

});


document.getElementById("top").addEventListener('click', function() {
	getTopTracks(accessToken);                                       
  });
  
  document.getElementById("artists").addEventListener('click', function() {
	getTopArtists(accessToken);                                       
  });


function getTopTracks(accesstoken) {
	console.log(accesstoken);
	$.ajax({
	  
	  url: 'https://api.spotify.com/v1/me/top/tracks?limit=10',
	  headers: {
		'Authorization': 'Bearer ' + accesstoken
	  },
	  success: function(response) {
		$(".recommendations").show();
       mapOverSongs(response.items);
		console.log(response.items)
	  }
	});
	
  }
  function getTopArtists(accessToken) {
	$.ajax({
	  url: 'https://api.spotify.com/v1/me/top/artists?limit=15',
	  headers: {
		'Authorization': 'Bearer ' + accessToken
	  },
	  success: function(response) {
		for (var i=0, n=response.length; i<n; i++) {
			document.getElementById('top-artists').innerHTML += response.items.name[i]
			
		}
		names = JSON.stringify(response.items);
		myStorage.setItem("names", names);
	
	  }
	});
	chart();
  }
  function mapOverSongs(songs) { 
    songs.map( function(song) {
          var list = "<input type='checkbox' name='top-tracks' value='" +
                  song.id + "'>" +
                  "<a href='" + song.external_urls.spotify + "'>" +
                  song.name +
                  " by " + song.artists[0].name +
                  " from the album " + song.album.name +
                  "</a><br><br>";
          document.getElementById('top-tracks').innerHTML += list;
    });
}

function display() {
	
	let artists = JSON.parse(myStorage.getItem("names"));
	console.log(artists);
	let print = ""; 

	for (var i=0, n=artists.length; i<n; i++) {
		print += artists[i].name += ": ";
		print += artists[i].popularity += ", ";
		
	}
	document.getElementById('showArt').innerHTML += print; 
  

	
}

function chart() {
	let artists = JSON.parse(myStorage.getItem("names"));
	console.log(artists[0].genres.length);
	var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [artists[0].name, artists[1].name, artists[2].name,artists[3].name, artists[4].name],
        datasets: [{
			label: '# of Genres their Music Covers',
            data: [artists[0].genres.length, artists[1].genres.length, artists[2].genres.length,artists[3].genres.length, artists[4].genres.length],
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)',
			'rgba(255, 206, 86, 0.2)',
			'rgba(75, 192, 192, 0.2)',
			'rgba(153, 102, 255, 0.2)',
			'rgba(255, 159, 64, 0.2)' ],
            borderWidth: 1
        }]
	},
	options: {
        scales: {
            yAxes: [{
                ticks: {
					beginAtZero:true,
					max: 10
					
                }
            }]
        }
	}
	
});
}



function authorize() {    
	var loginQuery = "https://accounts.spotify.com/authorize?client_id=b30b1fd988c44a7a87b483415d4fa7f5&response_type=token&scope=user-top-read&show_dialog=true&redirect_uri=https://info340b-a18.github.io/project-ashisrani/";
	window.location = loginQuery;

}






