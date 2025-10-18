export const SUI_PACKAGES = {
  mainnet: (import.meta as any).env?.VITE_SUI_PACKAGE_MAINNET || "",
  testnet: (import.meta as any).env?.VITE_SUI_PACKAGE_TESTNET || "",
} as const;
