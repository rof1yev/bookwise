const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
      uploadUrl: process.env.NEXT_PUBLIC_IMAGEKIT_UPLOAD_URL,
      folderName: process.env.NEXT_PUBLIC_IMAGEKIT_FOLDER_NAME,
    },
  },
};

export default config;
