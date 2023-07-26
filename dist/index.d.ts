import { BigNumber } from '@ethersproject/bignumber';
import { ContractTransaction } from '@ethersproject/contracts';
import { TransactionResponse } from '@ethersproject/providers';
import { EXCHANGE_PROXY_ADDRESSES } from './constants';
import { AllowanceParams, ApproveTokenParams, FetchPriceOrQuoteArgs, FillOrderArgs, FillRfqmOrderArgs, PostRfqmTransactionSubmitSerializedResponse, RfqmPrice, RfqmQuote, RfqmTransactionStatusResponse, RfqmTxStatusArgs, SwapPrice, SwapQuote, SwapSourceParams, SwapSourcesResponse, ZeroExSdkOptions } from './types';
declare class ZeroExSdk {
    private ZeroExSdkOptions?;
    constructor(ZeroExSdkOptions?: ZeroExSdkOptions);
    /**
     * Returns the liquidity sources enabled for a specific chain id.
     * - {@link https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-sources}
     *
     * @param chainId - Chain ID of sources. Optional if ZeroExSdkOptions.apiUrl is defined
     * @param fetchFn: An optional fetch function. Defaults to fetch.
     * @returns An object with the list of sources
     */
    getSources({ chainId, fetchFn, }?: SwapSourceParams): Promise<SwapSourcesResponse>;
    /**
     * Fetches an indicative price for buying or selling an ERC20 token.
     * - {@link https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-price}
     * - {@link https://docs.0x.org/market-makers/docs/introduction#indicative-pricing}
     *
     * @param params: The request params for the 0x API `/price` endpoint.
     * @param resource: Optional 'swap' or 'rfqm' resource type. Defaults to 'swap'.
     * @param chainId - Chain ID number for this transaction. Optional if ZeroExSdkOptions.apiUrl is defined
     * @param fetchFn: An optional fetch function. Defaults to fetch.
     * @returns The indicative price
     */
    getIndicativePrice({ params, resource, chainId, fetchFn, }: FetchPriceOrQuoteArgs): Promise<SwapPrice | RfqmPrice>;
    /**
     * Fetches a firm quote for buying or selling an ERC20 token.
     * - {@link https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote}
     * - {@link https://docs.0x.org/market-makers/docs/introduction#firm-quotes}
     *
     * @param params: The request params for the 0x API `/quote` endpoint.
     * @param resource: Optional 'swap' or 'rfqm' resource type. Defaults to 'swap'.
     * @param chainId - Chain ID number for this transaction. Optional if ZeroExSdkOptions.apiUrl is defined
     * @param fetchFn: An optional fetch function.
     * @returns The firm quote
     */
    getFirmQuote({ params, resource, chainId, fetchFn, }: FetchPriceOrQuoteArgs): Promise<SwapQuote | RfqmQuote>;
    /**
     * Approves 0x's smart contracts to facilitate transactions on signer's behalf for the token contract address specified.
     * - {@link https://docs.0x.org/0x-api-swap/advanced-topics/how-to-set-your-token-allowances}
     * - {@link https://tokenallowance.io/}
     *
     * @param tokenContractAddress: Token Address for appproval.
     * @param contractAddressToApprove: ZeroEx Exchange Proxy Address - Varies per network and can be obtained via utils function `getExchangeProxyAddress(chainId)`.
     * @param signer: Transaction signer.
     * @param amount: Amount to approve. Defaults to MaxInt256 if not specified
     * @returns The contract transaction Promise.
     */
    approveToken({ tokenContractAddress, contractAddressToApprove, signer, amount, txOptions, }: ApproveTokenParams): Promise<ContractTransaction>;
    /**
     * Gets allowance amount for a specified token per wallet address.
     * @param tokenContractAddress: Token Address for approval.
     * @param contractAddressToApprove: ZeroEx Exchange Proxy Address - Varies per network and can be obtained via utils function `getExchangeProxyAddress(chainId)`.
     * @param walletAddress: Wallet address to get allowance for.
     * @param signerOrProvider: Optional - signer or provider.
     * @returns Allowance
     */
    getAllowance({ tokenContractAddress, contractAddressToApprove, walletAddress, signerOrProvider, }: AllowanceParams): Promise<BigNumber>;
    /**
     * Submits the ERC-20 token swap on chain
     * @param quote - The data returned from getFirmQuote()
     * @param signer - Signer who will send the transaction
     * @param chainId - Chain ID number for this transaction.
     * @returns The transaction response
     */
    fillOrder({ quote, signer, chainId, txOptions, }: FillOrderArgs): Promise<TransactionResponse>;
    /**
     * Signs the RFQm order and submits it to authorize 0x to perform the swap on behalf of signers
     * - {@link https://docs.0x.org/market-makers/guides/signing-0x-orders}
     * - {@link https://docs.0x.org/market-makers/docs/introduction#rfq-m-1}
     * @param quote - The data returned from getFirmQuote()
     * @param chainId: Chain ID number for this transaction.
     * @param fetchFn: An optional fetch function.
     * @returns The transaction response after RFQm fill submission
     */
    fillRfqmOrder({ quote, chainId, signer, fetchFn, }: FillRfqmOrderArgs): Promise<PostRfqmTransactionSubmitSerializedResponse>;
    /**
     * Fetches the RFQm order transaction status
     * @param txHash: The order transaction hash from RFQm fill submission
     * @param chainId: Chain ID number for this transaction.
     * @param fetchFn: An optional fetch function.
     * @returns The transaction status and all transactions executed for the RFQm order
     */
    getRfqmTxStatus({ txHash, chainId, fetchFn, }: RfqmTxStatusArgs): Promise<RfqmTransactionStatusResponse>;
}
export { EXCHANGE_PROXY_ADDRESSES, ZeroExSdk };
