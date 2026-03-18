import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const coins = cryptosList?.data?.coins || [];

    const filteredCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredCoins);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto" style={{ marginBottom: 24 }}>
          <Input
            placeholder="Search Cryptocurrency"
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row
        gutter={[24, 24]}
        className="crypto-card-container"
        justify="center"
      >
        {cryptos.map((currency) => (
          <Col
            key={currency.uuid}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={4}
            className="crypto-card"
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                hoverable
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt={currency.name}
                    style={{ width: 30 }}
                  />
                }
                style={{ height: '100%' }}
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
