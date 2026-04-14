#  Playwright E-Commerce Test Automation

![Playwright](https://img.shields.io/badge/Playwright-Test_Automation-green?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Status](https://img.shields.io/badge/Tests-Passing-brightgreen)

---

##  Project Overview

This project contains **end-to-end automated tests** for an e-commerce application using **Playwright with TypeScript**.

It follows **Page Object Model (POM)** design for better maintainability and scalability.

---

##  Tech Stack

*  Playwright
*  TypeScript
*  Node.js

---

##  Project Structure

```bash
pages/          # Page Object Models
tests/          # Test files
playwright.config.ts
package.json
README.md
```

---

##  Setup Instructions

###  Clone the repository

```bash
git clone https://github.com/<shashikanthQA>/playwright-ecommerce-tests.git
cd playwright-tests
```

###  Install dependencies

```bash
npm install
```

###  Install Playwright browsers

```bash
npx playwright install
```

---

##  Run Tests

```bash
npx playwright test
```

---

##  View HTML Report

```bash
npx playwright show-report
```

---

##  Test Coverage

###  Product Listing

* Search product
* Filter by category
* Sort products (Low → High)

###  Product Details

* Validate product info
* Add to cart enabled/disabled

###  Cart

* Add product
* Update quantity
* Remove item

###  Checkout

* Form validation (empty, invalid email, invalid zip)

###  Order Flow

* Complete end-to-end purchase

---

##  Best Practices Used

*  Page Object Model (POM)
*  Reusable methods
*  Proper waits (no unnecessary timeouts)
*  Clean assertions using Playwright expect

---

##  Author

**Shashikanth**

---

##  How to Run (Quick)

```bash
npm install && npx playwright install && npx playwright test
```
