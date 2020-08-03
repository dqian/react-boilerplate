#!/usr/bin/env python3
import subprocess
import json
import fileinput
import uuid
import time

ECS_CLUSTER_NAME = 'deployment-react-boilerplate-cluster'
ECS_SERVICE_NAME = 'deployment-react-boilerplate-service'
ECR_REPO_NAME = 'react-boilerplate-repo'
AWS_REGION = 'us-west-2'
SERVER_PORT = 80

api = 'http://localhost:5000'
ecr_repo_uri = '504166309185.dkr.ecr.us-west-2.amazonaws.com/react-boilerplate'
values_list = [ecr_repo_uri]


# Generate image repository
print('Generating image repository')
ecr_repo_result = subprocess.run(
    ['aws', 'ecr', 'create-repository', '--repository-name', ECR_REPO_NAME], text=True, stdout=subprocess.PIPE)
ecr_repo_result_json = json.loads(ecr_repo_result.stdout.replace('\n', ''))
ecr_repo_uri = ecr_repo_result_json.get('repository').get('repositoryUri')
print('ECR Repo URI: {}'.format(ecr_repo_uri))

# Create .env.production file
subprocess.run(['cp', './.env.template', './.env.production'])

# Write the RDS & ECR URIs into the .env.production file
print('Writing production env file')

# Read in the file
with open('.env.production', 'r') as file :
  filedata = file.read()

# Replace the target string
for idx, val in enumerate(values_list):
  indicator = '[{}]'.format(idx)
  new_val = values_list[idx]
  filedata = filedata.replace(indicator, new_val)

# Write the file out again
with open('.env.production', 'w') as file:
  file.write(filedata)

# Login
subprocess.Popen("aws ecr get-login-password --region {} | docker login --username AWS --password-stdin {}".format(AWS_REGION, ecr_repo_uri), stdin=subprocess.PIPE, shell=True)

# Build production image
print('Building production image')
build_result = subprocess.run(["docker", "build", "--no-cache", "-f", "./Dockerfile.prod", "-t", ECR_REPO_NAME, "."], text=True, stdout=subprocess.PIPE)

# Tag image
print('Tagging image')
tag_result = subprocess.run(["docker", "tag", "{}:latest".format(ECR_REPO_NAME), "{}:latest".format(ecr_repo_uri)], text=True, stdout=subprocess.PIPE)

# Push image
print('Pushing image')
push_result = subprocess.run(["docker", "push", "{}:latest".format(ecr_repo_uri)], text=True, stdout=subprocess.PIPE)

# Run the cloud formation setup script with the RDS + image info
print('Running cloudformation setup')
cloudformation_result = subprocess.run(["aws", "cloudformation", "create-stack", "--stack-name", "react-boilerplate-stack", "--template-body", "file://./deployment/ecs.yml", "--capabilities",
                                        "CAPABILITY_NAMED_IAM", "--parameters", "ParameterKey=ImageUri,ParameterValue={}".format(ecr_repo_uri)], text=True, stdout=subprocess.PIPE)