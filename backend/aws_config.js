const AWS = require("aws-sdk");
const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};

const DEFAULT_REGION = process.env.DEFAULT_REGION;
AWS.config.update({ credentials: credentials, region: DEFAULT_REGION });
