/* global NEWS_BASE_URL:false */
import React from 'react';
import classnames from 'classnames';
import { t as typy } from 'typy';
// import { debounce } from '../utils/debounce';
import { MORE } from '../../assets-urls';

const Tab = ({ list }) => {
  const LIMIT = 4;
  const [page, setPage] = React.useState(1);
  const maxPages = Math.ceil(list.length / LIMIT);
  const showLoad = list.length > page * LIMIT;


  return (
    <>
    <div className="news-content">
      <div className="container-slim-sm display-md-none">
        <div className="w-dyn-list">
          <div role="list" className="row mb-8 w-dyn-items">

            {
              list.map((element, index) => (
                index < LIMIT * page
                ? (
                  <div role="listitem" className="col-6 container-hover mb-5 w-dyn-item" key={typy(element, 'slug').safeString}>
                    <a
                      data-w-id="1e3532fe-3ef0-7d45-fef1-571d461e1c41"
                      href={typy(element, 'externalURL').safeString || `${NEWS_BASE_URL}${typy(element, 'slug').safeString}`}
                      className="news-link w-inline-block"
                    >
                      <div
                        style={{ backgroundImage: `url('${typy(element, 'image').safeString}')` }}
                        className="news-image-container">
                      </div>
                      <p className="eyebrow-small text-steel mb-1">11.8.2020</p>
                      <p className="normal-text text-navy">{typy(element, 'name').safeString}</p>
                    </a>
                  </div>
                )
                : null
              ))
            }
          </div>
        </div>
        <div className={classnames("h-horizontal-center pt-8", { "display-none": !showLoad })}>
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
      <div className="news-content-mobile">
        <div className="full-width mb-4 mb-xs-2">
          <img
            src="https://assets.website-files.com/5ef63ffdc7baa16a250ac6b0/5f0c9f0906b0a93d4517e557_newsandpress1.png"
            alt=""
            className="full-image"
          />
        </div>
        <div className="container-slim mb-md-8 mb-xs-6">
          <p className="eyebrow-small text-steel mb-1">12.10.2019</p>
          <p className="normal-text">Midway approved to develop downtown Midland hotel</p>
        </div>
        <div className="full-width mb-4 mb-xs-2">
          <img
            src="https://assets.website-files.com/5ef63ffdc7baa16a250ac6b0/5f0c9f097ce44a18fcf5bc32_newsandpress2.png"
            alt="" className="full-image"
          />
        </div>
        <div className="container-slim mb-md-8 mb-xs-6">
          <p className="eyebrow-small text-steel mb-1">10.10.2019</p>
          <p className="normal-text">Check out H-E-B’s new Buffalo Heights grocery store</p>
        </div>
        <div className="h-horizontal-center pt-8 pt-md-4">
          <a href="#" className="btn-text text-navy w-inline-block">
            <div className="row h-vertical-center">
              <div className="btn-circle mr-4">
                <img
                  src="https://assets.website-files.com/5ef63ffdc7baa16a250ac6b0/5f0f3ca167b18bfadd99edd8_ico-plus.svg"
                  alt=""
                />
              </div>
              <p>load more</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Tab;