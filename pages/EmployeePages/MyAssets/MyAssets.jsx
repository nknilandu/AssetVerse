import React, { useState, useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { FiPrinter } from "react-icons/fi";
import Swal from "sweetalert2";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import { useQuery } from "@tanstack/react-query";
// import { useReactToPrint } from "react-to-print";

const MyAssets = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myAssets", user?.email, search, filterType],
    queryFn: async () => {
      const res = await fetch(
        `https://asset-verse-server-chi.vercel.app/requests/?requesterEmail=${user.email}&search=${search}&assetType=${filterType}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const result = await res.json();
      if (result.data) {
        return result.data;
      }
    },
  });

  // handle return
  const handleReturn = async (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to return a asset!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return it!",
    }).then(async (result) => {
      if (!result.isConfirmed) {
        return;
      }

      const res = await fetch(
        `https://asset-verse-server-chi.vercel.app/requests/return/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            requestStatus: "returned",
          }),
        }
      );
      const resultData = await res.json();

      if (resultData.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Asset marked as returned!",
        });
      } else {
        Swal.fire({ icon: "error", title: "Failed to update status" });
      }
    });
  };

  // const printRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  //   documentTitle: "User-Report",
  // });

  // Handle print
  const handlePrint = () => {
    const printContent = document.getElementById("printArea").innerHTML;
    const newWin = window.open("");
    newWin.document.write(printContent);
    newWin.document.close();
    newWin.print();
  };

  return (
    <div className="p-5">
      <title>My Assets | AssetVerse</title>
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          My Asset List
        </h2>
        <p className="text-muted-foreground">
          Discover quality products from trusted suppliers worldwide
        </p>
      </div>
      {/* ============== */}

      <div className="w-full bg-base-100 border border-base-content/10 p-5 rounded-xl  my-5">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search by Asset Name"
            className="input input-bordered w-full sm:w-64"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <select
            className="input input-bordered w-full sm:w-52"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="">All Types</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>

          <button
            onClick={handlePrint}
            className="btn btn-primary ml-auto flex items-center gap-2"
          >
            <FiPrinter /> Print
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingComponent></LoadingComponent>
      ) : assets.length === 0 ? (
        <NoDataFound></NoDataFound>
      ) : (
        <div
          className="overflow-x-auto"
          id="printArea"
          // ref={printRef}
        >
          <table className="table table-zebra w-full ">
            <thead>
              <tr>
                <th>Image</th>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset._id}>
                  <td>
                    <img
                      src={asset.assetImage}
                      alt={asset.assetName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetType}</td>
                  <td>{asset.companyName}</td>
                  <td>{new Date(asset.requestDate).toLocaleDateString()}</td>
                  <td>
                    {asset.approvalDate
                      ? new Date(asset.approvalDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <p
                      className={`badge badge-xs badge-soft rounded-full ${
                        asset.requestStatus === "approved"
                          ? "badge-success"
                          : asset.requestStatus === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {asset.requestStatus}
                    </p>
                  </td>
                  <td>
                    {asset.requestStatus === "approved" &&
                      asset.assetType === "returnable" && (
                        <button
                          className="btn btn-sm btn-info btn-outline"
                          onClick={() => handleReturn(asset._id)}
                        >
                          Return
                        </button>
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

export default MyAssets;
