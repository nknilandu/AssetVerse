import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";

const RequestAsset = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  // Fetch available assets
  useEffect(() => {
    fetch("http://localhost:2031/assets?quantity=true")
      .then((res) => res.json())
      .then((data) => setAssets(data));
  }, []);

  //   console.log(user)

  // Submit request
  const onSubmit = async (data) => {
    // console.log("data:", data, selectedAsset);
    if (!selectedAsset) return;
    setLoading(true);

    fetch("http://localhost:2031/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        assetId: selectedAsset._id,
        assetName: selectedAsset.productName,
        assetImage: selectedAsset.productImage,
        assetType: selectedAsset.productType,
        requesterName: user.displayName,
        requesterEmail: user.email,
        hrEmail: selectedAsset.hrEmail,
        companyName: selectedAsset.companyName,
        requestDate: new Date(),
        approvalDate: null, // null if pending
        requestStatus: "pending", // "pending" | "approved" | "rejected" | "returned",
        note: data.note,
        processedBy: null, // HR email who acted
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);

        // console.log(result)

        if (result.insertedId) {
          // success
          Swal.fire({
            icon: "success",
            title: "Request submitted!",
            text: `Your request for ${selectedAsset.productName} is pending.`,
          });
          reset();
          setSelectedAsset(null);
        } else {
          // failed
          Swal.fire({ icon: "error", title: "Failed to submit request" });
        }
        document.getElementById("request_modal").close();
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({ icon: "error", title: "Error", text: err.message });
        document.getElementById("request_modal").close();
      });
  };

  return (
    <div className="p-6">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {assets.map((asset) => (
          <div key={asset._id} className="card bg-base-100 w-full shadow-sm">
            <figure>
              <img
                src={asset.productImage}
                alt={asset.productName}
                className="object-cover h-48 w-full"
              />
            </figure>
            <p className="-mb-4 mt-4 mx-6 badge badge-primary badge-soft">
              {asset.productType}
            </p>
            <div className="card-body">
              <h2 className="card-title">{asset.productName}</h2>

              <p className="text-md ">Available: {asset.productQuantity}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setSelectedAsset(asset);
                    document.getElementById("request_modal").showModal();
                  }}
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <dialog id="request_modal" className="modal">
        <div className="modal-box max-w-md">
          <form method="dialog" className="absolute right-2 top-2">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>

          <h3 className="font-bold text-lg mb-4">Request Asset</h3>
          {selectedAsset && (
            <p className="mb-2">
              You are requesting: <strong>{selectedAsset.productName}</strong>
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <textarea
              {...register("note")}
              placeholder="Add a note (optional)"
              className="textarea textarea-bordered w-full"
            />
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading && "loading"}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAsset;
