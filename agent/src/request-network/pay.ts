import { RequestNetwork, Types } from "@requestnetwork/request-client.js";
import { REQUEST_NETWORK_URL } from "../constants/index.js";


export const findRequestByAddress = async (address: string) => {
  const requestClient = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: REQUEST_NETWORK_URL,
    },
  });

  const requests = await requestClient.fromIdentity({
    type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: address,
  });


  const requestDatas = requests.map((req) => req.getData());


  return requestDatas;
};

export const getRequestById = async (requestId: string) => {
  const requestClient = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: REQUEST_NETWORK_URL,
    },
  });

  const request = await requestClient.fromRequestId(requestId);

  return request;
};