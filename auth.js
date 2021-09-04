const AUTH_URL="https://welcome-dev.electrickiwi.co.nz/oauth/authorize"
const API_URL="https://api-dev.electrickiwi.co.nz"
const SCOPES="read_session read_consumption_averages read_hop_intervals_config read_hop_connection save_hop_connection"
const CALLBACK_URL= "http://localhost:5080/callback"
const CLIENT_ID="yoxpulzytlasXwnnwRUrbRj5"
const WEATHER_KEY="1c69bc2783cad2acbebae2820882055b"


const oauth = window["oauth2-client-js"];
const apiProvider = new oauth.Provider({
    id: 'electrickiwi', // required
    authorization_url: AUTH_URL // required
});

/**
 * Sends a GET request to the provided url using XMLHttpRequest.
 * @param {string} url url to get.
 * @param {string} token access token to authenticate.
 */
function httpGet(url, token) 
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.setRequestHeader("Authorization", `Bearer ${token}`); // Add auth token to headers
    xmlHttp.send(null);
    return xmlHttp.response;
}

function httpPost(url, token, data) 
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); 
    xmlHttp.setRequestHeader("Authorization", `Bearer ${token}`); // Add auth token to headers
    xmlHttp.send(data);
}

function openWeatherGet(url) 
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url+WEATHER_KEY, false);
    xmlHttp.send();
    return xmlHttp.response;
}