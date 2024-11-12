import type { AWS } from '@serverless/typescript';

import functions from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'weather-app-crud',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    stage: "dev",
    profile: 'sls',
    stackName: "${self:service}-stack-${self:provider.stage}",
    apiName: "${self:service}-${self:provider.stage}",
    region: "ap-southeast-1",
    endpointType: "regional",
    runtime: 'nodejs20.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ['${self:provider.apiName}-apikey']
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      WEATHER_API_KEY: "66710cb00f905feb17186c05c23acc0b",
      DBHOSTNAME: 'weather-db.cluster-c10gwgeuehix.ap-southeast-1.rds.amazonaws.com',
      DBPORT: '5432',
      DBDATABASE:'WeatherDB',
      DBUSERNAME: 'postgres',
      DBPASSWORD: 'Ayyoob1234',
      DBSCHEMA: 'public'
    },
  },
  // import the function via paths
  functions:  functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    allowedHttpHeaders: 'Accept, Content-Type, Origin, X-Api-Key, Authorization, Content-Length, X-Requested-With',
  },
};

module.exports = serverlessConfiguration;
