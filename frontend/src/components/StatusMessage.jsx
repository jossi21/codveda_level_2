import React from "react";

const StatusMessage = ({ message, type }) => {
  return (
    <div
      className={`p-4 rounded-md mb-10 ${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
    >
      {message}
    </div>
  );
};

export default StatusMessage;
