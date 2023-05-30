import React, { useEffect, useState } from "react";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "../../css/styles/keen-slider.css";
import { BASE_URL } from "../../constants";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import NFT from "../UI/NFT";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  async function fetchNewItems() {
    const { data } = await axios.get(`${BASE_URL + `newItems`}`);
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
    <section
      id="section-items"
      className="no-bottom"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
                data-aos="fade-in"
                data-aos-duration="1200"
                data-aos-delay="200"
                data-aos-offset="200"
                data-aos-once="true"
              >
                New Items
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            data-aos="fade-in"
            data-aos-duration="1200"
            data-aos-delay="400"
            data-aos-offset="200"
            data-aos-once="true"
            className="navigation-wrapper"
          >
            <div ref={sliderRef} className="keen-slider">
              {newItems.length
                ? newItems.map((nft, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <NFT
                        nftArray={newItems}
                        setNFTArray={setNewItems}
                        currentNFT={nft}
                      />
                    </div>
                  ))
                : new Array(6).fill(0).map((_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <NFT
                        nftArray={null}
                        setNFTArray={null}
                        currentNFT={null}
                      />
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
