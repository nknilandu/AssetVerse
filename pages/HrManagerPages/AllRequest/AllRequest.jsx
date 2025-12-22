import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import { useQuery } from "@tanstack/react-query";

const AllRequest = () => {
  const { user } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allRequest", user, statusFilter],
    queryFn: async () => {
      const res = await fetch(
        `https://asset-verse-server-chi.vercel.app/requests/hr?hrEmail=${user.email}&status=${statusFilter}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const result = await res.json();
      if(result.data) {
        return result.data;
      }
    },
  });

  // Approve request
  const handleApprove = (id) => {
    // console.log(request)

    Swal.fire({
      title: "Approve request?",
      text: "This will assign the asset and deduct quantity.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
    }).then(async (result) => {
      if (!result.isConfirmed) {
        return;
      }

      // patch data
      const res = await fetch(
        `https://asset-verse-server-chi.vercel.app/requests/status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            requestStatus: "approved",
            approvalDate: new Date(),
            processedBy: user.email,
          }),
        }
      );
      const data = await res.json();

      if (data.modifiedCount) {
        Swal.fire("Approved!", "Asset assigned successfully.", "success");
        refetch();
      } else {
        Swal.fire("Error", "Approval failed", "error");
      }
    });
  };

  // Reject request
  const handleReject = async (id) => {
    Swal.fire({
      title: "Reject request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then(async (confirm) => {
        if (!confirm.isConfirmed) return;

        // patch data
      const res = await fetch(
        `https://asset-verse-server-chi.vercel.app/requests/status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            requestStatus: "rejected",
            approvalDate: new Date(),
            processedBy: user.email,
          }),
        }
      );
      const data = await res.json();

      if (data.modifiedCount) {
        Swal.fire("Rejected!", "Asset rejected successfully.", "success");
        refetch();
      } else {
        Swal.fire("Error", "Rejection failed", "error");
      }
    });

  };

  return (
    <div className="p-5">
      {/* Header */}
      <title>Request Asset | AssetVerse</title>
      <div className="flex justify-between items-center flex-col sm:flex-row gap-4 mb-6">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            All Request Asset
          </h2>
          <p className="text-muted-foreground">
            Discover quality products from trusted suppliers worldwide
          </p>
        </div>

        <select
          className="select select-bordered w-full sm:w-52 ml-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingComponent />
      ) : requests.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Asset</th>
                <th>Company</th>
                <th>Request Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>
                    <div className="font-medium">{req.requesterName}</div>
                    <div className="text-xs opacity-60">
                      {req.requesterEmail}
                    </div>
                  </td>

                  <td>
                    <div className="font-medium">{req.assetName}</div>
                    <div className="text-xs opacity-60">{req.assetType}</div>
                  </td>

                  <td>{req.companyName}</td>

                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>

                  <td>
                    <p
                      className={`badge badge-xs badge-soft ${
                        req.requestStatus === "pending"
                          ? "badge-warning"
                          : req.requestStatus === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {req.requestStatus}
                    </p>
                  </td>

                  <td className="text-center">
                    {req.requestStatus === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleApprove(req._id)}
                          className="btn btn-outline btn-sm btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="btn btn-sm btn-outline btn-error"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs opacity-50">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRequest;
