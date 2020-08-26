/* global CURRENT_SECTION:false, news_news:false publications_reports:false
    publications_magazine:false NEWS_URL:false PUBLICATIONS_URL:false
    STORIES_URL:false AWARDS_URL:false */
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

  const onChangeSection = (newSection) => {
    setSection(newSection);

    switch (newSection) {
      case NNP_NEWS:
        window.history.pushState(NNP_NEWS, 'News', NEWS_URL);
        break;
      case NNP_PUBS:
        window.history.pushState(NNP_PUBS, 'Publications', PUBLICATIONS_URL);
        break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    window.onpopstate = function(e){
      if (e.state){
        setSection(e.state);
      }
    };
  }, [])

  let children = null;
  switch (section) {
    case NNP_NEWS:
      children = <NewsTab list={news_news} />;
      break;
    case NNP_PUBS:
      children = <PublicationsTab reports={publications_reports} magazines={publications_magazine} />;
      break;
    case NNP_STOR:
      children = <StoriesTab />;
      break;
    case NNP_AWRD:
      children = <AwardsTab />;
      break;
    default:
      children = null;
      break;
  }
  return (
    <>
      <Portal id='react-news-and-press-tabs' className='news-tabs'>
        <>
          <div className="mr-4">
            <div onClick={() => onChangeSection(NNP_NEWS)} className={classnames("tab-link-news", "cursor-pointer", { "w--current": section === NNP_NEWS })}>News &amp; Press</div>
            <div className={classnames("hr-full-1px", { "bg-orange": section === NNP_NEWS })}></div>
          </div>
          <div className="mr-4">
            <div onClick={() => onChangeSection(NNP_PUBS)} className={classnames("tab-link-news", "cursor-pointer", { "w--current": section === NNP_PUBS })}>Publications</div>
            <div className={classnames("hr-full-1px", { "bg-orange": section === NNP_PUBS })}></div>
          </div>
          <div className="mr-4">
            <a href={STORIES_URL} className={classnames("tab-link-news", { "w--current": section === NNP_STOR })}>Stories</a>
            <div className={classnames("hr-full-1px", { "bg-orange": section === NNP_STOR })}></div>
          </div>
          <div>
            <a href={AWARDS_URL} className={classnames("tab-link-news", { "w--current": section === NNP_AWRD })}>Awards</a>
            <div className={classnames("hr-full-1px", { "bg-orange": section === NNP_AWRD })}></div>
          </div>
        </>
      </Portal>
      { children }
    </>
  );
}

export default App;
