/* global INSTAGRAM_LIMIT:false INSTAGRAM_HASHTAG:false */
import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { MORE, INSTAGRAM_ICON } from '../../assets-urls';

const Instagram = () => {
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const fetchImages = async () => {
      let imagesData = await axios.get(`https://www.instagram.com/explore/tags/${INSTAGRAM_HASHTAG}/?__a=1`);
      return imagesData.data.graphql.hashtag.edge_hashtag_to_media.edges;
       /** For a profile:
       let imagesData = await axios.get('https://www.instagram.com/we_are_midway/?__a=1');
       return imagesData.data.graphql.user.edge_owner_to_timeline_media.edges;
       */
    }
    fetchImages().then(imagesData => {
      const imagesList = imagesData.map(item => ({
        src: item.node.thumbnail_src,
        url: `https://www.instagram.com/p/${item.node.shortcode}`
      }));
      setImages(imagesList);
    });
  }, []);

  const showLoad = images.length > page * INSTAGRAM_LIMIT;

  return (
    <div class="instagram">
      <div class="container-slim v-horizontal-center fade-in" style={{ opacity: 1 }}>
        <img
          src={INSTAGRAM_ICON}
          alt=""
          class="mb-4"
        />
        <h3 class="h3 mb-10">#midwayplaces</h3>
        <div class="gallery-grid">
          {
            images.map((image, index) => (
              index < INSTAGRAM_LIMIT * page
                ? (
                  <a href={image.url} target="_blank">
                    <div
                      class="gallery-item"
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