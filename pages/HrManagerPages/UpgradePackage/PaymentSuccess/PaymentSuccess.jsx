import { CheckCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { AuthContext } from "../../../../provider/AuthProvider";

const PaymentSuccess = () => {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [transactionId, setTransactionId] = useState("N/A");
  const [trackingId, setTrackingId] = useState("N/A");
  const [status, setStatus] = useState("pending");

  // console.log(sessionId)

  useEffect(() => {
    if (sessionId) {
      fetch(
        `http://localhost:2031/verify-payment-success?session_id=${sessionId}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
            email: user.email,
          },
          body: JSON.stringify({ email: user.email }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setStatus(data.status);
          setTrackingId(data.trackingId);
          setTransactionId(data.transactionId);
        });
    }
  }, [sessionId, user]);

  return (
    <div className="h-[93svh] flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center">
          {/* Success Icon */}
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-success" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mt-4">Payment Successful!</h2>

          <p className="text-gray-500 mt-2">
            Thank you! Your payment has been processed successfully.
          </p>

          {/* Divider */}
          <div className="divider"></div>

          {/* Payment Details */}
          <div className="text-left space-y-2">
            <p className="text-sm font-semibold">
              Email:
              <span className="font-normal"> {user.email}</span>
            </p>
            <p className="text-sm font-semibold">
              Transaction ID:
              <span className="font-normal"> {transactionId}</span>
            </p>

            <p className="text-sm font-semibold">
              Tracking ID:
              <span className="font-normal"> {trackingId}</span>
            </p>
            <p className="text-sm font-semibold">
              Status:
              <span className="font-normal"> {status}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="card-actions justify-center mt-6">
            <Link to="/dashboard" className="btn btn-primary w-full sm:w-auto">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
