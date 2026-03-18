import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching || !globalStats) return <Loader />;

  return (
    <>
      {/* Global Stats */}
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <Statistic
            title="Total Market Cap"
            value={`$${millify(globalStats.totalMarketCap)}`}
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <Statistic
            title="Total 24h Volume"
            value={`$${millify(globalStats.total24hVolume)}`}
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>

      {/* Top Cryptos */}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptos In The World
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>

      <Cryptocurrencies simplified />

      {/* News */}
      {/* <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div> */}
    </>
  );
};

export default Homepage;
