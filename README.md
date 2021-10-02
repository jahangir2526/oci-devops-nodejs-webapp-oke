# Overview

This project will describe high level steps to setup a **CI/CD using OCI DevOps** to deploy a one page nginx app on a Kubernetes cluster (**OKE**).

## Steps

### 1. Gather Info

```
OCI Username: <oci-username>	#eg: oracleidentitycloudservice/user01_idcs
OCI Auth Token: <oci-auth-token>	
Tenancy Name: <tenancy-name>	
Tenancy Namespace: <tenancy-namespace>	# object storage namespace, eg: ansh81vru1zp

OCIR Docker CLI Username: 
<tenancy-namespace>/<oci-username> #eg: ansh81vru1zp/oracleidentitycloudservice/user01
OCIR Docker CLI Password: <oci-auth-token>

OCI Code Repo (git) Username: <tenancy-name>/<oci-username> 
OCI Code Repo (git) Password: <oci-auth-token>
```

### 2. Spin up Kubernetes cluster | Create registry secret | Create Other Resources

```
i. Spin up a Kubernetes cluster (OKE)
ii. Login into OKE using cloud shell
iii. Create a registry secret
$ kubectl create secret docker-registry <secret-name> --docker-server=<region-key>.ocir.io --docker-username='<tenancy-namespace>/<oci-username>' --docker-password='<oci-auth-token>' --docker-email='<email-address>'

iv. (If required) Create any other resource (eg: namespace, secret, pv etc) to fullfill app requirements
```

### 3. Create OCIR Repository

```
## Create OCIR Repository using OCI console and note the following information
OCIR Region: <ocir-region> # eg: Singapore
OCIR Repo Region Key: <region-key>	# eg: iad

OCIR Repo Name: # <ocir-repo-name> # eg: project01/mywebapp
OCIR Repo Compartment Name: <ocir-repo-comp-name>	# :ASEAN/Jahangir/Demo

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
## If needed edit build_spec.yml especially add value for OCIRCRED # ocid of vault secret

## Variable/Parameter used in build_spec.yml
OCIR_REGION_KEY
TENANCY_NAMESPACE
OCIR_REPO_NAME
OCI_USERNAME
```

#### d) Create Build Pipeline

```
i. create pipeline
ii. create stage->Manage Build-> [Select Primary Code Repository]
iii. add value for parameters ref-5c to build pipeline Parameter section
iii. start a manual run to test # by selecting the latest commit hash
iv. check if build was successfull by checking the docker image
```



#### e) Create DevOps environment selecting OKE Cluster

#### f) Edit the deploy.yaml file & create devops artifact

```
## edit k8s_deployment.yaml file as required

## Variable/Parameter used in build_spec.yml
OCIR_REGION_KEY
TENANCY_NAMESPACE
OCIR_REPO_NAME
OCI_USERNAME
K8s_IMAGE_PULL_SECRET

```

#### g) Create Deployment Pipeline

```
i. Steps here
ii. add values for parameters ref-5f to deploy pipeline Parameter section
iii. start a manual run and check 
```

#### h) Create Trigger to automate CI/CD

```
Steps here
```



## Reference



## Author



