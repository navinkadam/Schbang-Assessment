const AWS = require("aws-sdk");

const s3 = new AWS.S3();
const DEFAULT_BUCKET_NAME = "schbang-product-navin";
const DEFAULT_EXPIRES = 120;

async function getUploadSignedUrl(params) {
    const { bucket, fileName = new Date().getTime(), mimeType, fileType, expires = DEFAULT_EXPIRES } = params;
    const result = await s3.getSignedUrl("putObject", {
        Bucket: DEFAULT_BUCKET_NAME || bucket,
        Key: fileName,
        Expires: expires,
        ContentType: mimeType || fileType,
    });
    return { url: result, name: fileName };
}

async function getUpload(params) {
    const { bucket, fileName = new Date().getTime(), mimeType, fileData, fileType, expires = DEFAULT_EXPIRES } = params;
    const buf = Buffer.from(fileData.replace(/^data:image\/\w+;base64,/, ""), "base64");
    return await s3
        .upload({
            Bucket: DEFAULT_BUCKET_NAME || bucket,
            Key: fileName,
            Body: buf,
            ContentType: mimeType || fileType,
            ContentEncoding: "base64",
            ACL: "public-read",
        })
        .promise();
}

async function getDownloadSignedUrl(params) {
    const { bucket, fileName, expires = DEFAULT_EXPIRES } = params;
    const s3 = new AWS.S3();
    return await s3.getSignedUrl("getObject", {
        Bucket: DEFAULT_BUCKET_NAME || bucket,
        Key: fileName,
        Expires: expires,
    });
}

module.exports = { getUploadSignedUrl, getDownloadSignedUrl, getUpload };
