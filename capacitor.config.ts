import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.taro.rxdrugstore',
  appName: 'RxDrugstore',
  webDir: 'dist', // หรือจะใส่อะไรก็ได้ เพราะมันจะถูก override
  server: {
    url: 'https://rxdrugstore.vercel.app',
    cleartext: true,
  },
};

export default config;
