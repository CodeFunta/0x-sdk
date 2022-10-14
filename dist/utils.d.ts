import { SwapParams } from './types';
export declare const getRootApiEndpoint: (chainId: number | string) => string;
export declare const validateAmounts: (params: SwapParams) => undefined;
export declare const validateResponse: (response: Response) => Promise<undefined>;
export declare const verifyRfqmIsLiveOrThrow: (endpoint: string, fetchFn?: typeof fetch) => Promise<undefined>;
export declare const getExchangeProxyAddress: (chainId: number) => string;
