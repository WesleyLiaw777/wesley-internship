import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/styles/nftCard.css";
import { BASE_URL } from "../../constants";
import NftCard from "../UI/nftCard";

const FILTER_URL = BASE_URL + `explore?filter=`
let sliceIndex = 8;
const ExploreItems = () => {
  const [collection, setCollection] = useState([]);
  const [slicedColl, setSlicedColl] = useState([]);
  const [loading, setLoading] = useState(false)
  async function getCollection() {
    const { data } = await axios.get(
      `${BASE_URL + `explore`}`
    );
    setCollection(data);
    setSlicedColl(data.slice(0, sliceIndex));
  }
  useEffect(() => {
    getCollection();
  }, []);

  const numNFTS = collection.length;
  const [showMore, setShowMore] = useState(true);

  const loadMore = () => {
    sliceIndex += 4; //shows another four
    setSlicedColl(collection.slice(0, sliceIndex));
    if (sliceIndex >= numNFTS) {
      setShowMore(false);
      return;
    }
  };

  async function fetchFiltered(event) {
    setLoading(true);
    const query = event.target.value; //for others devs' readability
    const {data} = await axios.get(`${FILTER_URL + query} `)
    setCollection(data);
    setSlicedColl(data.slice(0, sliceIndex));
    setLoading(false);
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => fetchFiltered(event)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most Liked</option>
        </select>
      </div>

      <section id="nft-container">
        {slicedColl.map((nft, id) => (
          <NftCard
            key={id}
            nftArray={slicedColl}
            setNFTArray={setSlicedColl}
            currentNFT={nft}
            loading={loading}
          />
        ))}
      </section>
      <div className="col-md-12 text-center">
        {showMore && collection.length > 0 && (
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => loadMore()}
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
