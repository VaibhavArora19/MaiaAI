import { ethers, providers } from "ethers";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { RequestNetwork, Types, Utils } from "@requestnetwork/request-client.js";
import { feeRecipient, NETWORK, REQUEST_NETWORK_URL } from "@/constants";
import { approveErc20, hasErc20Approval, hasSufficientFunds, payRequest } from "@requestnetwork/payment-processor";

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

export async function getAllRequests(userAddress: string) {
  const requestClient = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: REQUEST_NETWORK_URL,
    },
  });

  const requests = await requestClient.fromIdentity({
    type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: userAddress,
  });

  return requests;
}

export async function payToRequest(requestId: string) {
  const requestClient = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: REQUEST_NETWORK_URL,
    },
  });

  const request = await requestClient.fromRequestId(requestId);
  const requestData = request.getData();

  const provider = new providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const address = await signer.getAddress();

  const _hasSufficientFunds = await hasSufficientFunds({ request: requestData, address, providerOptions: { provider } });

  if (!_hasSufficientFunds) throw new Error("Funds are not sufficient");

  const _hasErc20Approval = await hasErc20Approval(requestData, address, provider);

  if (!_hasErc20Approval) {
    const approvalTx = await approveErc20(requestData, signer);
    await approvalTx.wait(2);
  }

  const paymentTx = await payRequest(requestData, signer);
  await paymentTx.wait(2);
}
