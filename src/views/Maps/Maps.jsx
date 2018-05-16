import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";


class Maps extends Component{
    constructor (props) {
        super(props);
        this.state = {
            geodata: {
                lat: null,
                lng: null
            }
        }
    }
    // getLatLngFromAdress = function () {
    //     let self = this;
    //     Geocode.enableDebug();
    //     Geocode.fromAddress("alaverdi").then(
    //         response => {
    //             console.log("222222222222222")
    //             const { lat, lng } = response.results[0].geometry.location;
    //             self.setState({geodata: {lat: lat, lng: lng}});
    //         },
    //         error => {
    //             console.error(error);
    //         }
    //     );
    // }
    render() {
        console.log("11111111111")
        if (!this.props.lat && !this.props.lng) {
            return null;
        }
        console.log("333333333333")
        return (
            <div id="map">
                <Map
                    style={{width: '100%', height: '100%', position: 'relative'}}
                    google={this.props.google}
                    initialCenter={{
                        lat: this.props.lat,
                        lng: this.props.lng
                    }}
                    zoom={14}
                    clickableIcons={false}
                >
                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'}
                    />
                </Map>
            </div>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyB2QxdsbLrnCa2Xp9_max39oFDqTNT1vjk"
})(Maps)