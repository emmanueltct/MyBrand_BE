[![Node.js CI](https://github.com/emmanueltct/MyBrand_BE/actions/workflows/testing.yml/badge.svg)](https://github.com/emmanueltct/MyBrand_BE/actions/workflows/testing.yml) [![Coverage Status](https://coveralls.io/repos/github/emmanueltct/MyBrand_BE/badge.svg?branch=main)](https://coveralls.io/github/emmanueltct/MyBrand_BE?branch=main)


![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![CircleCI](https://img.shields.io/badge/circle%20ci-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white)
 ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

# MyBrand_BE
 <h2>MyBrand_BE</h2> is a backend part of <a href="https://github.com/emmanueltct/MYBRAND_MUNEZERO"> <b>MYBRAND_MUNEZERO</b></a> which is apersonnel website + blog help the owner to market himself and interacting with the users through blog comments and contact page

### Technology used in MyBrand-BE

<ul>
    <li><b>Node js</b></li>
    <li><b>Express js</b></li>
    <li><b>Mongo db</b></li>
    <li><b>TypeScript</b></li>
    <li><b>Passport js and jonswebtoken for user authentication</b></li>
</ul>
<b> package management tool</b>
    <ol><li>npm</l></ol>
<b> image upload </b>
    <ol><li>cloudinary image</l></ol>
   
### how to test my project
siince the project backend is implemented with various API end points , to test the project I use Postman as an application for testing API

### All Api endpoints for my project
<b>1. end points for blogs</b>
<ul>
    <li><b>GET /api/blogs</b> : view all blogs (public)</li>
    <li><b>POST /api/blogs</b> : create new blog (authorized access only)</li>
    <li><b>GET /api/blogs/:id </b>: view a single blog (public)</li>
    <li><b>PACTH /api/blogs/:id </b>: to update blog (authorized access only)</li>
    <li><b>DELETE /api/blogs/:id </b> : to delete a single blog (authorized access only)</li>

</ul>

<b>2. end points for blog comments</b>
<ul>
    <li><b>GET /api/blogs</b> : view all blogs (public)</li>
    <li><b>POST /api/blogs:id/comments</b> : create new comment for a single blog (authenticated users)</li>
    <li><b>GET /api/blogs/:id/comments </b> : view all comment for single blog (public)</li>
    <li><b>DELETE /api/comments/:id </b> : to delete a single comment (authorized access only)</li>

</ul>

<b>3. end points for liking a blog</b>
<ul>
    <li><b>POST /api/blogs:id/likes</b> :  for iking or dislike a single blog (authenticated users)</li>
   
</ul>

<b>4. end points for clients contact (querries)</b>
<ul>
    <li><b>GET /api/querries:</b> : view all blogs (authorised access only)</li>
    <li><b>POST /api/querries</b> : for client to send a querry (public)</li>
    <li><b>DELETE /api/querries/:id</b>: to delete a single client querry(authorized access only)</li>

</ul>






