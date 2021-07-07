import subprocess
import json

# Create repo and get uri
completed_repository_process = subprocess.run(
    ['aws', 'ecr', 'create-repository', '--repository-name', 'dqian/react-boilerplate'], text=True, stdout=subprocess.PIPE)
repository_json = json.loads(
    completed_repository_process.stdout.replace('\n', ''))
uri = repository_json.get('repository').get('repositoryUri')
full_uri = uri + ':latest'

# Authenticate
subprocess.run(["aws", "ecr", "get-login-password", "--region", "us-west-2", "|", "docker", "login",
                "--username", "AWS", "--password-stdin", "504166309185.dkr.ecr.us-west-2.amazonaws.com"])

# Create the container image
subprocess.run(['docker', 'build', '-f', 'Dockerfile.prod',
                '-t' 'dqian/react-boilerplate', '.'])

# Tag the image
subprocess.run(['docker', 'tag', 'dqian/react-boilerplate:latest', full_uri])

# Push it
subprocess.run(['docker', 'push', full_uri])

print(uri)
