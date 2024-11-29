import { ethers } from "ethers";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { RequestNetwork, Types, Utils } from "@requestnetwork/request-client.js";
import { feeRecipient, NETWORK, REQUEST_NETWORK_URL } from "@/constants";
export async function createRequest(
  payerAddress: string,
  payeeAddress: string,
  tokenAddress: string,
  amountInWei: string,
  reason: string,
  dueDate: string
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const web3SignatureProvider = new Web3SignatureProvider(provider);

  const requestClient = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: REQUEST_NETWORK_URL,
    },
    signatureProvider: web3SignatureProvider,
  });

  const requestCreateParameters: Types.ICreateRequestParameters = {
    requestInfo: {
      currency: {
        type: Types.RequestLogic.CURRENCY.ERC20,
        value: tokenAddress,
        network: NETWORK,
      },
      expectedAmount: amountInWei,
      payee: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payeeAddress,
      },
      payer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payerAddress,
      },
      timestamp: Utils.getCurrentTimestampInSecond(),
    },
    paymentNetwork: {
      id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
      parameters: {
        paymentNetworkName: NETWORK,
        paymentAddress: payeeAddress,
        feeAddress: feeRecipient,
        feeAmount: "0",
      },
    },
    contentData: {
      reason: reason,
      dueDate: dueDate,
    },

    signer: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: payeeAddress,
    },
  };

  const request = await requestClient.createRequest(requestCreateParameters);

  const confirmedRequestData = await request.waitForConfirmation();

  console.log("confirmed data: ", confirmedRequestData);
}
