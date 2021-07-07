import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "./Maps.css"
import { useHistory } from "react-router";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
    "pk.eyJ1IjoiaGFyaWtyaXNobmFuc3NhbmthciIsImEiOiJja3FuenhzMXIwMmhpMnZzMng5cGx0bWNhIn0.dda298RlmnCXkPdi-BBjiQ";


const Maps = () => {
    const [viewport, setViewport] = useState({});
    const [userlocation, setuserlocation] = useState({ latitude: 0, longitude: 0 });
    const geocoderContainerRef = useRef();
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const history= useHistory();

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        },
        [handleViewportChange]
    );
    // console.log(viewport);
    const latitude = viewport.latitude
    // const handleSelect = (value) => {
    //     // history.push(`/search/search?${latitude}`)
    //     return value.
    // }
    const costomData= {}
    if (costomData.features?.length === 3 && userlocation.latitude !== 0) {
        costomData.features.push({
          'type': 'Feature',
          'properties': {
            'title': 'Your current location',
            'description':
              'College'
          },
          'geometry': {
            'coordinates': [userlocation.longitude, userlocation.latitude],
            'type': 'Point'
          }
        });
      }
    
    function forwardGeocoder(Query) {
        var matchingFeatures = [];
        for (var i = 0; i < costomData.features?.length; i++) {
          var feature = costomData.features[i];
    
          if (
            feature.properties.title
              .toLowerCase()
              .search(Query.toLowerCase()) !== -1
          ) {
    
            feature['place_name'] = feature.properties.title;
            feature['center'] = feature.geometry.coordinates;
    
            matchingFeatures.push(feature);
          }
        }
        console.log(matchingFeatures);
        return matchingFeatures;
      }

    return (
        <div className="location__search">
            <div
                ref={geocoderContainerRef}
                className="location__input"
                // onClick={handleSelect}
                
                
            />
            <div className="location__map">
                <MapGL
                    ref={mapRef}
                    {...viewport}
                    width="100%"
                    height="100%"
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    
                >
                </MapGL>
            </div>
            <Geocoder
                mapRef={mapRef}
                containerRef={geocoderContainerRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                position="top-left"
                countries={'IN'}
                localGeocoder={forwardGeocoder}
                
                
            />
        </div>
    );
};

export default Maps;