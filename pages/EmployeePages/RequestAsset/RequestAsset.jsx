import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { IoPlanetOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

const RequestAsset = () => {
  const { user } = useContext(AuthContext);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const [totalAsset, setTotalAsset] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["RequestAssetEmployee", user, currentPage, search],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2031/assets?quantity=true&limit=10&skip=${
          currentPage * 10
        }&search=${search.trim()}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const result = await res.json();
      setTotalAsset(result.totalData);
      setTotalPage(Math.ceil(result.totalData / 10));
      return result.assetData;
    },
  });

  console.log(totalPage);
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    setCurrentPage(0);
  };

  return (
    <div className="p-5">
      <title>Request Asset | AssetVerse</title>

      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Request Asset
        </h2>
        <p className="text-muted-foreground">
          Discover quality products from trusted suppliers worldwide
        </p>
      </div>

      {/* searchbar */}
      <div className="w-full bg-base-100 border border-base-content/10 p-5 rounded-xl  my-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* ================ */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10">
                <FiSearch className="h-5 w-5" />
              </div>

              <input
                type="text"
                name="search"
                placeholder="Search anything"
                className="input text-sm py-2 pl-12 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button disabled={isLoading} className="btn btn-primary rounded-md">
              Search
            </button>
          </form>
          <div className="flex justify-center items-center gap-2">
            <IoPlanetOutline size={20} />
            <p>Total {totalAsset} Assets found</p>
          </div>
          {/* =============== */}
        </div>
      </div>

      {isLoading ? (
        <LoadingComponent></LoadingComponent>
      ) : totalAsset === 0 ? (
        <NoDataFound></NoDataFound>
      ) : (
        <div>
          {/* Grid */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {assets.map((asset) => (
              <div
                key={asset._id}
                className="card bg-base-100 w-full shadow-sm hover:shadow-2xl transition-all border border-base-content/5"
              >
                <figure>
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="object-cover h-48 w-full"
                  />
                </figure>
                <p className="-mb-4 mt-4 mx-6 badge badge-xs badge-primary badge-soft">
                  {asset.productType}
                </p>
                <div className="card-body">
                  <h2 className="card-title">{asset.productName}</h2>

                  <p className="text-md ">
                    Available Quantity: {asset.availableQuantity}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary btn-outline btn-sm"
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
          {/* ============= pagination =============== */}
          <div className="flex items-center justify-center m-6">
            <div className="join">
              {[...Array(totalPage).keys()].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentPage(item);
                  }}
                  className={`join-item btn ${
                    currentPage === item && "btn-secondary"
                  }`}
                >
                  {item + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============= Modal ============== */}
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
