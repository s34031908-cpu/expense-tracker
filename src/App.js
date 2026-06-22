import React, { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Income");

  const addTransaction = () => {
    if (amount === "" || category === "") {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      category,
      type,
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setCategory("");
  };

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        padding: "30px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "25px",
        }}
      >
        💰 Daily Expense Analytics Dashboard
      </h1>

      {/* Input Section */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          width: "85%",
          margin: "auto",
          textAlign: "center",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: "12px",
            margin: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "180px",
          }}
        />

        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "12px",
            margin: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "180px",
          }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: "12px",
            margin: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <button
          onClick={addTransaction}
          style={{
            padding: "12px 22px",
            margin: "8px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ➕ Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          width: "85%",
          margin: "20px auto",
          display: "flex",
          justifyContent: "space-between",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "220px",
            background: "#d4edda",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>💵 Income</h3>
          <h2>₹{totalIncome}</h2>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "220px",
            background: "#f8d7da",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>💸 Expense</h3>
          <h2>₹{totalExpense}</h2>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "220px",
            background: "#d1ecf1",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>🏦 Balance</h3>
          <h2>₹{balance}</h2>
        </div>
      </div>

      {/* Transaction Table */}
      <div
        style={{
          background: "#fff",
          width: "85%",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2>📋 Transaction List</h2>

        <table
          width="100%"
          style={{
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ background: "#007bff", color: "white" }}>
              <th style={{ padding: "12px" }}>Amount</th>
              <th style={{ padding: "12px" }}>Category</th>
              <th style={{ padding: "12px" }}>Type</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: "10px" }}>₹{item.amount}</td>
                <td>{item.category}</td>
                <td
                  style={{
                    color:
                      item.type === "Income" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {item.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analytics */}
      <div
        style={{
          background: "#fff",
          width: "85%",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2>📊 Category-wise Analytics</h2>

        {[...new Set(transactions.map((item) => item.category))].map(
          (cat) => {
            const total = transactions
              .filter((item) => item.category === cat)
              .reduce((sum, item) => sum + item.amount, 0);

            return (
              <div
                key={cat}
                style={{
                  background: "#f8f9fa",
                  padding: "12px",
                  margin: "10px 0",
                  borderRadius: "8px",
                  borderLeft: "6px solid #007bff",
                }}
              >
                <b>{cat}</b> : ₹{total}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default App;