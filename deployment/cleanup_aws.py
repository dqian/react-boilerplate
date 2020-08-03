#!/usr/bin/env python3
import subprocess
import os

print('Removing .env.production file')
os.remove('./.env.production')

print('Deleting ECR repo')
subprocess.run(["aws", "ecr", "delete-repository", "--repository-name", "react-boilerplate-repo", "--force"], text=True, stdout=subprocess.PIPE)

print('Cleaning up cloudformation stack')
subprocess.run(["aws", "cloudformation", "delete-stack", "--stack-name", "react-boilerplate-stack"], text=True, stdout=subprocess.PIPE)