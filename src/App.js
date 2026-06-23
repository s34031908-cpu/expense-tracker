import React, { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Income");
  const [transactions, setTransactions] = useState([]);

  const addTransaction = () => {
    if (!amount || !category) {
      alert("Please fill all fields!");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      category,
      type,
      date: new Date().toLocaleDateString(),
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setCategory("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const categorySummary = {};

  transactions.forEach((t) => {
    categorySummary[t.category] =
      (categorySummary[t.category] || 0) + t.amount;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "30px",
        }}
      >
        💰 Daily Expense Analytics Dashboard
      </h1>

      {/* Form */}
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Category (Food, Travel...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={inputStyle}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <button onClick={addTransaction} style={buttonStyle}>
          ➕ Add Transaction
        </button>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ ...cardStyle, background: "#d4fc79" }}>
          <h3>💵 Income</h3>
          <h2>₹{income}</h2>
        </div>

        <div style={{ ...cardStyle, background: "#ff9a9e" }}>
          <h3>💸 Expense</h3>
          <h2>₹{expense}</h2>
        </div>

        <div style={{ ...cardStyle, background: "#84fab0" }}>
          <h3>🏦 Balance</h3>
          <h2>₹{balance}</h2>
        </div>
      </div>

      {/* Transactions */}
      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2>📋 Transaction History</h2>

        {transactions.length === 0 ? (
          <p>No Transactions Yet</p>
        ) : (
          <table width="100%" cellPadding="10">
            <thead>
              <tr style={{ background: "#764ba2", color: "white" }}>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.type}</td>
                  <td>{t.category}</td>
                  <td>₹{t.amount}</td>
                  <td>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Category Analytics */}
      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2>📊 Category Analytics</h2>

        {Object.keys(categorySummary).length === 0 ? (
          <p>No Data Available</p>
        ) : (
          Object.keys(categorySummary).map((cat) => (
            <div key={cat} style={{ marginBottom: "15px" }}>
              <strong>{cat}</strong>

              <div
                style={{
                  height: "20px",
                  background: "#ddd",
                  borderRadius: "20px",
                  overflow: "hidden",
                  marginTop: "5px",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(
                      categorySummary[cat] / 10,
                      100
                    )}%`,
                    background:
                      "linear-gradient(to right,#36d1dc,#5b86e5)",
                    height: "100%",
                  }}
                ></div>
              </div>

              <p>₹{categorySummary[cat]}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#764ba2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

const cardStyle = {
  padding: "20px",
  borderRadius: "15px",
  minWidth: "220px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
};

export default App;