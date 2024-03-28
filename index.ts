#!/usr/bin/env node
import inquirer from "inquirer";
let machine = await inquirer.prompt({
  message: "Enter Your 4 digit pin",
  type: "number",
  name: "pin",
});

let registerPin = 6508;
let currentBalance = 30000;
if (registerPin === machine.pin) {
  let operations = await inquirer.prompt([
    {
      message: "Select that you want to do",
      type: "list",
      name: "method",
      choices: ["Fast Cash", "Cash Withdrawl", "Balance Inquiry"],
    },
  ]);
  if (operations.method === "Fast Cash") {
    let fastCash = await inquirer.prompt([
      {
        message: "Select Amount",
        name: "amount",
        type: "list",
        choices: ["500", "1000", "2000", "5000", "10000", "50000"],
      },

      {
        message: "You want to do this transaction?",
        name: "confirmation",
        type: "confirm",
      },
    ]);
    if (fastCash.amount <= currentBalance) {
      if (fastCash.confirmation === true) {
        console.log((currentBalance -= fastCash.amount));
      } else {
        console.log("If you want to proceed this transaction select YES");
      }
    } else {
      console.log("Transaction Failed Insufficient Balance !!");
    }
  } else if (operations.method === "Cash Withdrawl") {
    let cashWithdrawl = await inquirer.prompt([
      {
        message: "Select Amount",
        name: "amount",
        type: "number",
      },
      {
        message: "You want to proceed this transaction?",
        name: "confirmation",
        type: "confirm",
      },
    ]);
    if (cashWithdrawl.amount >= 1 && cashWithdrawl.amount <= currentBalance) {
      if (cashWithdrawl.confirmation === true) {
        console.log((currentBalance -= cashWithdrawl.amount));
      } else {
        console.log("If you want to proceed this transaction select YES");
      }
    } else {
      console.log("Transaction Failed Insufficient Balance !!");
    }
  } else if (operations.method === "Balance Inquiry") {
    console.log(`Current Balance = ${currentBalance}`);
  }
} else {
  console.log("Invalid Pin!!");
}
