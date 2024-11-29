import { NextFunction, Request, Response } from "express";
import { findRequestByAddress, getRequestById } from "../tools/request-network/pay";

export async function getAllRequests(req: Request, res: Response, next: NextFunction) {
  try {
    const { address } = req.params;

    console.log("request came", address);

    const requests = await findRequestByAddress(address);

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const { requestId } = req.params;

    const request = await getRequestById(requestId);

    res.status(200).json(request);
  } catch (error) {
    console.error(error);
  }
}
