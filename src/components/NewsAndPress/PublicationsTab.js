import React from 'react';
import classnames from 'classnames';
import { t as typy } from 'typy';
import range from '../../utils/range';

const Tab = ({ reports, magazines }) => {
  const LIMIT = 7;
  const [pageMag, setPageMag] = React.useState(1);
  const [magazinesFiltered, setMagazinesFiltered] = React.useState([]);
  const [pageRep, setPageRep] = React.useState(1);
  const [reportsFiltered, setReportsFiltered] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    const temp = magazines.filter((m, index) => index >= LIMIT * (pageMag - 1) && index < LIMIT * pageMag);
    setMagazinesFiltered(temp);
  }, [magazines, pageMag]);
  React.useEffect(() => {
    const temp = reports.filter((r, index) => index >= LIMIT * (pageRep - 1) && index < LIMIT * pageRep);
    setReportsFiltered(temp);
  }, [reports, pageRep]);


  const [firstMag, ...restMags] = magazinesFiltered;
  const pageMagMax = Math.ceil(magazines.length / LIMIT);
  const magazinePages = range(1, pageMagMax);

  const [firstRep, ...restReps] = reportsFiltered;
  const pageRepMax = Math.ceil(reports.length / LIMIT);
  const reportsPages = range(1, pageRepMax);

  return (
    <>
      <div className={classnames('iframe-portal', { show: selected })}>
        <div className='iframe-overlay cursor-pointer' onClick={() => setSelected(null)}></div>
        <div className='iframe-wrapper'>
          <iframe src={selected}></iframe>
        </div>
      </div>

      <div className="publications">
        <div className="container-slim">
          <h3 className="h3 mb-7">District Magazine</h3>
          <div className="row">
            <div className="col-5 col-padding-0 col-md-12 mb-md-8 cursor-pointer" onClick={() => setSelected(firstMag.url)}>
              <img
                src={typy(firstMag, 'image').safeString}
                alt={typy(firstMag, 'name').safeString}
              />
              <p>{typy(firstMag, 'name').safeString.replace(typy(firstMag, 'year').safeNumber, '')}</p>
              <p className="eyebrow-small text-steel">{typy(firstMag, 'year').safeNumber}</p>
            </div>

            <div className="col-6 ml-auto col-padding-0 v-vertical-space-between display-md-none">
              <div className="row">
                {
                  restMags.map((element) => (
                    <div className="col-4 mb-5" onClick={() => setSelected(element.url)}>
                      <img
                        src={typy(element, 'image').safeString}
                        alt={typy(element, 'name').safeString}
                      />
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
                    disabled={pageMag - 1 <= 0}
                    onClick={() => { if (pageMag - 1 > 0) setPageMag(pageMag - 1); }}
                  >
                    <div className="w-embed">
                      <svg width="20" height="14" viewBox="0 0 35 14" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path transform="translate(8, 0)" d="M0 7H19M19 7L14 1M19 7L14 13" stroke="#073263"></path>
                      </svg></div>
                  </div>
                  <div className="h-vertical-center">
                    {
                      magazinePages.map((page) => (
                        <p 
                          className={classnames(
                            "eyebrow mr-4", { 
                              "text-steel": pageMag !== page + 1,
                              "weight-bold": pageMag === page + 1,
                              "text-orange": pageMag === page + 1,
                            },
                            "cursor-pointer"
                          )}
                          onClick={() => setPageMag(page + 1)}
                        >
                          {page + 1}
                        </p>
                      ))
                    }
                  </div>
                  <div
                    className="btn-circle btn-small w-inline-block cursor-pointer"
                    role="button"
                    disabled={pageMag + 1 >= pageMagMax}
                    onClick={() => { if (pageMag < pageMagMax) setPageMag(pageMag + 1); }}
                  >
                    <div className="w-embed">
                      <svg
                        width="20"
                        height="14"
                        viewBox="0 0 35 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                  magazines.map((mag) => (
                    <div className="publication-card">
                      <img
                        src={typy(mag, 'image').safeString}
                        alt={typy(mag, 'name').safeString}
                      />
                      <p>{typy(mag, 'name').safeString.replace(typy(mag, 'year').safeNumber, '')}</p>
                      <p className="eyebrow-small text-steel">{typy(mag, 'year').safeNumber}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className="annual-reports">
        <div className="container-slim">
          <h3 className="h3 mb-7">Midway Annual Report</h3>
          <div className="row">
            <div className="col-5 col-padding-0 col-md-12 mb-md-8 cursor-pointer" onClick={() => setSelected(firstMag.url)}>
              <img
                src={typy(firstRep, 'image').safeString}
                alt={typy(firstRep, 'name').safeString}
              />
              <p>{typy(firstRep, 'name').safeString.replace(typy(firstRep, 'year').safeNumber, '')}</p>
              <p className="eyebrow-small text-steel">{typy(firstRep, 'year').safeNumber}</p>
            </div>
            <div className="col-6 ml-auto col-padding-0 v-vertical-space-between display-md-none">
              <div className="row">
                {
                  restReps.map((element) => (
                    <div className="col-4 mb-5" onClick={() => setSelected(element.url)}>
                      <img
                        src={typy(element, 'image').safeString}
                        alt={typy(element, 'name').safeString}
                      />
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
                    disabled={pageRep - 1 <= 0}
                    onClick={() => { if (pageRep - 1 > 0) setPageRep(pageRep - 1); }}
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
                      reportsPages.map((page) => (
                        <p
                          className={classnames(
                            "eyebrow mr-4", { 
                              "text-steel": pageRep !== page + 1,
                              "weight-bold": pageRep === page + 1,
                              "text-orange": pageRep === page + 1,
                            },
                            "cursor-pointer"
                          )}
                          onClick={() => setPageRep(page + 1)}
                        >
                          {page + 1}
                        </p>
                      ))
                    }
                  </div>
                  <div
                    className="btn-circle btn-small w-inline-block cursor-pointer"
                    role="button"
                    disabled={pageRep + 1 >= pageRepMax}
                    onClick={() => { if (pageRep < pageRepMax) setPageRep(pageRep + 1); }}
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
                  reports.map((element) => (
                    <div className="publication-card">
                      <img
                        src={typy(element, 'image').safeString}
                        alt={typy(element, 'name').safeString}
                      />
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
    </>
  );
};

export default Tab;