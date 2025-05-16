import 'dotenv/config';

export default {
  expo: {
    name: 'DYNAMIC-AUTHENTICATION',
    slug: 'dynamic-authentication',
    version: '1.0.0',
    extra: {
        BACKEND_URL: process.env.BACKEND_URL,
    },
  },
};
