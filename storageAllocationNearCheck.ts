import { getAccountSummary } from "./utils/near";

const COST_PER_BYTE = 0.00001;

const main = async () => {
  const accountSummary = await getAccountSummary();

  if (!accountSummary) {
    throw new Error("accountSummary can't be null");
  }

  const totalStorageCost = accountSummary.storage_usage * COST_PER_BYTE;

  const accountBalance = parseInt(accountSummary.amount);
  const freeStorage = accountBalance - totalStorageCost;

  console.log("freeStorage: ", BigInt(freeStorage).toString());
};

main();
