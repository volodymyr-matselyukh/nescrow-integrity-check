import { queryServerSide, USDT_CONTRACT_ID } from "./utils/near";

const main = async () => {
  const backendContractUsdtBalance = await queryServerSide(
    "ft_balance_of",
    '{"account_id": "decorous-effect.testnet"}',
    USDT_CONTRACT_ID
  );

  if (!backendContractUsdtBalance) {
    throw new Error("backendContractUsdtBalance can't be null");
  }

  const backendContractUsdtBalanceNumber = parseInt(
    backendContractUsdtBalance.replaceAll('"', "").replaceAll("'", "")
  );

  const backendContractTotalDeposit = await queryServerSide(
    "get_total_deposit"
  );

  if (!backendContractTotalDeposit) {
    throw new Error("backendContractTotalDeposit can't be null");
  }

  const backendContractTotalDepositNumber = parseFloat(
    backendContractTotalDeposit.replaceAll('"', "").replaceAll("'", "")
  );

  const usdtBalanceHumanFormat = backendContractUsdtBalanceNumber / 1000_000;

  console.error("contract USDT balance", usdtBalanceHumanFormat);
  console.error("total USDT deposits", backendContractTotalDepositNumber);

  if (usdtBalanceHumanFormat >= backendContractTotalDepositNumber) {
    console.log(1);
    return;
  }

  console.log(-1);
};

main();
