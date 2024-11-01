import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PurchaseResult.css";

const FailedPurchase = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate("/home");
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="purchase failed">
      <h1>Purchase Failed</h1>
      <h2>❌</h2>
      <p>Redirecting in {countdown} seconds...</p>
    </div>
  );
};

export default FailedPurchase;
