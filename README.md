# Justify API

## Objective
This project implements and deploys a REST API that justifies a given text. Justification refers to adjusting the spacing between words in a text to ensure that the text aligns perfectly on both the left and right sides.
## Features
- **Text Justification**: Justifies a given text to have a specified line length.
- **Dynamic Line Length**: Allows users to specify the desired line length as a parameter in the request.
- **Token-Based Authentication**: Secures endpoints with JWT authentication.
- **Rate Limiting**: Implements a daily limit of 80,000 words per token.
- **Error Handling**: Returns a `402 Payment Required` error if the word limit is exceeded.
- **API Documentation**: Utilizes Swagger UI for comprehensive API documentation.
- **MongoDB Integration**: MongoDB Atlas is used to store the user's email, daily word limit, and usage tracking.
- 
## Prerequisites
- **Node.js**: v20.15.1 or higher
- **npm**
- **TypeScript**
- **MongoDB Atlas**
- **Swagger-ui-express**: v5.0.1 
  
- ## Rate Limiting Logic
- **Daily Word Limit**: Each user can justify up to **80,000 words per day**.
- **Word Count Calculation**: The number of words in each request is calculated and deducted from the user's daily limit.
- **Date Check**: If the current date is different from the last justification date, the word limit resets to **80,000 words**.
- **Error on Exceeding Limit**: If the user exceeds their daily word limit, the system returns a **402 Payment Required** error.
- **Token Association**: The word limit is associated with the user's email, which is tied to the token they use for authentication.

## Deployment
The application is deployed on a public server. Access it [Justify Text API Documentation (Swagger)](https://justifytextapi.onrender.com/api-docs/)
