import React from 'react';
import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';
import averageGeolocation from '../utils/average-geolocation';
import { mapStyle } from '../utils/map-options';
import { MARKER } from '../assets-urls';
import { t as typy } from 'typy';

const Map = ({ list = [], apiKey, urlPrefix = '' }) => {
  const [map, setMap] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [center, setCenter] = React.useState({ lat: 0, lng: 0 });
  React.useEffect(() => {
    if (list.length) {
      const [first] = list;
      setSelected(first); 
      setCenter(list.length === 1
        ? { lat: first.latitude, lng: first.longitude }
        : averageGeolocation(list));
    }
  }, [list]);

  return (
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          id="places-map"
          mapContainerStyle={{
            height: "646px",
            maxHeight: "90vh",
            width: "100%"
          }}
          options={{
            styles: mapStyle,
            disableDefaultUI: true,
          }}
          zoom={12}
          center={center}
          onLoad={React.useCallback((map) => {
            const bounds = new window.google.maps.LatLngBounds();
            list.forEach(element => {
              bounds.extend(new window.google.maps.LatLng(element.latitude, element.longitude));
            })
            map.fitBounds(bounds);
            setMap(map)
          }, [])}
          onUnmount={React.useCallback((map) => {
            // do your stuff before map is unmounted
            setMap(null);
          }, [])}
        >
          {
            list.map((element) => (
              <Marker
                key={element.slug}
                position={{ lat: element.latitude, lng: element.longitude }}
                icon={{
                  url: MARKER,
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
            <a href={`${urlPrefix}${typy(selected, 'slug').safeString}`} className='map-overlay'>
              {/* <img
                className='map-overlay-img'
                src={typy(selected, 'image').safeString}
                alt={typy(selected, 'name').safeString}
              /> */}
              <div className="place-image-container">
                <img src={typy(selected, 'image').safeString} alt={typy(selected, 'name').safeString} className="full-image" />
              </div>
              <span className='map-overlay-name'>{typy(selected, 'name').safeString}</span>
              <span className='map-overlay-location'>{typy(selected, 'address').safeString}</span>
            </a>
          </OverlayView>
        </GoogleMap>
      </LoadScript>
  );
}

export default Map;