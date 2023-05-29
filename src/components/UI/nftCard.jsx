/*
Accepts prop that lets it know whether to a return a skeleton card or a real card (in which case it will be populated).
Countdown code will be here for the sake of ease of access. It's not used anywhere else.
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/styles/skeleton.css";

export default function NftCard({ nftArray, setNFTArray, currentNFT, loading }) {
  const [countdownTimer, setCountdownTimer] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setNFTArray((prevItems) => {
        return prevItems.map((nft) => ({
          ...nft,
          timeRemaining: timeLeft(nft.expiryDate),
        }));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [nftArray]);

  useEffect(() => {
    if (currentNFT && currentNFT.timeRemaining ) {
      setCountdownTimer(true);
    }
  }, [currentNFT]);
  
  useEffect(() => {
    if (loading) {
      setCountdownTimer(false)
    }
  }, [loading])

  function timeLeft(expiryDate) {
    if (!expiryDate) {
      return `NO EXPIRY`;
    }
    let millis = expiryDate - Date.now();
    if (millis <= 0) {
      return `EXPIRED`;
    }
    const seconds = Math.floor(millis / 1000);
    const secondsText = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    const minutesText = minutes % 60;
    const hoursText = Math.floor(minutes / 60);
    return `${hoursText}h ${minutesText}m ${secondsText}s`;
  }

  return currentNFT && !loading && countdownTimer ? (
    <div className="explore-nft__item">
      <div className="author_list_pp">
        <Link to={`/author/${currentNFT.authorId}`}>
          <img className="lazy" src={currentNFT.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {currentNFT.expiryDate && (
        <div className="de_countdown">{currentNFT.timeRemaining}</div>
      )}

      <div className="nft__item_wrap">
        <Link to={`/item-details/${currentNFT.nftId}`}>
          <img
            src={currentNFT.nftImage}
            className="lazy explore-nft__item_preview"
            alt=""
          />
        </Link>
      </div>
      <div className="explore-nft__item_info">
        <Link to={`/item-details/${currentNFT.nftId}`}>
          <h4>{currentNFT.title}</h4>
        </Link>
        <div className="nft__item_price">{currentNFT.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{currentNFT.likes}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="nft_coll explore__container--skeleton">
      <div className="skeleton new-items__skeleton-bg"></div>
      <div className="nft_coll_pp new-items__profile--skeleton">
      </div>
      <div className="nft_coll_info new-items__info--skeleton">
        <div className="new-items__name-and-id--skeleton">
          <h4 className="skeleton new-items__name--skeleton"></h4>
          <span className="skeleton id-skeleton"></span>
        </div>

        <div className="skeleton new-items__likes--skeleton"></div>
      </div>
    </div>
  );
}
