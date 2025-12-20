import { XCircle } from "lucide-react";
import { Link } from "react-router";

const PaymentCancelled = () => {

  return (
    <div className="h-[93svh] flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center">
          {/* Cancel Icon */}
          <div className="flex justify-center">
            <XCircle className="w-20 h-20 text-error" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mt-4">
            Payment Cancelled
          </h2>

          <p className="text-gray-500 mt-2">
            Your payment was cancelled. No amount has been charged.
          </p>

          {/* Divider */}
          <div className="divider"></div>

          {/* Payment Details */}
          <div className="text-left space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Transaction ID:</span>
              <br />
              <span className="text-gray-600 break-all">
                N/A
              </span>
            </p>

            <p className="text-sm">
              <span className="font-semibold">Payment ID:</span>
              <br />
              <span className="text-gray-600 break-all">
                N
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="card-actions justify-center mt-6 gap-2">
            <Link to="/upgrade-package" className="btn btn-primary w-full sm:w-auto">
              Try Again
            </Link>
            <Link to="/dashboard" className="btn btn-soft btn-primary w-full sm:w-auto">
              Go Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
