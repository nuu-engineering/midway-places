import React from 'react';

const ListItem = ({ id, name, slug, image, city, state, urlPrefix = '' }) => (
  <div role="listitem" className="col-4 mb-6 col-md-6 col-xs-12 w-dyn-item w-col w-col-4">
    <a data-w-id={id} href={`${urlPrefix}${slug}`} className="text-decoration-none w-block places-list-item">
      <div className="place-image-wrap">
        <div className="place-image-container" style={{ backgroundImage: `url("${image}")` }}></div>
      </div>
      <p className="normal-text text-navy">{name}</p>
      <div className="row">
        <p className="eyebrow-small text-steel text-uppercase">{city}</p>
        <p className="eyebrow-small text-steel text-uppercase mr-1">,</p>
        <p className="eyebrow-small text-steel text-uppercase">{state}</p>
      </div>
    </a>
  </div>
)

export default ListItem;