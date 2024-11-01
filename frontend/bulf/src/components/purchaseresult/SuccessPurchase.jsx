import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PurchaseResult.css";

const SuccessPurchase = () => {
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
    <div className="purchase success">
      <h1>Purchase Successful!</h1>
      <h2>✔️</h2>
      <p>Redirecting in {countdown} seconds...</p>
    </div>
  );
};

export default SuccessPurchase;
