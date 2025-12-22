import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user, updateUserProfile, userRole } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const { data: affiliations = [] } = useQuery({
    queryKey: ["userAffiliations", user.email],
    queryFn: async () => {
      const res = await fetch(
        `https://asset-verse-server-chi.vercel.app/employeeAffiliations?employeeEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const affiliationsResult = await res.json();
      return affiliationsResult;
    },
  });

  //   console.log(affiliations)

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    let photoURL = null;

    if (photo) {
      const formData = new FormData();
      formData.append("image", photo);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_IMG_CLIENT_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgData = await imgRes.json();

      if (!imgData.success) {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong.",
          icon: "error",
        });
        setLoading(false);

        return;
      }
      photoURL = imgData.data.display_url;
    }

    await updateUserProfile({
      displayName: name,
      ...(photoURL && { photoURL }),
    });

    const updateUsers = await fetch(
      `https://asset-verse-server-chi.vercel.app/users?email=${user.email}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          name,
          ...(photoURL && { photoURL }),
        }),
      }
    );

    const resultData = await updateUsers.json();

    if (!resultData.modifiedCount) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong.",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    Swal.fire({
      title: "Success!",
      text: "Successfully profile updated.",
      icon: "success",
    });
    setLoading(false);
  };

  if (!user) return <LoadingComponent />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <title>Profile | AssetVerse</title>
      {/* Profile Card */}
      <div className="card bg-base-200 shadow-md">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">My Profile</h2>

          <form onSubmit={handleUpdate} className="grid gap-4 sm:grid-cols-2">
            {/* Photo */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-6 items-center">
              <img
                src={user.photoURL}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="w-full">
                <label className="label">Photo Url</label>
                <input
                  type="file"
                  name="photo"
                  className="input input-bordered w-full file-input"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full bg-base-300"
                value={user.email}
                disabled
              />
            </div>

            <div className="sm:col-span-2">
              <button disabled={loading} className="btn btn-primary w-full">
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Affiliations */}
      {userRole === null ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        userRole === "employee" && (
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-4">
                Company Affiliations
              </h2>

              {affiliations.length === 0 ? (
                <p className="text-sm opacity-60">No active affiliations</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {affiliations.map((aff) => (
                    <div
                      key={aff._id}
                      className="border border-base-content/10 bg-base-100 rounded-lg p-4 flex gap-4 items-center"
                    >
                      <img
                        src={aff.companyLogo}
                        alt={aff.companyName}
                        className="w-12 h-12 rounded"
                      />
                      <div>
                        <p className="font-medium">{aff.companyName}</p>
                        <p className="text-sm opacity-60">
                          Joined:{" "}
                          {new Date(aff.affiliationDate).toLocaleDateString()}
                        </p>
                        <span className="badge badge-success badge-xs mt-1">
                          {aff.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
