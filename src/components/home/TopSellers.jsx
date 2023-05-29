import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/styles/skeleton.css";
import { BASE_URL } from "../../constants";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  async function getTopSellers() {
    const { data } = await axios.get(
      `${BASE_URL + `topSellers`}`
    );
    
    setTopSellers(data);
  }

  useEffect(() => {
    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers.length
                ? topSellers.map((seller, id) => (
                    <li key={id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className="skeleton top-sellers__profile--skeleton"></div>
                        <i className="fa fa-check top-sellers__check--skeleton"></i>
                      </div>
                      <div className="author_list_info">
                        <span className="skeleton top-sellers__name--skeleton"></span>
                        <span className="skeleton top-sellers__price--skeleton"></span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
