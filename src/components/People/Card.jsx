import React from 'react';
import classnames from 'classnames';
// import { SimpleImg } from 'react-simple-img';
import { PERSON_EMPTY } from '../../assets-urls';
import Bio from './Bio';

const Card = ({ slug, name, job, org, photo = PERSON_EMPTY, linkedIn = '', description = '', show = false, onSelect, onClose }) => {
  return (
    <div
      className={classnames("people-card w-dyn-item w-col w-col-3", { "cursor-pointer": description })}
      role="listitem"
      key={slug}
      onClick={(ev) => { if (description) onSelect(); }}
    >
      <Bio 
        name={name}
        photo={photo}
        job={job}
        description={description}
        onClose={onClose}
        show={show}
      />
      
      <div className="h-horizontal-center mb-2">
        <div className="people-card-link w-inline-block">
          {
            !photo 
              ? (
                <img
                  className="person-image"
                  style={{ position: 'absolute' }}
                  src={PERSON_EMPTY}
                  alt={name}
                />
              )
              : null
          }
          {
            photo && !description
              ? (
                <img
                  className="person-image"
                  style={{ position: 'absolute' }}
                  src={photo}
                  alt={name}
                  // srcSet={`${typy(person, 'photo').safeString.replaceAll('%20','%2520').replace(/(.*)\.(.*?)$/, "$1")}-p-500.jpeg 500vw, ${typy(person, 'photo').safeString} 688vw`}
                  // src={`https://global-uploads.webflow.com/5f6bc5ab851aeadfe3a90206/5f6bc5ab851aea3daaa904e6_Alex%20Garza%20-%202020%20(smaller).jpg`}
                  // srcSet={`https://global-uploads.webflow.com/5f6bc5ab851aeadfe3a90206/5f6bc5ab851aea3daaa904e6_Alex%2520Garza%2520-%25202020%2520(smaller)-p-500.jpeg 500w, https://global-uploads.webflow.com/5f6bc5ab851aeadfe3a90206/5f6bc5ab851aea3daaa904e6_Alex%20Garza%20-%202020%20(smaller).jpg 688w`}
                />
              )
              : null
          }
          {
            photo && description
              ? (
                <img
                  className="person-image scalable-img"
                  style={{ position: 'absolute' }}
                  src={photo}
                  alt={name}
                />
              )
              : null
          }
        </div>
      </div>
      <div className="row no-wrap">
        <div className="col-10 col-padding-0">
          <p className="normal-text normal-height">{name}</p>
          <p className="eyebrow-small text-uppercase text-steel">{job}</p>
        </div>
        {
          !linkedIn
            ? null
            : (
              <a 
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-circle w-inline-block"
                onClick={(ev) => ev.stopPropagation() }
              >
                <p className="people-icon"></p>
              </a>
            )
        }
      </div>
    </div>
  );
};

export default Card;