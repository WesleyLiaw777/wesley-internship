import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";

const NFT_URL = BASE_URL + `itemDetails?nftId=`;
const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const [nft, setNft] = useState([]);
  async function getNft() {
    const { data } = await axios.get(`${NFT_URL + id}`);
    setNft(data);
  }
  useEffect(() => {
    getNft();
  }, []);

  return nft ? (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {nft.title} #{nft.tag}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.likes}
                    </div>
                  </div>
                  <p>{nft.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.ownerId}`}>
                            <img className="lazy" src={nft.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.creatorId}`}>
                            <img
                              className="lazy"
                              src={nft.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nft.creatorId}`}>{nft.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nft.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row item__row--skeleton">
              <div className="col-md-6 text-center skeleton item__skeleton"></div>
              <div className="col-md-6 item__info--skeleton">
                <div className="item_info">
                  <h2 className="skeleton item__title--skeleton"></h2>

                  <div className="item_info_counts">
                    <div className="item_info_views skeleton item__views--skeleton" />
                    <div className="item_info_like skeleton item__likes--skeleton" />
                  </div>
                  <p className="skeleton item__description--skeleton" />
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6></h6>
                      <div className="item_author item__person--skeleton">
                        <div className="author_list_pp skeleton item__profile--skeleton"></div>
                        <div className="author_list_info skeleton item__name--skeleton"></div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6></h6>
                      <div className="item_author item__person--skeleton">
                        <div className="author_list_pp skeleton item__profile--skeleton"></div>
                        <div className="author_list_info skeleton item__name--skeleton"></div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
