/* global subplaces: false, PLACE: false */
import React from 'react';
import classnames from 'classnames';
import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';
import { t as typy } from 'typy';
import {
  GMAPS, RNB, ENTERTAIN, SHOP
} from '../constants';
import { mapStyle } from '../utils/map-options';
import * as ASSET from '../assets-urls';
import averageGeolocation from '../utils/average-geolocation';

import '../css/Subplaces.css';

/**
 * subplaces = {
 *   name: string,
 *   address: string,
 *   category: RNB | ENTERTAIN | SHOP,
 *   image: url,
 *   key: string,
 *   latitude: number,
 *   longitude: number
 * }[]
 */

function App() {
  const [map, setMap] = React.useState(null);
  const [items, setItems] = React.useState(subplaces);
  const [selected, setSelected] = React.useState(null);
  const [center, setCenter] = React.useState({ lat: typy(PLACE, 'latitude').safeNumber, lng: typy(PLACE, 'longitude').safeNumber });
  
  React.useEffect(() => { 
    if (typy(subplaces).isArray) {
      const [first] = subplaces;
      setItems(subplaces);
      setSelected(first);
      if (subplaces.length) {
        setCenter(subplaces.length === 1
          ? { lat: first.latitude, lng: first.longitude }
          : averageGeolocation(subplaces));
      }
    }
  }, [subplaces]);

  return (
    <div className="row">
      <div className="col-7 col-md-12">
        <div className="places-map">
          <LoadScript googleMapsApiKey={GMAPS}>
            <GoogleMap
              id="subplaces-map"
              mapContainerStyle={{
                height: "717px",
                maxHeight: "90vh",
                width: "100%"
              }}
              options={{ styles: mapStyle, disableDefaultUI: true }}
              zoom={10}
              center={center}
              onLoad={React.useCallback((map) => {
                const bounds = new window.google.maps.LatLngBounds();
                items.forEach(element => {
                  bounds.extend(new window.google.maps.LatLng(element.latitude, element.longitude));
                })
                map.fitBounds(bounds, { left: 80, right: 80, top: 200, bottom: 60 });
                setMap(map)
              }, [])}
              onUnmount={React.useCallback((map) => { setMap(null); }, [])}
            >
              {
                items.map((element) => (
                  <Marker
                    key={element.slug}
                    position={{ lat: element.latitude, lng: element.longitude }}
                    icon={{
                      url: element.category ===  RNB
                        ? ASSET.BAR_PIN
                        : element.category === ENTERTAIN
                          ? ASSET.TICKET_PIN
                          : ASSET.BAG_PIN,
                      labelOrigin: { x: 12, y: -10},
                    }}
                    onClick={() => setSelected(element)}
                  />
                ))
              }

              <OverlayView
                position={{lat: typy(selected, 'latitude').safeNumber, lng: typy(selected, 'longitude').safeNumber}}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className='map-overlay'>
                  <div className="place-image-container" style={{ backgroundImage: `url("${typy(selected, 'image').safeString}")`}}></div>
                  {/* <img className='map-overlay-img' src={typy(selected, 'image').safeString} alt={typy(selected, 'name').safeString} /> */}
                  <span className='map-overlay-name'>{typy(selected, 'name').safeString}</span>
                  <span className='map-overlay-location'>{typy(selected, 'address').safeString}</span>
                </div>
              </OverlayView>
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      <div className="col-4 ml-auto mt-8 col-md-12 order-md-first mt-md-0 mb-md-6">
        <p className="eyebrow-big text-steel mb-1 text-uppercase">The Neighborhood</p>
        <h3 className="h3 mb-8">{typy(PLACE, 'name').safeString}</h3>
        <div className="col-md-6 col-padding-0 col-xs-12 mb-8 mb-md-6">
          <p className="normal-text">{typy(PLACE, 'address').safeString}</p>
        </div>

        <div className={classnames("row h-vertical-center mb-7 place-subplaces-button")}>
          <img src={ASSET.BAR} alt="" className="mr-3 ml-2" />
          <p className="eyebrow-big text-steel text-uppercase">Restaurants &amp; Bars</p>
        </div>
        
        <div className={classnames("row h-vertical-center mb-7 place-subplaces-button")}>
          <img src={ASSET.TICKET} alt="" className="mr-3 ml-2" />
          <p className="eyebrow-big text-steel text-uppercase">Entertainment</p>
        </div>
        
        <div className={classnames("row h-vertical-center place-subplaces-button")}>
          <img src={ASSET.BAG} alt="" className="mr-3 ml-2" />
          <p className="eyebrow-big text-steel text-uppercase">Shopping</p>
        </div>
      </div>
    </div>
  );
}

export default App;