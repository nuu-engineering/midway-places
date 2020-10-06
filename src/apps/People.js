/* global people: false, PEOPLE_LIMIT: false */
import React from 'react';
import classnames from 'classnames';
import Fuse from 'fuse.js';
import { SimpleImg } from 'react-simple-img';
import { t as typy } from 'typy';

import '../css/People.css';
import { debounce } from '../utils/debounce';
import { CLOSE, MORE, PERSON_EMPTY } from '../assets-urls';
import { PEOPLE_ORG } from '../constants';
require('intersection-observer');

const fuse_options = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'name',
  ]
};

const fuse = new Fuse(people, fuse_options);
const debouncedSearch = debounce((setList, search) => setList(fuse.search(search).map(item => item.item)), 400);

/**
 * people = {
 *   slug: string,
 *   name: string,
 *   job: string,
 *   org: string,
 *   photo: url,
 *   linkedIn: url,
 *   description: string,
 * }[]
 */

function App() {
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [searched, setSearched] = React.useState(people);
  const loadMoreRef = React.useRef(null);
  
  React.useEffect(() => {
    if (search) debouncedSearch(setSearched, search);
    else setSearched(people);
  }, [search]);
  
  React.useEffect(() => {
    setPage(1);
  }, [search, filter]);
  
  const filtered = searched.filter((person) => (
    filter
      ? (person.org === filter && !person.inmemory) ||
        (filter === 'Leadership Team' && person.leader) ||
        (filter === 'In Memory' && person.inmemory) 
      : !person.inmemory
  ));
  const showLoad = filtered.length > page * PEOPLE_LIMIT;

  return (
    <div className="container-slim">
      <div className='row filters-row'>
        <input
          type="text"
          className="input mb-8 w-input"
          maxLength={30}
          name="name"
          placeholder="Search by name"
          onChange={ev => { setSearch(ev.target.value) }}
        />
        <select
          type="text"
          className="select mb-8 w-select"
          maxLength={30}
          name="name"
          placeholder="Search by name"
          onChange={ev => { setFilter(ev.target.value) }}
        >
          { 
            PEOPLE_ORG.map((org) => (
              <option value={org.value}>{org.display}</option>
            ))
          }
        </select>
      </div>
      <div className="w-dyn-list">
        <div className="people-collection w-dyn-items w-row" role="list">
          {
            filtered.map((person, index) => (
              index < PEOPLE_LIMIT * page
              ? (
                <div
                  className={classnames("people-card w-dyn-item w-col w-col-3", { "cursor-pointer": !typy(person, 'description').isEmptyString })}
                  role="listitem"
                  key={typy(person, 'slug').safeString}
                  onClick={(ev) => {
                    if (!typy(person, 'description').isEmptyString) setSelected(index);
                  }}
                >
                  <div className={classnames("people-bio", { show: selected === index })}>
                    <img
                      src={CLOSE}
                      alt="Close"
                      className="people-bio-close"
                      onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); setSelected(-1); }}
                    />
                    <div className="people-bio-content">
                      <div
                        style={{ backgroundImage: `url(${typy(person, 'photo').safeString || PERSON_EMPTY})` }}
                        className="people-bio-img"
                      />
                      <div className="people-bio-info">
                        <div className="people-bio-info-title">{typy(person, 'job').safeString}</div>
                        <div className="people-bio-info-name">{typy(person, 'name').safeString}</div>
                        <img 
                          className="people-bio-mob-img"
                          src={typy(person, 'photo').safeString}
                          alt={typy(person, 'name').safeString} 
                         />
                        <div className="people-bio-info-desc">
                          {typy(person, 'description').safeString}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-horizontal-center mb-2">
                    <div className="people-card-link w-inline-block">
                      {
                        typy(person, 'photo').isEmptyString 
                          ? (
                            <SimpleImg
                              className="person-image"
                              style={{ position: 'absolute' }}
                              src={PERSON_EMPTY}
                              alt={typy(person, 'name').safeString}
                            />
                          )
                          : null
                      }
                      {
                        !typy(person, 'photo').isEmptyString && typy(person, 'description').isEmptyString
                          ? (
                            <SimpleImg
                              className="person-image"
                              style={{ position: 'absolute' }}
                              src={typy(person, 'photo').safeString}
                              alt={typy(person, 'name').safeString}
                            />
                          )
                          : null
                      }
                      {
                        !typy(person, 'photo').isEmptyString && !typy(person, 'description').isEmptyString
                          ? (
                            <SimpleImg
                              className="person-image scalable-img"
                              style={{ position: 'absolute' }}
                              src={typy(person, 'photo').safeString}
                              alt={typy(person, 'name').safeString}
                            />
                          )
                          : null
                      }
                    </div>
                  </div>
                  <div className="row no-wrap">
                    <div className="col-10 col-padding-0">
                      <p className="normal-text normal-height">{typy(person, 'name').safeString}</p>
                      <p className="eyebrow-small text-uppercase text-steel">{typy(person, 'job').safeString}</p>
                    </div>
                    {
                      typy(person, 'linkedIn').isEmptyString
                        ? null
                        : (
                          <a 
                            href={typy(person, 'linkedIn').safeString}
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
              )
              : null
            ))
          }
        </div>
      </div>

      <div
        className={classnames("h-horizontal-center pt-8", { "display-none": !showLoad })}
        ref={loadMoreRef}
      >
        <div
          className="btn-text text-navy w-inline-block"
          role="button"
          onClick={(ev) => { ev.preventDefault(); setPage(page + 1) }}
          // onClick={(ev) => { ev.preventDefault(); setSearch("SD"); }}
        >
          <div className="row h-vertical-center">
            <div className="btn-circle mr-4">
              <img
                src={MORE}
                alt=""
              />
            </div>
            <p>load more</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
