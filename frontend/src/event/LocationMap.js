import React, { Component } from 'react'
import {Map,Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'
/**
 * This class creates google map component
 */
class LocationMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            markers: [
                {
                    name: "Current position",
                    position: {
                        lat: 37.77,
                        lng: -122.42
                    }
                }
            ]
        };

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.location !== this.props.location){
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${nextProps.location}&key=AIzaSyCwQGCqTjEPs1-9trnQpw0ye622g1FyxnU`).then(({data})=>{
                    console.log('location',data)
                    return true
                }).catch(()=>{

                })
        }else {
            return false
        }
    }
    componentDidMount() {
        console.log('event')
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${nextProps.location}&key=AIzaSyCwQGCqTjEPs1-9trnQpw0ye622g1FyxnU`).then(({data})=>{
            console.log('location',data)
            return true
        }).catch(()=>{

        })
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
        return (
            <div style={{marginLeft: 24}}>
            <Map
                google={this.props.google}
                style={{
                    width: "810px",
                    height: "200px"
                }}
                zoom={14}
            >
                {this.state.markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        draggable={true}
                        onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                        name={marker.name}
                    />
                ))}
            </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    //  apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
})(LocationMap)
