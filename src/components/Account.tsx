import React from "react";
interface IAccount {
  accountNumber: string;
  amount: number;
  transactions: string[];
}

export default function Account({
  accountNumber,
  amount,
  transactions,
}: IAccount) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank Checking ({accountNumber})</h3>
        <p className="account-amount">{amount}$</p>
        <p className="account-amount-description">{amount > 0 ? 'Available' : ''} Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}
