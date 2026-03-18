import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

/* ✅ REQUIRED for Chart.js v3+ */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const history = coinHistory?.data?.history || [];

  const coinPrice = history.map((item) => item.price);
  const coinTimestamp = history.map((item) =>
    new Date(item.timestamp * 1000).toLocaleDateString()
  );

  const data = {
    labels: [...coinTimestamp].reverse(),
    datasets: [
      {
        label: 'Price in USD',
        data: [...coinPrice].reverse(),
        borderColor: '#1677ff',
        backgroundColor: 'rgba(22,119,255,0.15)',
        tension: 0.35,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <>
      {/* Header */}
      <Row
        className="chart-header"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>

        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>

      {/* Responsive chart container */}
      <div
        style={{
          width: '100%',
          height: 'min(420px, 60vw)',
        }}
      >
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
