import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { FiPrinter } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";


const MyAssets = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch assigned assets
  useEffect(() => {
    if (!user?.email || !user?.accessToken) return;

    fetch(
      `http://localhost:2031/requests?requesterEmail=${user.email}&search=${search}&assetType=${filterType}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setAssets(data);
      })
      .catch((e) => {
        setLoading(false);
        toast.error("Could not fetch data");
        console.log(e);
      });
  }, [user, search, filterType]);

  // Handle "Return" action
  const handleReturn = async (requestId) => {
    // try {
    //   const res = await fetch(`http://localhost:2031/requests/${requestId}`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${user.accessToken}`,
    //     },
    //     body: JSON.stringify({
    //       requestStatus: "returned",
    //       approvalDate: new Date(),
    //     }),
    //   });
    //   const result = await res.json();

    //   if (result.modifiedCount) {
    //     Swal.fire({ icon: "success", title: "Asset marked as returned!" });
    //     setAssets((prev) =>
    //       prev.map((a) =>
    //         a._id === requestId ? { ...a, requestStatus: "returned" } : a
    //       )
    //     );
    //   } else {
    //     Swal.fire({ icon: "error", title: "Failed to update status" });
    //   }
    // } catch (err) {
    //   Swal.fire({ icon: "error", title: "Error", text: err.message });
    // }
  };

  // Handle print
  const handlePrint = () => {
    const printContent = document.getElementById("printArea").innerHTML;
    const newWin = window.open("");
    newWin.document.write(printContent);
    newWin.document.close();
    newWin.print();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by Asset Name"
          className="input input-bordered w-full sm:w-64"
          value={search}
          onChange={(e) => {
            setLoading(true);
            setSearch(e.target.value);
          }}
        />
        <select
          className="input input-bordered w-full sm:w-52"
          value={filterType}
          onChange={(e) => {
            setLoading(true);
            setFilterType(e.target.value);
          }}
        >
          <option value="">All Types</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-returnable</option>
        </select>

      
            <button onClick={handlePrint} className="btn btn-primary ml-auto flex items-center gap-2">
              <FiPrinter /> Print
            </button>

        
      </div>

      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : assets.length === 0 ? (
        <NoDataFound></NoDataFound>
      ) : (
        <div className="overflow-x-auto" id="printArea">
          <table className="table table-zebra w-full">
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
                    <p className={`badge badge-xs badge-soft rounded-full ${asset.requestStatus==="approved"?"badge-success":asset.requestStatus==="pending"?"badge-warning":"badge-error"}`}>
                        {asset.requestStatus}
                    </p>
                    </td>
                  <td>
                    {
                    asset.requestStatus === "approved" &&
                      asset.assetType === "returnable" && (
                        <button
                          className="btn btn-sm btn-warning btn-outline"
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
