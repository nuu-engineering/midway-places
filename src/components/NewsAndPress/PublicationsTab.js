import React from 'react';
import classnames from 'classnames';
import { t as typy } from 'typy';
import PubsList from './PubsList';
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

      <PubsList
        datalist={magazines}
        setSelected={setSelected}
        className='publications'
      />

      <PubsList
        datalist={reports}
        setSelected={setSelected}
        className='annual-reports'
      />
    </>
  );
};

export default Tab;