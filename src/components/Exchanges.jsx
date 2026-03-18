import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/exchangeapi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();

  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  if (!exchangesList || exchangesList.length === 0) {
    return (
      <Text style={{ padding: 20, display: 'block' }}>
        ⚠️ Exchanges data is unavailable.
        <br />
        This endpoint requires a <strong>CoinRanking premium plan</strong>.
      </Text>
    );
  }

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>

      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.uuid}>
            <Collapse>
              <Panel
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                        alt={exchange.name}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>

                    <Col span={6}>
                      ${millify(exchange.volume)}
                    </Col>

                    <Col span={6}>
                      {millify(exchange.numberOfMarkets)}
                    </Col>

                    <Col span={6}>
                      {millify(exchange.marketShare)}%
                    </Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || 'No description available.')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
