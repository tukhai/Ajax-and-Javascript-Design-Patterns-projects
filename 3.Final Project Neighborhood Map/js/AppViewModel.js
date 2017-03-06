var map,largeInfowindow,marker,map_centre,bounds; //map,infowindow and marker variable
var markers = []; //array to push markers

var defaultIcon,clickedIcon; //variables to store different icon colors

function initMap() {
    //function to initialise the map with given coordinates
    map_centre = new google.maps.LatLng(37.7749, -122.45254);
    map = new google.maps.Map(document.getElementById("map"),{
        center: map_centre,
        zoom: 12
    });

    defaultIcon = makeMarkerIcon('2f4f4f'); //grey color default icon
    clickedIcon = makeMarkerIcon('1a911b'); //green color default icon

    google.maps.event.addDomListener(window, 'resize', resize);
    //array of locations in san francisco
    var locations = [
        {   title: 'Alcatraz Islands',
            location: {lat: 37.8270 , lng: -122.4230},
            markerRef: null,
            venueId: '4451c80ef964a520a5321fe3'
        },
        {   title: "Fisherman's Wharf",
            location: {lat: 37.8080 , lng: -122.4177 },
            markerRef: null,
            venueId: '4b84871cf964a5204a3a31e3'
        },
        {   title: 'Golden Gate Bridge',
            location: {lat: 37.8199 , lng: -122.4783 },
            markerRef: null,
            venueId: '49d01698f964a520fd5a1fe3'
        },
        {   title: 'Union Square',
            location: {lat: 37.7879 , lng: -122.4075 },
            markerRef: null,
            venueId: '40bbc700f964a520b1001fe3'
        },
        {   title: 'Pier 39',
            location: {lat: 37.8087 , lng: -122.4098 },
            markerRef: null,
            venueId: '409d7480f964a520f2f21ee3'
        },
        {   title: 'Golden Gate Park',
            location: {lat: 37.7694 , lng: -122.4862 },
            markerRef: null,
            venueId: '445e36bff964a520fb321fe3'
        },
        {   title: 'Chinatown',
            location: {lat: 37.7941 , lng: -122.4078 },
            markerRef: null,
            venueId: '49b71814f964a5201a531fe3'
        },
        {   title: 'AT&T Park',
            location: {lat: 37.7786 , lng: -122.3893 },
            markerRef: null,
            venueId: '4bd2177d046076b055357371'
        },
        {   title: 'Lombard Street',
            location: {lat: 37.8021 , lng: -122.4187 },
            markerRef: null,
            venueId: '49f62829f964a520136c1fe3'
        },
        {   title: 'Ghirardelli Square',
            location: {lat: 37.8060 , lng: -122.4230 },
            markerRef: null,
            venueId: '4b819f25f964a5204ab330e3'
        },
        {   title: 'Coit Tower',
            location: {lat: 37.8024 , lng: -122.4058 },
            markerRef: null,
            venueId: '49de821ff964a5205c601fe3'
        },
        {   title: 'Aquarium of the Bay',
            location: {lat: 37.8088 , lng: -122.4093 },
            markerRef: null,
            venueId: '49e4bcfaf964a52028631fe3'
        },
        {   title: 'Presisdio of San Francisco',
            location: {lat: 37.7989 , lng: -122.4662 },
            markerRef: null,
            venueId: '49f62391f964a5200c6c1fe3'
        },
        {   title: 'Legion of Honor',
            location: {lat: 37.7845 , lng: -122.5008 },
            markerRef: null,
            venueId: '44d344bef964a52041361fe3'
        },
        {   title: 'Twin Peaks',
            location: {lat: 37.7521 , lng: -122.4474 },
            markerRef: null,
            venueId: '4c29567f9fb5d13aa2139b57'
        },
        {   title: 'Angel Islands',
            location: {lat: 37.8609 , lng:-122.4326 },
            markerRef: null,
            venueId: '4a6b7ec3f964a520c7ce1fe3'
        },
        {   title: 'San Francisco Zoo',
            location: {lat: 37.7330 , lng:  -122.5030 },
            markerRef: null,
            venueId: '49ca9423f964a520c0581fe3'
        },
        {   title: 'Ocean Beach',
            location: {lat: 37.7594 , lng: -122.5104 },
            markerRef: null,
            venueId: '409ad180f964a520eef21ee3'
        }
    ];


    //variable to store infowindow
    largeInfowindow = new google.maps.InfoWindow();
    //variable to store the bounds
    bounds = new google.maps.LatLngBounds();

    for (var i = 0,len = locations.length; i < len; i++) {
        var position = locations[i].location; //position of the location at ith index
        var title = locations[i].title; //name of the location in question
        var venueId = locations[i].venueId;
        //marker created
        marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            icon: defaultIcon,
            venueId: venueId,
            likes:"",
            animation: google.maps.Animation.DROP,
            id: i
        });
        //call the apiData marker to fetch likes for every location and store it in marker.likes
        apiData(marker);
        //push the newly created marker's reference to the location array
        locations[i].markerRef = marker;
        //push every marker to an array of their own
        markers.push(marker);
        marker.addListener('click', function() {
            //will call the function to populate the infowindow when any marker is clicked
            this.setIcon(clickedIcon);
            populateInfoWindow(this, largeInfowindow);
        });
        //extend boundaries of the map according to the lat long of the place
        bounds.extend(markers[i].position);
    }

    function resize(){
        //re-centre the map
        map.setCenter(map_centre);
        //make sure the map 'fits' to the bounds
        map.fitBounds(bounds);
    }


    function makeMarkerIcon(markerColor) {
        //makes a marker with a specified color,the color being specified as parameter
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21,34));
        return markerImage;
    }

    function AppViewModel() {
        //implementation of knockout
        var self = this; //reference to this
        self.SomeValue = ko.observable("Hide list"); //observes the value of the red button hiding or showing the list
        self.visibleVal = ko.observable(1);//stores 0 or 1 and affects visibility of the list
        self.ShowLessMore = function(){
            //toggles between the string "hide list" and "show list" on click
            if (self.SomeValue() == "Hide list"){
                self.SomeValue("Show List");
                self.visibleVal(0);
            }
            else if(self.SomeValue() == "Show List"){
                self.SomeValue("Hide list");
                self.visibleVal(1);
            }
        };

        self.changeOpacity = ko.pureComputed(function(){
            return self.visibleVal() ? "normal" : "transparent";
        });

        //stores location array as an observable locations array
        self.locations = ko.observableArray (locations);

        self.liClick = function (location){
            //opens respective markers' info windows and changes color of the marker
            location.markerRef.setIcon(clickedIcon);
            populateInfoWindow(location.markerRef,largeInfowindow);
        };

        self.colorVal = ko.observable(false);//observes true and false values to change color of the heart
        self.clickHeart = ko.observable(0);
        self.changeColor = ko.pureComputed(function (){
            //switches color of the heart icon from red to grey and vice versa
            return self.colorVal() ? "red" : "grey";
        });

        self.colorChanger = function(){
            //toggles true and false value of the observable
            this.colorVal() ? self.colorVal(false) : self.colorVal(true);
            this.colorVal() ? self.clickHeart(1) : self.clickHeart(0);
        };


        self.filter = ko.observable('');//observes value of the filter

        self.filteredItems = ko.computed(function(){
            //returns locations based on the filter text entered by the user. Also toggles visibility of the markers.
            var filter = self.filter().toLowerCase();
            if(!filter){
                //if no filter is applied, show all locations and their markers
                for (marker in self.locations()){
                    //shows all markers
                    self.locations()[marker].markerRef.setVisible(true);
                }
                return self.locations();

            }
            else {
                //else show only the filtered items of the array and their respective markers
                return ko.utils.arrayFilter(self.locations(), function(item) {
                    var match =  stringWith(item.title.toLowerCase(), filter);
                    item.markerRef.setVisible(match);
                    return match;
                });
            }

        },self);


    }

    // Activates knockout.js
    ko.applyBindings(new AppViewModel());

}

