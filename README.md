# React Boilerplate (Redux, Typescript)

## Prerequisites

1. [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
2. [Homebrew](https://brew.sh/)

## Getting Started (Local Setup)

##### 1. Install Node

- `nvm install node`

##### 2. Install Node Modules
- `brew update`
- `brew install yarn`
- `yarn`

##### 3. Initialize Environment Variables (local)
- `cp .env.example .env.local`
- (optional) update `PROJECT_PREFIX` in `.env.local`

##### 3. Run Webpack
- `yarn dev`
```
｢wds｣: Project is running at http://localhost:3000/
｢wds｣: webpack output is served from /
...
｢wdm｣: Compiled successfully.
```

## Production Deployment
##### 1. Install Docker
- [Docker installation](https://docs.docker.com/get-docker/)
##### 2. Acquire AWS console account and access key/secret if necessary
- [Sign up here](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start)
- Login and open the dropdown on your name in the upper right, then click **My Security Credentials**
- Open the **Access keys (access key ID and secret access key)** accordion tab and click **Create New Access Key**
- In the modal that appears, click **Show Access Key** and store the *Access Key ID* and *Secret Access Key* in a secure place for later
##### 3. Install AWS CLI and configure with your account
- [AWS CLIv2 installation](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- run `aws configure` in your terminal and input the *Access Key ID* and *Secret Access Key* from the previous step. Leave default region (`us-east-2`) and default output format as is and progress by pressing Enter until done.
##### 4. Create ECR repository
- [WIKI: AWS ECR Repository](https://github.com/dqian/node-boilerplate/wiki/AWS-ECR-Repository)
##### 5. Create ECS cluster and task definition
- [WIKI: AWS ECR Cluster and Task Definition](https://github.com/dqian/node-boilerplate/wiki/AWS-ECS-Cluster-and-Task-Definition)
##### 6. Create EC2 load balancer (ELB)
- [WIKI: AWS EC2 Load Balancer](https://github.com/dqian/node-boilerplate/wiki/AWS-EC2-Load-Balancer)
##### 7. Create ECS service in cluster
- [WIKI: AWS ECS Cluster Service](https://github.com/dqian/node-boilerplate/wiki/AWS-ECS-Cluster-Service)
##### 8. Create .env.production
- `cp .env.example .env.production`
- populate the `DB_` variables with your RDS info
- populate the `AWS_` variables with your ECR repository, ECS cluster, and ECS service info
- populate `API_URL` with your backend service or use `http://node-boilerplate-prod-elb-204831979.us-east-2.elb.amazonaws.com/` (deployment of [https://github.com/dqian/node-boilerplate](https://github.com/dqian/node-boilerplate))
##### 9. Deploy to ECR repository
- `yarn deploy`
- press `q` when the cluster schema appears once deployment is done to return to your terminal
##### 10. Monitor ECS service task and verify ELB DNS 
- From your [ECS Cluster dashboard](https://us-east-2.console.aws.amazon.com/ecs/home?region=us-east-2#/clusters), navigate into your service and open the **Tasks** tab. From here, you can wait for your task to reach "RUNNING" status and/or click into the task and view logs.
- Once running, you can type in your load balancer's DNS name into a browser to reach your react app. Try registering a new account to verify connectivity to the backend service.

## Resources
- [original boilerplate](https://github.com/rokoroku/react-redux-typescript-boilerplate)
------
### OLD README BELOW

# Frontend Boilerplate with React, Redux & TypeScript

A bare minimum react-hooks-redux-webpack-typescript boilerplate with TodoMVC example.

Note that this project does not include **Server-Side Rendering**, **Static code analysis**, **Testing Frameworks**
If needed, please fork this repository and add your own that meets your requirements.

Ideal for creating React apps from the scratch.

## Contains

- [x] [Typescript](https://www.typescriptlang.org/) 3.8
- [x] [React](https://facebook.github.io/react/) 16.12
- [x] [Redux](https://github.com/reactjs/redux) 4
- [x] [Redux Thunk](https://github.com/reduxjs/redux-thunk) 2.3
- [x] [React Router](https://github.com/ReactTraining/react-router) 5.1
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [TodoMVC example](http://todomvc.com)

### Build tools

- [x] [Webpack](https://webpack.github.io) 4
  - [x] [Tree Shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
  - [x] [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [PostCSS Loader](https://github.com/postcss/postcss-loader)
  - [x] [PostCSS Preset Env](https://preset-env.cssdb.org/)
  - [x] [CSS modules](https://github.com/css-modules/css-modules)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)

## Installation

```
$ npm ci
```

## Running

```
$ npm start
```

## Build

```
$ npm run build
```

## Deploy (to the [GitHub Pages](https://pages.github.com/))

```
$ npm run deploy
```

# License

MIT
