import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.18f05bd39914439894e31303b443e3fc',
  appName: 'wish-budget-master',
  webDir: 'dist',
  server: {
    url: 'https://18f05bd3-9914-4398-94e3-1303b443e3fc.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;