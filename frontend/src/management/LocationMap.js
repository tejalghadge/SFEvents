import React, { Component } from 'react'
import {Map,Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

/**
 * This class creates google map component
 */
class LocationMap extends Component {
    state = {
        markers: [
            {
                name: "Current location",
                position: {
                    lat:37.70,
                    lng: -122.47
                }
            }
        ]
    };
    updateLocation (location){
        if(location){

            location=location.replace(/ /g,"+");
            // alert(location);
            const queryString= "https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key="+"AIzaSyCwQGCqTjEPs1-9trnQpw0ye622g1FyxnU";
            axios.get(queryString).then((result)=>{  //TODO integration with logged in user

                console.log(result);
                let latitude = parseFloat(result.data.results[0].geometry.location.lat.toFixed(2));
                let longitude = parseFloat(result.data.results[0].geometry.location.lng.toFixed(2));
                this.setState({markers: [ {
                        name: this.props.location,
                        position: {
                            lat:latitude,
                            lng: longitude
                        }
                    }]});
                this.forceUpdate()
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps.location)
        if(nextProps.location !== this.props.location){
            this.updateLocation(nextProps.location);
            return true
        }else {
            return false
        }
    }

    componentDidMount(){

        this.updateLocation(this.props.location);

    }


    /**
     * This function updates the state/position of marker according to new co-ordinates
     * @param coord
     * @param index
     */
    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState(prevState => {
            const markers = [...this.state.markers];
            markers[index] = { ...markers[index], position: { lat, lng } };
            return { markers };
        });
    };

    render() {
        console.log('state',this.state)
        return (
            <Map
                google={this.props.google}
                style={{
                    width: this.props.width,
                    height: this.props.height
                }}

                zoom={10}
            >
                {this.state.markers.map((marker, index) => (
                    <Marker
                        position={marker.position}
                        draggable={true}
                        onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                        name={marker.name} title ={marker.name}
                    />
                ))}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
      apiKey: "AIzaSyCwQGCqTjEPs1-9trnQpw0ye622g1FyxnU"
})(LocationMap)