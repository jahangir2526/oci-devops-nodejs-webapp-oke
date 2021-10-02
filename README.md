# Overview

This a general and high level guideline to setup a **CI/CD using OCI DevOps** to deploy app on a Kubernetes cluster (**OKE**).

## Steps

### 1. Gather Info

```
OCI Username: <oci-username>	#eg: oracleidentitycloudservice/user01_idcs
OCI Auth Token: <oci-auth-token>	
Tenancy Name: <tenancy-name>	
Tenancy Namespace: <tenancy-namespace>	# object storage namespace, eg: ansh81vru1zp

Region Key: <region-key>	# eg: iad

OCIR Docker Username: 
<tenancy-namespace>/<oci-username> #eg-ansh81vru1zp/oracleidentitycloudservice/user01

OCIR Docker Password: <oci-auth-token>

OCI Code Repo (git) Username: <tenancy-name>/<oci-username> 
OCI Code Repo (git) Password: <oci-auth-token>


```

### 2. Spin up Kubernetes cluster & create registry secret

```
i. Spin up a Kubernetes cluster
ii. Login using cloud shell
iii. Create a registry secret
$ kubectl create secret docker-registry <secret-name> --docker-server=<region-key>.ocir.io --docker-username='<tenancy-namespace>/<oci-username>' --docker-password='<oci-auth-token>' --docker-email='<email-address>'


iv. (If required) Create any other resource (eg: namespace, secret, pv etc) to fullfill app requirements
```

### 3. Create OCIR Repository

```
OCIR Repo Name: # <ocir-repo-name> # eg: project01/mywebapp
OCIR Repo Compartment: <ocir-comp-name>	# :ASEAN/Jahangir/Demo
OCIR Region: <ocir-region> # eg: Singapore
```

### 4. Create Vault, Master Encryption Key, Secret

```
Vault Secret OCID (oci-auth-token): <vault-secret-ocid>
```

### 5. Setup OCI DevOps (CI/CD)
#### a) Create DevOps Project
```
i. Create a notification topic
ii. Create DevOps project
iii. Enable logging
```
#### b) Create/Mirror Repository
```
## Create new repo
i. Create & Clone the empty repo to client machine
ii. Copy application codes
iii. Push to OCI Code Repo

OR

## Mirror Repo
i. Create External Connection (github/gitlab)
ii. Mirror Repository, provide mirror schedule (once/default-30mins/custom)
```
#### c) Get & Edit the build_spec.yml file, make sure the changes are in the repository.

```
## Sample build_spec.yml

version: 0.1
component: build
timeoutInSeconds: 10000
runAs: root
shell: bash
env:
  exportedVariables:
    - BUILDRUN_HASH
  vaultVariables:
    OCIRCRED: "<vault-secret-ocid>"
steps:
  - type: Command
    name: "Export BUILDRUN_HASH as variable"
    timeoutInSeconds: 40
    command: |
      export BUILDRUN_HASH=`echo ${OCI_BUILD_RUN_ID} | rev | cut -c 1-7`
      echo "BUILDRUN_HASH: " $BUILDRUN_HASH
    onFailure:
      - type: Command
        command: |
          echo "Failed to obtain BUILDRUN_HASH"
        timeoutInSeconds: 400
        runAs: root
# Build Docker image for php
  - type: Command
    name: "Build docker image for nginx app"
    command: |
      docker build -t lhr.ocir.io/idxkccw2srke/mywebapp:${BUILDRUN_HASH} .
      docker images
    onFailure:
      - type: Command
        command: |
          echo "Failed to build Docker container for nginx app"
        timeoutInSeconds: 400
        runAs: root
# Push nginx and php docker image to OCIR
  - type: Command
    name: "Push docker image to OCIR"
    command: |
      echo "Login to OCIR"
      docker login lhr.ocir.io -u idxkccw2srke/oracleidentitycloudservice/jahangir.alam@oracle.com -p ${OCIRCRED}
      echo "Push Nginx App image to OCIR"
      docker push lhr.ocir.io/idxkccw2srke/mywebapp:${BUILDRUN_HASH}
    onFailure:
      - type: Command
        command: |
          echo "Failed to push images $BUILDRUN_HASH to OCIR"
        timeoutInSeconds: 400
```

#### d) Create Build Pipeline

```
i. create pipeline
ii. create stage->Manage Build-> [Select Primary Code Repository]
iii. start a manual run to test # select the latest commit hash
iv. check if build was successfull by checking the docker image
```



#### e) Create DevOps environment selecting OKE Cluster

#### f) Edit the deploy.yaml file & create devops artifact

```
## Sample deploy.yaml file

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-web-app-deploy
  labels:
    app: node-web-app
    builder: jahangir
spec:
  replicas: 1
  selector:
    matchLabels:
      app: node-web-app
      builder: jahangir
  template:
    metadata:
      labels:
        app: node-web-app
        builder: jahangir
    spec:
      containers:
      - name: node-web-app
        image: lhr.ocir.io/idxkccw2srke/mywebapp:${BUILDRUN_HASH}
        ports:
        - containerPort: 8080
      imagePullSecrets:
        - name: <registry-secret>
---
apiVersion: v1
kind: Service
metadata:
  name: node-web-app-service
  labels:
    app: node-web-app
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 32001
    name: node-web-app-port
  selector:
    app: node-web-app
    builder: jahangir
```

#### g) Create Deployment Pipeline

```
Steps here
```

#### h) Create Trigger to automate CI/CD

```
Steps here
```



## Reference



## Author



