# nodejs-express-hello-world
bare minimum codes to run nodejs web app  



The same codebase can be used for one of  following deployment:



## 1. Run Manually In A Local Machine

```
## Make sure node,git is installed on the machine
$ node -v
$ git version

## Clone this repo to local machine

## Change directory to src folder
$ cd nodejs-express-hello-world/

## Install app dependency
$ npm install

## Run App
$ node server.js

## If OS firewall is enabled
$ sudo firewall-cmd --permanent --add-port=8080/tcp
$ sudo firewall-cmd --reload

## Test if the server is running
$ curl http://localhost:8080
OR check on browser
```

## 2. Run In A Docker Container

```
## Make sure node,git is installed on a developer machine
$ node -v
$ git version

## Clone this repo to local machine

## Change directory to src folder
$ cd nodejs-express-hello-world/

## Build image
$ docker build -t <your username>/node-web-app:v1 .

## Check the image
$ docker images

## To run in a container
$ docker run -p 80:8080 -d <your username>/node-web-app:v1

## To check the container is running
$ docker ps

## If OS firewall is enabled
$ sudo firewall-cmd --permanent --add-port=80/tcp
$ sudo firewall-cmd --reload

## Test if you can visit the website
$ curl http://localhost:80
OR check on browser http://<ip address>:80/

Ref: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
```

## 3. Run In A Kubernetes Cluster

```
## Make sure node,git is installed on a developer machine
$ node -v
$ git version

## Clone this repo to local machine

## Change directory to src folder
$ cd nodejs-express-hello-world/

## Build image
$ docker build -t <your username>/node-web-app:v1 .

## Check the image
$ docker images

## Login to docker hub (or other registry), 
$ docker login

## Push image to docker hub
$ docker push <your username>/node-web-app:v1

## edit the k8s_deployment.yml file
** change the image name
** change the Service type (type: NodePort | LoadBalancer) 

## apply k8s manifest file
$ kubectl apply -f k8s_deployment.yml

## Test if you can visit the website
##Check on browser 
http://<worker node ip>:<node port> # if NodePort
OR
http://<load balancer ip>:<lb port> # if Load Balancer


```



