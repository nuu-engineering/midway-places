/* global INSTAGRAM_LIMIT:false INSTAGRAM_HASHTAG:false */
import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { MORE, INSTAGRAM_ICON } from '../../assets-urls';

const Instagram = () => {
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    axios.get(`https://www.instagram.com/explore/tags/${INSTAGRAM_HASHTAG}/?__a=1`)
      .then(response => {
        console.log(response);
        const imagesData = response.data.graphql.hashtag.edge_hashtag_to_media.edges 
        const imagesList = imagesData.map(item => ({
          id: item.node.id,
          src: item.node.thumbnail_src,
          url: `https://www.instagram.com/p/${item.node.shortcode}`
        }));
        setImages(imagesList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const showLoad = images.length > page * INSTAGRAM_LIMIT;

  return (
    <div className="instagram">
      <div className="container-slim v-horizontal-center fade-in" style={{ opacity: 1 }}>
        <img
          src={INSTAGRAM_ICON}
          alt=""
          className="mb-4"
        />
        <h3 className="h3 mb-10">#midwayplaces</h3>
        <div className="gallery-grid">
          {
            images.map((image, index) => (
              index < INSTAGRAM_LIMIT * page
                ? (
                  <a href={image.url} target="_blank" key={image.id} rel="noopener noreferrer">
                    <div
                      className="gallery-item"
                      style={{ backgroundImage: `url("${image.src}")` }}
                    />
                  </a>
                )
                : null
            ))
          }
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
    </div>
  );
}

export default Instagram;