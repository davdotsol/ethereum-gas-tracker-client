# Ethereum Gas Tracker Dashboard
## Overview
The Ethereum Gas Tracker is a robust analytics dashboard designed to display real-time and historical Ethereum gas prices, providing essential insights into transaction costs on the Ethereum network. Hosted and continuously updated, this dashboard aids users and developers in making informed decisions based on current and past market data.

## Features
The dashboard offers comprehensive metrics and analytical tools:

### Basic Statistical Measures
- Average Gas Price: Daily and weekly averages.
- Median Gas Price: Splits the data into two halves, reflecting typical transaction costs.
- Mode Gas Price: Most frequent gas prices, highlighting common transaction costs.
- Minimum and Maximum Gas Price: Observations of the lowest and highest transaction costs over selected periods.

### Trend Analysis
- Time Series Analysis: Observes trends over selected time frames.
- Moving Average and Exponential Smoothing: Smoothens price fluctuations to underline trend directions.

### Volatility Measures
- Standard Deviation and Variance: Indicates the volatility and dispersion of gas prices.

### Predictive Analytics
- Forecasting Models: Utilizes ARIMA, LSTM, and linear regression to predict future prices.
- Anomaly Detection: Identifies significant deviations in gas prices, signaling unusual market conditions.

### Correlation Analysis
- Transaction Volume and Network Activity Correlations: Analyzes the impact of network activities on gas prices.

### Aggregative Metrics
- Percentiles and Daily Changes: Provides deeper insights into price distribution and day-to-day volatility.

### Advanced Predictive Analytics
- Neural Network Predictions: Leverages TensorFlow.js for predicting future gas prices using historical data.
- Time Series Forecasting: Utilizes advanced neural networks like LSTM or GRU for accurate future price predictions.

## Technical Stack
- Frontend: React.js, Next.js
- Backend: Node.js, Express.js
- Database: MongoDB
- APIs: Ethereum Blockchain data
- Deployment: Vercel

## Live Application
Access the live Ethereum Gas Tracker Dashboard here: [Ethereum Gas Tracker](https://ethereum-gas-tracker-client.vercel.app/)
