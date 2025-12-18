import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiBox } from "react-icons/fi";
import { AuthContext } from "../../../provider/AuthProvider";

const AddAsset = () => {
  const [stateLoading, setStateLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setStateLoading(true);

    // Upload image to ImgBB
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_CLIENT_KEY
      }`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        // upload success
        const photoLink = result.data.display_url;

        // get hr company name
        fetch(`http://localhost:2031/users?email=${user.email}`)
          .then((res) => res.json())
          .then((temp) => {
            const companyName = temp.companyName;
            const companyLogo = temp.companyLogo;

            const assetInfo = {
              productName: data.name,
              productImage: photoLink,
              productType: data.type,
              productQuantity: Number(data.quantity),
              availableQuantity: Number(data.quantity),
              dateAdded: new Date(),
              hrEmail: user.email,
              companyName: companyName,
              companyLogo: companyLogo,
            };

            //updoad data in server
            fetch("http://localhost:2031/assets", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${user.accessToken}`,
              },
              body: JSON.stringify(assetInfo),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  // success
                  toast.success("success")
                  setStateLoading(false)
                  reset()
                } else {
                  // not success
                }
              })
              .catch((e) => {
                setStateLoading(false);
                toast.error("Couldn't upload data at database");
                console.error(e.message);
                return;
              });

            // ++++++++++++++++++++++++++
          })
          .catch((e) => {
            setStateLoading(false);
            toast.error("Database error");
            console.error(e.message);
            return;
          });
      });
  };

  //     // add data at database
  //     fetch("http://localhost:2031/assets", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //       body: JSON.stringify(userInfo),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.insertedId) {
  //           // success

  //           toast.success("Successfully Account Created");
  //           navigate(`${location.state ? location.state : "/"}`);
  //         } else {
  //           // failed
  //           toast.error("Failed to save user");
  //         }
  //         setStateLoading(false);
  //       })
  //       .catch((e) => {
  //         // error
  //         console.log(e.message);
  //         toast.error(e.message);

  //         setStateLoading(false);
  //       });
  //   })
  //   .catch((e) => {
  //     setStateLoading(false);

  //     toast.error("Image upload failed");
  //     console.error(e.message);
  //   });

  //   console.log(assetInfo.image)

  //   const res = await fetch("http://localhost:2031/assets", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(assetInfo),
  //   });

  //   const result = await res.json();

  //   if (result.insertedId) {
  //     toast.success("Asset added successfully");
  //     reset();
  //   } else {
  //     toast.error("Failed to save asset");
  //   }
  //   setLoading(false);

  return (
    <div className="min-h-[93svh] flex items-center px-4 py-20 bg-base-200">
      <div className="bg-base-100 rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FiBox className="text-primary" size={22} />
            <h1 className="text-2xl font-semibold">Add New Asset</h1>
          </div>
          <p className="text-sm text-base-content/40">
            Register a product into inventory
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

          {/* Product Image */}
          <div>
            <label className="block label mb-1">Product Image</label>
            <input
              {...register("image", { required: "Image is required" })}
              type="file"
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

          {/* Quantity */}
          <div>
            <label className="block label mb-1">Quantity</label>
            <input
              {...register("quantity", {
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

          {/* Error */}
          <div>
            {Object.values(errors)[0] && (
              <p className="text-sm text-red-500">
                {Object.values(errors)[0].message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={stateLoading}
            className={`w-full mt-4 p-2 rounded-lg text-white transition ${
              stateLoading ? "bg-primary/50" : "bg-primary hover:bg-primary/80"
            }`}
          >
            {stateLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Add Asset"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
