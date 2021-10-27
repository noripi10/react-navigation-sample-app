import 'dotenv/config';

export default () => {
  const settings = {
    extra: {
      firebaseConfig: {
        apiKey: process.env.FIREBAE_CONFIG_APIKEY,
        authDomain: process.env.FIREBAE_CONFIG_AUTH_DOMAIN,
        projectId: process.env.FIREBAE_CONFIG_PRODUCT_ID,
        storageBucket: process.env.FIREBAE_CONFIG_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBAE_CONFIG_MESSAGING_SENDER_ID,
        appId: process.env.FIREBAE_CONFIG_APP_ID,
        measurementId: process.env.FIREBAE_CONFIG_MEASUREMENT_ID,
      },
    },
  };

  return {
    ...settings,
  };
};
