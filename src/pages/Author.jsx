import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { BASE_URL } from "../constants";
import axios from "axios";
import NftCard from "../components/UI/nftCard";
import "../css/styles/nftCard.css";
import "../css/styles/skeleton.css";

const AUTHOR_URL = BASE_URL + `authors?author=`;
const Author = () => {
  const [author, setAuthor] = useState([]);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  async function getAuthor() {
    const { data } = await axios.get(`${AUTHOR_URL + id}`);
    setAuthor(data);
    setLoading(false);
  }
  useEffect(() => {
    getAuthor();
  }, []);

  useEffect(() => {
    setCollection(author.nftCollection);
  }, [author]);

  const [showFollow, setShowFollow] = useState(true);
  const follow = () => {
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      followers: prevAuthor.followers + 1,
    }));
    setShowFollow(false);
  };
  const unfollow = () => {
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      followers: prevAuthor.followers - 1,
    }));
    setShowFollow(true);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading ? (
          <>
            <section className="author__user--skeleton-container">
              <div className="author__all-info--skeleton-container">
                <div className="skeleton author__profile--skeleton"></div>
                <div className="author__info--skeleton">
                  <div className="skeleton author__name--skeleton"></div>
                  <div className="skeleton author__handle--skeleton"></div>
                  <div className="skeleton author__wallet--skeleton"></div>
                </div>
              </div>

              <div className="skeleton author__follow--skeleton-container"></div>
            </section>

            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {new Array(8).fill(0).map((_, id) => (
                              <NftCard
                                key={id}
                                currentNFT={null}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              //display their first NFT as BG
              style={{
                background: `url(${author.nftCollection[0].nftImage}) top`,
              }}
            ></section>

            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                          {showFollow ? (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={() => follow()}
                            >
                              Follow
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={() => unfollow()}
                            >
                              Unfollow
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {collection.map((nft, id) => (
                              <NftCard
                                key={id}
                                nftArray={collection}
                                setNFTArray={setCollection}
                                currentNFT={nft}
                                defaultImage={author.authorImage}
                                defaultId={author.authorId}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Author;
