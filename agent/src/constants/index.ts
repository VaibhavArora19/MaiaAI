import { Types } from "@requestnetwork/request-client.js";

export const TOKENS = [
    {
        name: "USDC",
        address: "0xf08A50178dfcDe18524640EA6618a1f965821715",
        decimals: '6',
        type: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT
    },
    {
        name: "FAU",
        address: "0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C",
        decimals: "18",
        type: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT
    },
    {
        name:"ETHx",
        address: "0x30a6933Ca9230361972E413a15dC8114c952414e",
        type: Types.Extension.PAYMENT_NETWORK_ID.ERC777_STREAM,
        decimals: '18'
    }
]

export const BACKEND_URL="http://localhost:8000";

export const REQUEST_NETWORK_URL = "https://sepolia.gateway.request.network/";
