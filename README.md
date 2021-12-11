# Be-Panic-App-Back-End

## Developing the idea

- idea for an e-commerce shop
- brainstorm types of products
- decided on panic buying shop
- wire-frame design to get idea of all desired features
- set up kanban for initial steps to get the process of the ground and sharing tasks
- kanban as source for links to resources used for the project: step by step files, links to repos (front + back end repos), wire-frame project, postman api collection.

## Feature list

Home:

- products listed with stock count and running out if < 10 in count
- register / login
- search bar for products - have search bar appear on all pages
- register page
- login page: users can only checkout if logged in
- store address details in db, but NOT PAYMENT DETAILS. In real world would be payment API.

Product page:

- products listed out
- ability to select by type of product
- filter by price, brand, customer review
- search
- gif in background?
- if search not found send to 404 page

Single product page:

- main image
- pull out data from api
- show if in stock
- add to basket
- animation to show added to basket
- show prod reviews
- admin consol for adding/updating/removing products

Basket summary page:

- list items added to the basket
- checkout button

Purchase confirmation:

- show that order has been placed
- send confirmation email
- randomly generated order number?

## Nice to have

Address page:

- web-form taking in shipping and billing address
- selection of type of shipping method

Payments page:

- take payment details
- place order button

## Steps to build the back end

- set up files: package.json, dependencies, git repo, gitignore, index.js, .env, .prettierrc,
- create scripts to run db
- set up db, helpers and seed
- test db works
- create model for the data
- create seedData
- create controllers
- add routes to router
- test that api can do crud operations
- add in additional models and crud operations
- repeat process for additional models

## for authentication

- establish
- add middleware for secureRoute

