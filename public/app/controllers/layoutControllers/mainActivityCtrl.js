/**
 * @ngdoc controller
 * @name demoApp:mainActivityCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
app.controller('mainActivityCtrl', function($scope,$log,$http,apiServices,cacheService){
    $scope.initData = function(){
        $scope.q='';
    };
    $scope.lat = undefined;
    $scope.lng = undefined;
    // @api key

    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        var location = $scope.autocomplete.getPlace().geometry.location;
        $scope.lat = location.lat();
        $scope.lng = location.lng();
        var location = $scope.lat+','+$scope.lng;
        $scope.$apply();
        $('#dataLoader').addClass('is-active');
        preLocation(location);
        $('.search-container').removeClass('is-active');
    });
    $scope.apiKey = 'b8f61505d200470e814171537172701';
    $scope.googleGeolocationKey = 'AIzaSyA2Vxzk1PZUgMRk3OMgutHLfo2To9tDJPk';
    $scope.googleLocation = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?types=geocode&language=fr&key='+$scope.googleGeolocationKey+'&input=';

    $scope.currentWeather = 'http://api.apixu.com/v1/current.json?key='+$scope.apiKey;
    $scope.weatherForcast = 'http://api.apixu.com/v1/forecast.json?key='+$scope.apiKey+'&days=10';

    // http://api.apixu.com/v1/forecast.json?key=b8f61505d200470e814171537172701&q=noida&days=30

    $('#dataLoader').addClass('is-active');
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            // $scope.q = navigator.geolocation.coords.latitude+','+navigator.geolocation.coords.longitude;
            // console.log(navigator.geolocation);
        } else {
            $('#dataLoader').removeClass('is-active');
            alert("No support");
            // x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        $scope.q = position.coords.latitude+','+position.coords.longitude;

        console.log($scope.q);

        cacheService.setData('userlocation', $scope.q);

        // $scope.url = $scope.api+'?apikey='+$scope.apiKey+'&q='+$scope.q

        $scope.getcurrentWeather = $scope.currentWeather+'&q='+$scope.q;
        $scope.getweatherForcast = $scope.weatherForcast+'&q='+$scope.q;

        apiServices.getData($scope.getcurrentWeather,'GET', function (res) {
            console.log(JSON.stringify(res.data));
            // cacheService.setData('userlocation', res.data.location.name);
            if(res.status == 200) {
                $('#dataLoader').removeClass('is-active');
                $scope.locationWeather = res.data;
            }
        });

        apiServices.getData($scope.getweatherForcast,'GET', function (res) {
            console.log(JSON.stringify(res.data));
        });


    }

    function preLocation(position) {
        $scope.q = position;
        console.log($scope.q);
        // cacheService.setData('userlocation', $scope.q);
        // $scope.url = $scope.api+'?apikey='+$scope.apiKey+'&q='+$scope.q
        $scope.getcurrentWeather = $scope.currentWeather+'&q='+$scope.q;
        $scope.getweatherForcast = $scope.weatherForcast+'&q='+$scope.q;
        $scope.getweatherForcastHourly = $scope.weatherForcast+'&q='+$scope.q;

        console.log($scope.getweatherForcast);
        // var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // writeAddressName(userLatLng);
        apiServices.getData($scope.getcurrentWeather,'GET', function (res) {
            // console.log(JSON.stringify(res.data));
            if(res.status == 200) {
                $('#dataLoader').removeClass('is-active');
                $scope.locationWeather = res.data;
            }
        });
        apiServices.getData($scope.getweatherForcast,'GET', function (res) {
            if(res.status == 200) {
                $scope.locationWeatherForcast = res.data.forecast.forecastday;
                // $scope.locationWeatherForcastHourly = res.data.forecast.forecastday;
            }
        });
        apiServices.getData($scope.getweatherForcastHourly,'GET', function (res) {
        console.log(JSON.stringify(res.data.forecast.forecastday[0]));
            if(res.status == 200) {
                $scope.weatherForcastHourly = res.data.forecast.forecastday[0];
            }
        });

    }

    $scope.changeLocation = function () {
        $('#dataLoader').addClass('is-active');
        getLocation();
    };
    $scope.searchLocation = function () {
        $('.search-container').addClass('is-active');
    };
    var toUTCDate = function(date){
        var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return _utc;
    };

    var millisToUTCDate = function(millis){
        return toUTCDate(new Date(millis));
    };

    $scope.toUTCDate = toUTCDate;
    $scope.millisToUTCDate = millisToUTCDate;


    function init(){
        $scope.initData();
        // getLocation();
        // console.log(cacheService.getData('userlocation'));
        if (cacheService.getData('userlocation') != undefined) {
            preLocation(cacheService.getData('userlocation'));
        } else {
            getLocation();
        }
        // callOtherDomain();
    }

    init();
});