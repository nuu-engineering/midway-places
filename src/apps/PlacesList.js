/* global places: false, BASE_URL: false */
import React from 'react';
import classnames from 'classnames';
import { List, ListItem, Map, Tabs } from '../components/Places';
import {
  PANEL, MAP, GMAPS, OFFICE,
  RETAIL, HOTEL, RESIDENCE,
} from '../constants';
import * as ASSET from '../assets-urls';
import '../css/PlacesList.css';

/**
 * places = {
 *    id: string,
 *    key: string,
 *    featured: boolean,
 *    category: string,
 *    name: string,
 *    slug: string,
 *    image: url,
 *    address: string,
 *    latitude: number,
 *    longitude: number
 * }[]
 */

function App() {
  const [showing, setShowing] = React.useState(PANEL);

  return (
    <div data-duration-in="300" data-duration-out="100" className="w-tabs">
      <div className="toggle-view-tabs w-tab-menu" role="tablist">
        <a
          className={classnames("tab-link w-inline-block w-tab-link", {"w--current": showing === PANEL})}
          href="#"
          role="tab"
          aria-selected={showing === PANEL}
          onClick={(ev) => { if (ev) ev.preventDefault(); setShowing(PANEL); }}
        >
          <img
            src={showing === PANEL ? ASSET.UNION_ORANGE : ASSET.UNION_GRAY}
            alt="List View"
          />
        </a>
        <a
          className={classnames("tab-link w-inline-block w-tab-link", {"w--current": showing === MAP})}
          href="#"
          role="tab"
          aria-selected={showing === MAP}
          onClick={(ev) => { if (ev) ev.preventDefault(); setShowing(MAP); }}
        >
          <img
            src={showing === MAP ? ASSET.PIN_ORANGE : ASSET.PIN_GRAY}
            alt="Map View"
          />
        </a>
      </div>
      <div className="tabs-content w-tab-content">
        <div
          data-w-tab="Tab 1"
          className={classnames("tab-pane-tab-1 w-tab-pane w--tab-active")}
          id="w-tabs-0-data-w-pane-0" 
          role="tabpanel" 
          aria-labelledby="w-tabs-0-data-w-tab-0" 
          style={{ opacity: 1, transition: "opacity 300ms ease 0s" }}
        >
          <Tabs
            showing={showing}
            sections={[
              { 
                name: 'All',
                panel: (
                  <List>
                    { places.map((item) => (<ListItem {...item} urlPrefix={BASE_URL} />))}
                  </List>
                ),
                map: (
                  <Map
                    list={places}
                    apiKey={GMAPS}
                    urlPrefix={BASE_URL}
                  />
                ),
              },
              { 
                name: 'Featured',
                panel: (
                  <List>
                    { places.filter((item) => item.featured).map((item) => (<ListItem {...item} urlPrefix={BASE_URL} />))}
                  </List>
                ),
                map: (
                  <Map
                    list={places.filter((item) => item.featured)}
                    apiKey={GMAPS}
                    urlPrefix={BASE_URL}
                  />
                ),
              },
              { 
                name: OFFICE,
                panel: (
                  <List>
                    { places.filter((item) => item.category === OFFICE).map((item) => (<ListItem {...item} urlPrefix={BASE_URL} />))}
                  </List>
                ),
                map: (
                  <Map
                    list={places.filter((item) => item.category === OFFICE)}
                    apiKey={GMAPS}
                    urlPrefix={BASE_URL}
                  />
                ),
              },
              { 
                name: RETAIL,
                panel: (
                  <List>
                    { places.filter((item) => item.category === RETAIL).map((item) => (<ListItem {...item} urlPrefix={BASE_URL} />))}
                  </List>
                ),
                map: (
                  <Map
                    list={places.filter((item) => item.category === RETAIL)}
                    apiKey={GMAPS}
                    urlPrefix={BASE_URL}
                  />
                ),
              },
              { 
                name: HOTEL,
                panel: (
                  <List>
                    { places.filter((item) => item.category === HOTEL).map((item) => (<ListItem {...item} urlPrefix={BASE_URL} />))}
                  </List>
                ),
                map: (
                  <Map
                    list={places.filter((item) => item.category === HOTEL)}
                    apiKey={GMAPS}
                    urlPrefix={BASE_URL}
                  />
                ),
              },
              { 
                name: RESIDENCE,
                panel: (
                  <List>
                    { places.filter((item) => item.category === RESIDENCE).map((item) => (<ListItem {...item} urlPrefix={BASE_URL} />))}
                  </List>
                ),
                map: (
                  <Map
                    list={places.filter((item) => item.category === RESIDENCE)}
                    apiKey={GMAPS}
                    urlPrefix={BASE_URL}
                  />
                ),
              },
            ]}
          />
        </div>
        <div
          data-w-tab="Tab 2"
          className={classnames("tab-pane-tab-2 w-tab-pane")}
          id="w-tabs-0-data-w-pane-1"
          role="tabpanel"
          aria-labelledby="w-tabs-0-data-w-tab-1"
          style={{}}
        >
        </div>
      </div>
    </div>
  );
}

export default App;
