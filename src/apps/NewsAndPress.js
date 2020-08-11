/* global CURRENT_SECTION:false publications_reports:false publications_magazine:false */
import React from 'react';
import classnames from 'classnames';
import { t as typy } from 'typy';
import Portal from '../utils/Portal';
import { NNP_NEWS, NNP_STOR, NNP_AWRD, NNP_PUBS } from '../constants';
import {
  NewsTab, PublicationsTab,
  StoriesTab, AwardsTab,
} from '../components/NewsAndPress';
import '../css/NewsAndPress.css';

function App() {
  const [section, setSection] = React.useState(CURRENT_SECTION);
  let children = null;
  switch (section) {
    case NNP_NEWS:
      children = null;
      break;
    case NNP_PUBS:
      children = <PublicationsTab reports={publications_reports} magazines={publications_magazine} />;
      break;
    case NNP_STOR:
      children = null;
      break;
    case NNP_AWRD:
      children = null;
      break;
    default:
      children = null;
      break;
  }
  return (
    <>
      {/* <Portal id='react-news-and-press-tabs' className='news-tabs'>
        <>
          <div className="mr-4">
            <a href="/news/news-press" className="tab-link-news">News &amp; Press</a>
            <div className={classnames("hr-full-1px", { "bg-orange": section === NNP_NEWS })}></div>
          </div>
          <div className="mr-4">
            <a href="/news/publications" aria-current="page" className="tab-link-news w--current">Publications</a>
            <div className={classnames("hr-full-1px", { "bg-orange": section === NNP_PUBS })}></div>
          </div>
          <div className="mr-4">
            <a href="/news/stories" className="tab-link-news">Stories</a>
            <div className={classnames("hr-full-1px", { "bg-orange": section === NNP_STOR })}></div>
          </div>
          <div>
            <a href="/news/awards" className="tab-link-news">Awards</a>
            <div className={classnames("hr-full-1px", { "bg-orange": section === NNP_AWRD })}></div>
          </div>
        </>
      </Portal> */}
      { children }
    </>
  );
}

export default App;
