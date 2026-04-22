# Hackathon

- AI-Assisted Rapid Web App Development

## Topic: Stock Watchlist / Portfolio Web App

In this in-class task, you will use AI tools to rapidly build a usable web app about stocks.

Examples of AI tools include ChatGPT, Gemini, Claude, Copilot, Codex, and similar tools. You may use any AI tools you want.

The goal of this task is to see how much you can accomplish in class by combining your own web development skills with AI-assisted coding, debugging, design, and problem solving.

Your app must use **live stock data from a real external web service**.

## Getting Started

To initialize your GitHub repository for this Hackathon, first accept the GitHub Classroom assignment here:

<https://classroom.github.com/a/SI3SuuUn>

After accepting the assignment, GitHub Classroom will create your repository. You should use that repository for your Hackathon project.

## Main Goal

Build a web app that allows a user to:

- view live stock prices
- search or select stocks
- create and manage a personal watchlist or portfolio

This does **not** need to be a full commercial product. The goal is to create a working and usable prototype in class.

## Stock Data Requirement

Your app must use live data from a real stock data web service or API.

- You may choose **any** stock data service
- You are responsible for finding and integrating the service
- The data must be fetched from an external source during app usage
- You may not use only hard-coded local stock data

As one possible starting point, you may explore public API collections such as:

- <https://github.com/public-apis/public-apis>

You are **not limited** to that repository. You may use any real stock data service that works for your app.

## Required Features

Your app must include the following features.

### 1. Live Stock Data

The app must fetch live stock information from a real external service.

### 2. Stock Search or Selection

The user must be able to choose one or more stocks.

Examples:

- search by ticker symbol
- choose from a preset list
- click a stock from a watchlist

### 3. Current Stock Information

The app must display useful current stock information.

Examples:

- ticker symbol
- company name
- current price
- price change
- percent change
- last updated time

### 4. Watchlist or Portfolio

The user must be able to create a personal stock list.

You may implement either:

- a **watchlist**, where the user saves stocks to monitor

or

- a **portfolio**, where the user stores stocks plus additional information such as number of shares or buy price

### 5. Usable Interface

The app should be clear and usable.

It does not need to be perfect, but the layout should make sense and the main features should be easy to find and use.

### 6. Must Use the Vue Family

Your app must be built using the **Vue family**.

At minimum, your project should use:

- **Vue**
- **Vue Router**
- **Pinia**

You may also use other Vue-related tools or libraries if needed, such as Vuetify or other packages in the Vue ecosystem.

## AI Usage

You are encouraged to use AI tools heavily during this task.

You may use AI tools for:

- planning
- code generation
- debugging
- styling
- API integration
- refactoring
- improving UI design

However, you are still responsible for:

- understanding your code
- testing your app
- fixing errors
- making the final product work

## Deployment Requirement

Your final app must be deployed to **GitHub Pages**.

Make sure your deployed app is accessible by URL and works correctly in the browser.

If your app has deployment limitations due to API restrictions, CORS issues, or API key concerns, explain them clearly in your development note. However, you should still make a strong effort to produce a working deployed version.

## Rules

- You must use the **Vue family** to create your project, such as **Vue.js**, **Vue Router**, **Pinia**, and other related Vue tools if needed.
- You may use any AI tools.
- You may use any real stock data web service.
- Your app must be a web app.
- Your final app must be deployed to GitHub Pages.
- The work should be completed during class time.

## Deliverables

Submit the following:

### 1. Source Code

Push your full project code to GitHub.

### 2. GitHub Repository and GitHub Pages Link

Submit both of the following to Blackboard:

- the link to your GitHub repository
- the working deployed link to your app on GitHub Pages

### 3. Short Development Note

Include a short note that lists:

- which AI tools you used
- which stock data service or API you used
- which features are working
- which features are incomplete
- any deployment limitations or API issues you encountered

## Judging Criteria

Projects will be judged mainly based on the following:

### 1. Functionality

Does the app work and fetch live stock data correctly?

### 2. Completion

How much of the required functionality is finished?

### 3. Usability

Is the app reasonably clear and usable?

### 4. Technical Integration

Did you successfully connect to and use a real external stock data service?

### 5. Effective AI-Assisted Development

Did you use AI tools effectively to build a usable app quickly?

### 6. Proper Use of the Vue Ecosystem

Did you correctly use Vue, Vue Router, and Pinia in the project design?

## Notes

- Some APIs may require an API key
- Some APIs may have rate limits
- Some APIs may be harder to use in browser-only apps
- Some APIs may fail, so be ready to adapt
- Part of this task is solving real integration problems with the help of AI tools

## Summary

By the end of class, your app should:

- fetch live stock data
- allow users to view one or more stocks
- include a watchlist or simple portfolio
- use the Vue family, including Vue, Vue Router, and Pinia
- be deployed to GitHub Pages
- demonstrate how well you can build a usable app with AI-assisted rapid development
