import React from 'react';
import classnames from 'classnames';
import PubsList from './PubsList';

const Tab = ({ reports, magazines }) => {
  const [selected, setSelected] = React.useState(null);

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