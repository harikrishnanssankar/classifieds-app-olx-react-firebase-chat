// import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from '@reach/combobox';
// import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
// import { GoogleMap, useLoadScript, Marker, infoWindow, } from "@react-google-maps/api";
// import "@reach/combobox/styles.css";

import { useState } from "react";
import { CountryDropdown, CountryRegionData, RegionDropdown } from "react-country-region-selector";
import csc from 'country-state-city'
import { ICountry, IState, ICity } from 'country-state-city'



const PlaceSearch = () => {
    
    // require('dotenv').config()
    // const countryDetails = getCountryByCode('IN')
    // console.log(countryDetails);





    // const libraries = ["places"];
    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: "AIzaSyBWpamfc6vFmcSEzC_LiUcki-FBRZv-8XI",
    //     libraries,
    // });


    // const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    //     requestOptions: {

    //     },
    //     componentRestrictions: {
    //         country: 'in'
    //     },

    // })


    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');

    



    return (
        <div className="place__search">
            {/* <Combobox onSelect={(address) => { console.log(address); }}>
                <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} placeholder="Enter place" />
                <ComboboxPopover>
                    {
                        status === "OK" && data.map(({id, description}) => (
                            <ComboboxOption key={id} vlaue={description} />
                        ))
                    }
                </ComboboxPopover>
            </Combobox> */}

            <CountryDropdown value={country} onChange={(e) => setCountry(e)} />
            <RegionDropdown country="India" value={region} onChange={(e) => setRegion(e)} />
            <CountryRegionData/>

        </div>

    );
}

export default PlaceSearch;