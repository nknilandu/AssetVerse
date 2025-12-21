import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../../provider/AuthProvider";
import { FiBox } from "react-icons/fi";
import Swal from "sweetalert2";

const UpdateAsset = () => {
  const { id } = useParams();
  const [stateLoading, setStateLoading] = useState(false);
  const [assetData, setAssetData] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`http://localhost:2031/assets?email=${user.email}&id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAssetData(data[0] || null);
      });
  }, [user, id]);

  useEffect(() => {
    if (assetData) {
      setValue("name", assetData.productName);
      setValue("type", assetData.productType);
      setValue("totalQty", assetData.productQuantity);
      setValue("avlQty", assetData.availableQuantity);
      setValue("imgLink", assetData.productImage);
    }
  }, [assetData, setValue]);

  // console.log(assetData)

  // update code
  const onSubmit = (data) => {
    setStateLoading(true);

    const updateData = {
      productImage: data.imgLink,
      productName: data.name,
      productQuantity: Number(data.totalQty),
      availableQuantity: Number(data.avlQty),
      productType: data.type,
    };

    //  ====================
    fetch(`http://localhost:2031/assets/${assetData._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
        email: user.email,
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((result) => {
        setStateLoading(false);
        // console.log(data)
        if (result.modifiedCount) {
          // success
          Swal.fire({
            theme: "auto",
            title: "Successfully Product Updated!",
            icon: "success",
            draggable: false,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        // error
        Swal.fire({
          theme: "auto",
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="min-h-[93svh] flex items-center px-4 py-20 bg-base-200">
      <div className="bg-base-100 rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FiBox className="text-primary" size={22} />
            <h1 className="text-2xl font-semibold">Update your Asset</h1>
          </div>
          <p className="text-sm text-base-content/40">
            update a product into inventory
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Product Name */}
          <div>
            <label className="block label mb-1">Product Name</label>
            <input
              {...register("name", { required: "Product name is required" })}
              type="text"
              name="name"
              placeholder="e.g. MacBook Pro"
              className="input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          {/* Product Image url */}
          <div>
            <label className="block label mb-1">Product Image Link</label>
            <input
              {...register("imgLink", { required: "Image is required" })}
              type="text"
              placeholder="image url link"
              className="file-input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block label mb-1">Product Type</label>

            <select
              {...register("type", {
                required: "Product type is required",
              })}
              defaultValue=""
              className="input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="" disabled>
                Pick product type
              </option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-returnable</option>
            </select>
          </div>

            <div className="flex gap-2">
                        {/* total Quantity */}
          <div>
            <label className="block label mb-1">Total Quantity</label>
            <input
              {...register("totalQty", {
                required: "Quantity is required",
                min: { value: 1, message: "Minimum quantity is 1" },
              })}
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 10"
              className="input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          {/*available Quantity */}
          <div>
            <label className="block label mb-1">Available Quantity</label>
            <input
              {...register("avlQty", {
                required: "Quantity is required",
                min: { value: 0, message: "Minimum quantity is 0" },
              })}
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 10"
              className="input text-sm w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
            </div>


          {/* Error */}
          <div>
            {Object.values(errors)[0] && (
              <p className="text-sm text-red-500">
                {Object.values(errors)[0].message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 btn btn-soft btn-primary rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={stateLoading}
              className={`flex-1 p-2 rounded-lg text-white transition ${
                stateLoading
                  ? "bg-primary/50"
                  : "bg-primary hover:bg-primary/80"
              }`}
            >
              {stateLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Update Asset"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAsset;