function googleError(){
    //if their is any error loading the map, alert the user
    alert("Error! Map won't load!");


}

function stringWith (string, startsWith) {
    //checks if the string contains the entered filter text, if yes, returns true else returns false
    return (string.indexOf(startsWith) >= 0);
}

//will populate the infowindow
function populateInfoWindow(marker, infowindow) {

    if(infowindow.marker){
        //if any marker is already open, change its color to the default color
        infowindow.marker.setIcon(defaultIcon);
    }
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {

        infowindow.marker = marker;
        var setContentInfo = '<h4>' + marker.title + '</h4>'+'<div>'+LikesOrNot(marker)+'</div>';
        infowindow.setContent(setContentInfo);
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
            infowindow.marker = null;
            marker.setIcon(defaultIcon);
        });
    }
}

function apiData (marker){
    //function to make ajax requests to the FourSquare API
    //jquery ajax function
    $.ajax({
        //url built from the required marker's venue id, client id and client secret
        url: "https://api.foursquare.com/v2/venues/" + marker.venueId +
        "?client_id=ODQGYWHSYJLQGDCQHDGCHCD2OOHKPDO3NQ34XDCXUZJNRXM2&client_secret=A5PWZ2I4IPTGVU1FBTHEJRB4PCE24CFDKDPOYTRTKEIEVTYI&v=20161104",
        //datatype format
        dataType: "json",
        //on success, perform the following operations
        success: function(info){
            //store marker's likes
            marker.likes = info.response.venue.likes.summary;
        },
        //on error, do the following
        error: function(error){
            alert("Problems to retrieve data from FourSquare! Sorry!");
        }
    });
}

function LikesOrNot(marker){
    //returns likes for the given marker as parameter else returns error message
    if(marker.likes === "" || marker.likes === undefined){
        return "No data available!";
    }
    else {
        return marker.likes;
    }
}














