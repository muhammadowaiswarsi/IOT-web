import AWSAppSyncClient from 'aws-appsync';
import Credentials from "./credentials";

export const AppSync = new AWSAppSyncClient({ // this client is for awsAppsync graphql remains constant
    url: Credentials.GRAPHQL_END_POINT,
    region: Credentials.REGION,
    auth: {
        type: Credentials.AUTHENCITCATION_TYPE,
        apiKey: Credentials.API_KEY,
    },
    disableOffline: true
});

