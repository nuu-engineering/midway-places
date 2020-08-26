/* global NEWS_LIMIT:false NEWS_BASE_URL:false */
import React from 'react';
import classnames from 'classnames';
import { t as typy } from 'typy';
// import { debounce } from '../utils/debounce';
import { MORE } from '../../assets-urls';
import Instagram from './Instagram';

const Tab = ({ list }) => {
  const [page, setPage] = React.useState(1);
  const showLoad = list.length > page * NEWS_LIMIT;

  return (
    <>
      <div className='news-content'>
        <div className="container-slim-sm display-md-none">
          <div className="w-dyn-list">
            <div role="list" className="row mb-8 w-dyn-items">

              {
                list.map((element, index) => {
                  const date = new Date(typy(element, 'date').safeString);
                  const externalURL = typy(element, 'externalURL').safeString;
                  const image = typy(element, 'image').safeString;
                  const slug = typy(element, 'slug').safeString;
                  const name = typy(element, 'name').safeString;

                  return index < NEWS_LIMIT * page
                    ? (
                      <div role="listitem" className="col-6 container-hover mb-5 w-dyn-item" key={slug}>
                        <a
                          data-w-id="1e3532fe-3ef0-7d45-fef1-571d461e1c41"
                          href={externalURL || `${NEWS_BASE_URL}${slug}`}
                          className="news-link w-inline-block"
                        >
                          <div
                            style={{ backgroundImage: `url('${image}')` }}
                            className="news-image-container">
                          </div>
                          <p className="eyebrow-small text-steel mb-1">{`${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`}</p>
                          <p className="normal-text text-navy">{name}</p>
                        </a>
                      </div>
                    )
                    : null
                })
              }
            </div>
          </div>
          <div className={classnames("h-horizontal-center pt-8", { "display-none": !showLoad })}>
            <div
              className="btn-text text-navy w-inline-block"
              role="button"
              onClick={(ev) => { ev.preventDefault(); setPage(page + 1) }}
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
          {
            list.map((element, index) => (
              index < NEWS_LIMIT * page
              ? (
                <>
                  <div className="full-width mb-4 mb-xs-2">
                    <img
                      src={typy(element, 'image').safeString}
                      alt={typy(element, 'name').safeString}
                      className="full-image"
                    />
                  </div>
                  <div className="container-slim mb-md-8 mb-xs-6">
                    <p className="eyebrow-small text-steel mb-1">{typy(element, 'date').safeString}</p>
                    <p className="normal-text">{typy(element, 'name').safeString}</p>
                  </div>
                </>
              )
              : null
            ))
          }

          <div className={classnames("h-horizontal-center pt-8 pt-md-4", { "display-none": !showLoad })}>
            <div
              className="btn-text text-navy w-inline-block"
              role="button"
              onClick={(ev) => { ev.preventDefault(); setPage(page + 1) }}
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
      </div>
      <Instagram />
    </>
  );
};

export default Tab;