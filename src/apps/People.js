/* global people: false, PEOPLE_LIMIT: false */
import React from 'react';
import classnames from 'classnames';
import Fuse from 'fuse.js';
import { useInView } from 'react-hook-inview';
import { t as typy } from 'typy';

import '../css/People.css';
import { Card } from '../components/People';
import { debounce } from '../utils/debounce';
import { MORE } from '../assets-urls';
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
  const loadMoreCallback = (ev) => {
    setPage(page + 1);
  }
  const [loadMoreRef] = useInView({
    threshold: 1,
    onEnter: loadMoreCallback,
  }, [page])
  
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
                <Card 
                  {...person} 
                  show={selected === typy(person, 'slug').safeString} 
                  onSelect={() => setSelected(typy(person, 'slug').safeString)} 
                  onClose={() => setSelected(null)} />
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
          onClick={loadMoreCallback}
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
