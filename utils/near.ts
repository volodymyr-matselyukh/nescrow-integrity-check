import { providers } from "near-api-js";
import { CodeResult } from "near-api-js/lib/providers/provider";

export const BACK_END_CONTRACT = "decorous-effect.testnet";
export const USDT_CONTRACT_ID = "usdt.fakes.testnet";

export const getBase64 = (argumentsString: string) => {
  return btoa(argumentsString);
};

const provider = new providers.JsonRpcProvider({
  url: "https://rpc.testnet.near.org",
});

export const queryServerSide = async (
  methodName: string,
  argumentsString: string = "{}",
  accountId: string = BACK_END_CONTRACT
) => {
  try {
    const rawResult = await provider.query<CodeResult>({
      request_type: "call_function",
      account_id: accountId,
      method_name: methodName,
      args_base64: getBase64(argumentsString),
      finality: "optimistic",
    });
    return Buffer.from(rawResult.result).toString();
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
