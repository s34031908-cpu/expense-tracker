import React, { useState } from "react";

function App() {
  const [employee, setEmployee] = useState("");
  const [reason, setReason] = useState("");
  const [filter, setFilter] = useState("");
  const [leaves, setLeaves] = useState([]);

  const applyLeave = () => {
    if (!employee || !reason) {
      alert("Please fill all fields");
      return;
    }

    const newLeave = {
      id: Date.now(),
      employee,
      reason,
      status: "Pending",
    };

    setLeaves([...leaves, newLeave]);
    setEmployee("");
    setReason("");
  };

  const updateStatus = (id, status) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  const filteredLeaves = leaves.filter((leave) =>
    leave.employee.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#667eea,#764ba2,#6dd5ed)",
        padding: "30px",
        fontFamily: "Segoe UI",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          background: "#fff",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "25px",
          }}
        >
          🏢 HR Employee Leave Management Tool
        </h1>

        <div
          style={{
            background: "#f5f7ff",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          <h2>📝 Apply Leave</h2>

          <input
            type="text"
            placeholder="Employee Name"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Leave Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={applyLeave}
            style={applyBtn}
          >
            Apply Leave
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="🔍 Search Employee"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              ...inputStyle,
              width: "300px",
            }}
          />
        </div>

        <h2>📋 Leave History</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#667eea",
                color: "white",
              }}
            >
              <th style={thStyle}>Employee</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave.id}>
                <td style={tdStyle}>{leave.employee}</td>
                <td style={tdStyle}>{leave.reason}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "white",
                      background:
                        leave.status === "Approved"
                          ? "green"
                          : leave.status === "Rejected"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {leave.status}
                  </span>
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      updateStatus(
                        leave.id,
                        "Approved"
                      )
                    }
                    style={approveBtn}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        leave.id,
                        "Rejected"
                      )
                    }
                    style={rejectBtn}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#666",
          }}
        >
          Total Leave Requests: {leaves.length}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  margin: "8px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  width: "250px",
};

const applyBtn = {
  padding: "12px 20px",
  background: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const approveBtn = {
  background: "green",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "5px",
};

const rejectBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const thStyle = {
  padding: "12px",
};

const tdStyle = {
  padding: "12px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};

export default App;