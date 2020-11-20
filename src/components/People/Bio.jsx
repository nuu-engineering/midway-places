
import React from 'react';
import classnames from 'classnames';
// import { SimpleImg } from 'react-simple-img';
import { CLOSE, PERSON_EMPTY } from '../../assets-urls';

const Bio = ({ name, job, photo, description, show, onClose }) => {
  if (!description) return null;
  return (
    <div className={classnames("people-bio", { show: show, hide: !show })}>
      <img
        src={CLOSE}
        alt="Close"
        className="people-bio-close"
        onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); onClose(); }}
      />
      <div className="people-bio-content">
        <div
          // style={{ backgroundImage: `url(${typy(person, 'photo').safeString || PERSON_EMPTY})` }}
          className="people-bio-img"
        >
          <img
            className="people-bio-img-img"
            style={{ height: 'unset' }}
            src={photo || PERSON_EMPTY}
            alt={name}
          />
        </div>
        <div className="people-bio-info">
          <div className="people-bio-info-title">{job}</div>
          <div className="people-bio-info-name">{name}</div>
          <img 
            className="people-bio-mob-img"
            src={photo || PERSON_EMPTY}
            alt={name} 
          />
          <div className="people-bio-info-desc">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;