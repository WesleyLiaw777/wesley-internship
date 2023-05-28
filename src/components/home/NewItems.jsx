import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "../../css/styles/keen-slider.css";
import "../../css/styles/skeleton.css";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  async function fetchNewItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewItems((prevItems) => {
        return prevItems.map((nft) => ({
          ...nft,
          timeRemaining: timeLeft(nft.expiryDate),
        }));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [newItems]);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 10,
    },
    loop: true,
    breakpoints: {
      "(max-width: 1200px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(max-width: 576px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
  });

  function timeLeft(expiryDate) {
    let millis = expiryDate - Date.now();
    if (millis === 0) {
      return `EXPIRED`;
    }
    const seconds = Math.floor(millis / 1000);
    const secondsText = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    const minutesText = minutes % 60;
    const hoursText = Math.floor(minutes / 60);
    return `${hoursText}h ${minutesText}m ${secondsText}s`;
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {newItems.length
                ? newItems.map((nft, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img
                              className="lazy"
                              src={nft.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {nft.expiryDate && (
                          <div className="de_countdown">
                            {nft.timeRemaining}
                          </div>
                        )}

                        <div className="nft__item_wrap">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <h4>{nft.title}</h4>
                          </Link>
                          <div className="nft__item_price">{nft.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{nft.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : new Array(6).fill(0).map((_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft_coll new-items__container--skeleton">
                        <div className="skeleton new-items__skeleton-bg"></div>
                        <div className="nft_coll_pp new-items__profile--skeleton">
                          <div className="skeleton skeleton__profile--image"></div>
                        </div>
                        <div className="nft_coll_info new-items__info--skeleton">
                          <div className="new-items__name-and-id--skeleton">
                            <h4 className="skeleton  new-items__name--skeleton"></h4>
                            <span className="skeleton id-skeleton"></span>
                          </div>

                          <div className="skeleton new-items__likes--skeleton"></div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            {instanceRef.current && (
              <>
                <button
                  className="arrow__button arrow__button--left"
                  onClick={() => instanceRef.current?.prev()}
                >
                  <RiArrowLeftSLine className="arrow__icon" />
                </button>

                <button
                  className="arrow__button arrow__button--right"
                  onClick={() => instanceRef.current?.next()}
                >
                  <RiArrowRightSLine className="arrow__icon" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
