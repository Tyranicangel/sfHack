##Introduction
Node, Express, Angular, MongoDB, Mongoose and Bootstrap 4.<br/>
Front folder consists of angular(Front end).<br/>
Back folder consists of express(Back end).<br/>
Front-end runs on port 4200.<br/>
Back-end runs of port 3000.<br/>
The proxy of angular cli is redirected to 3000 in proxy.config.json.<br/>
The aws-sdk config is location in aws.config.json.<br/>
You need to create the aws.config.json file in the back folder under the format {"accessKeyId":"Your Key","secretAccessKey":"Secret Key","region": "Region"}<br/>
The MongoDB config is under config.js file.<br/>
You need to create edit this file located in back folder<br/>
Please refer to the documentation of angular/cli and nodemon for further details about development environment.<br/>

##Instructions
Install node and npm<br/>
Install nodemon and @angular/cli globally via npm<br/>
Go to front folder and npm install<br/>
Go to back folder and npm install<br/>
Download bootstrap-4<br/>
Manually copy bootstrap-flex*.*.css manually into node_modules/bootstrap/dist/css<br/>
(I dont know why but flex does not install automatically)<br/>
(I have provided the bootstrap flex files in the front folder too)<br/>
Run npm start in front folder<br/>
Run nodemon/npm start in back folder<br/>