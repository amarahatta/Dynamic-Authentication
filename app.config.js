import 'dotenv/config';

export default {
  expo: {
    name: 'DYNAMIC-AUTHENTICATION',
    slug: 'dynamic-authentication',
    version: '1.0.0',
    extra: {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    },
  },
};
