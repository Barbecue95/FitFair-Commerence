interface Config {
  sellerApiUrl: string;
}

export const config: Config = {
  sellerApiUrl: process.env.NEXT_PUBLIC_SELLER_API_URL || "",
};
