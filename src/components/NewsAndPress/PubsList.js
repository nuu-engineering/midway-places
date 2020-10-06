/* global PUBLICATIONS_LIMIT:false */
import React from 'react';
import classnames from 'classnames';
import { t as typy } from 'typy';
import range from '../../utils/range';

const List = ({ title, datalist = [], className, setSelected }) => {
  const [page, setPage] = React.useState(1);
  const [firstElement, setFirstElement] = React.useState([]);
  const [currentList, setCurrentList] = React.useState([]);

  React.useEffect(() => {
    const [first, ...rest] = datalist;
    const temp = rest.filter((r, index) => index >= PUBLICATIONS_LIMIT * (page - 1) && index < PUBLICATIONS_LIMIT * page);
    setFirstElement(first);
    setCurrentList(temp);
  }, [datalist, page]);

  const pageMax = Math.ceil((datalist.length - 1) / PUBLICATIONS_LIMIT);
  const dataPages = range(1, pageMax);

  return (
    <div className={className}>
      <div className="container-slim">
        <h3 className="h3 mb-7">{title}</h3>
        <div className="row">
          <div className="col-5 col-padding-0 col-md-12 mb-md-8 cursor-pointer" onClick={() => setSelected(firstElement.url)}>
            <img
              src={typy(firstElement, 'image').safeString}
              alt={typy(firstElement, 'name').safeString}
            />
            <p>{typy(firstElement, 'name').safeString.replace(typy(firstElement, 'year').safeNumber, '')}</p>
            <p className="eyebrow-small text-steel">{typy(firstElement, 'year').safeNumber}</p>
          </div>
          <div className="col-6 ml-auto col-padding-0 v-vertical-space-between display-md-none">
            <div className="row">
              {
                currentList.map((element) => (
                  <div
                    className="col-4 mb-5 cursor-pointer"
                    onClick={() => setSelected(element.url)}
                    key={typy(element, 'slug').safeString}
                  >
                    <div className='publication-img' style={{ backgroundImage: `url("${typy(element, 'image').safeString}")`}} />
                    <p>{typy(element, 'name').safeString.replace(typy(element, 'year').safeNumber, '')}</p>
                    <p className="eyebrow-small text-steel">{typy(element, 'year').safeNumber}</p>
                  </div>
                ))
              }
            </div>
            <div className="col-12">
              <div className="row h-horizontal-space-between">
                <div
                  className="btn-circle btn-small rotate w-inline-block cursor-pointer"
                  role="button"
                  disabled={page - 1 <= 0}
                  onClick={() => { if (page - 1 > 0) setPage(page - 1); }}
                >
                  <div className="w-embed">
                    <svg width="20" height="14" viewBox="0 0 35 14" fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path transform="translate(8, 0)" d="M0 7H19M19 7L14 1M19 7L14 13" stroke="#073263"></path>
                    </svg>
                  </div>
                </div>
                <div className="h-vertical-center">
                  {
                    dataPages.map((pageCurrent) => (
                      <p
                        key={pageCurrent}
                        className={classnames(
                          "eyebrow mr-4", { 
                            "text-steel": pageCurrent !== page - 1,
                            "weight-bold": pageCurrent === page - 1,
                            "text-orange": pageCurrent === page - 1,
                          },
                          "cursor-pointer"
                        )}
                        onClick={() => setPage(pageCurrent + 1)}
                      >
                        {pageCurrent + 1}
                      </p>
                    ))
                  }
                </div>
                <div
                  className="btn-circle btn-small w-inline-block cursor-pointer"
                  role="button"
                  disabled={page + 1 >= pageMax}
                  onClick={() => { if (page < pageMax) setPage(page + 1); }}
                >
                  <div className="w-embed">
                    <svg
                      width="20"
                      height="14"
                      viewBox="0 0 35 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path transform="translate(8, 0)" d="M0 7H19M19 7L14 1M19 7L14 13" stroke="#073263"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="publications-md">
            <div className="publications-container">
              {
                currentList.map((element) => (
                  <div
                    className="publication-card"
                    key={typy(element, 'slug').safeString}
                    onClick={() => setSelected(element.url)}
                  >
                    <div className='publication-img' style={{ backgroundImage: `url("${typy(element, 'image').safeString}")`}} />
                    <p>{typy(element, 'name').safeString.replace(typy(element, 'year').safeNumber, '')}</p>
                    <p className="eyebrow-small text-steel">{typy(element, 'year').safeNumber}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;