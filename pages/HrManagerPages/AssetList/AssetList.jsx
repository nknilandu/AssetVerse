import { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoPlanetOutline } from "react-icons/io5";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { NavLink } from "react-router";
import PieChartAsset from "./components/PieChartAsset/PieChartAsset";
import BarChartAsset from "./components/BarChartAsset/BarChartAsset";
import { useQuery } from "@tanstack/react-query";

const AssetList = () => {
  const { user } = useContext(AuthContext);

  const [totalAsset, setTotalAsset] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const {
    data: assetsData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["AllAssetListHr", user, currentPage, search],
    queryFn: async () => {
      const res = await fetch(
        `https://asset-verse-server-chi.vercel.app/assets/hr?email=${user.email}&limit=10&skip=${
          currentPage * 10
        }&search=${search.trim()}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const result = await res.json();
      if(result.count){
        setTotalAsset(result.count);
        setTotalPage(Math.ceil(result.count / 10));
      }
      // console.log(result)
      return result.data;
    }
  });


  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    setTotalAsset(0);
    setCurrentPage(0);
  };

  // delete item
  const hanldeDelete = (id) => {
    // console.log(id)

    Swal.fire({
      title: "Are you sure want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      theme: "auto",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // ======================= delete user
        // console.log(id)
        fetch(`https://asset-verse-server-chi.vercel.app/assets/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data)
            if (data.deletedCount) {
              // success
              Swal.fire({
                theme: "auto",
                title: "Successfully Asset Deleted!",
                icon: "success",
                draggable: false,
              });
              // ============ update ui
              refetch();
            } else {
              // error
              Swal.fire({
                theme: "auto",
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          });
        // ===========
      }
    });
  };

  return (
    <div className="p-5">
      <title>Assets List | AssetVerse</title>
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          All Asset List
        </h2>
        <p className="text-muted-foreground">
          Discover quality products from trusted suppliers worldwide
        </p>
      </div>
      {/* ============== */}

      <div className="flex flex-col md:flex-row gap-4 w-full mt-5">
        <div className="flex-1">
          <PieChartAsset></PieChartAsset>
        </div>
        <div className="flex-1">
          <BarChartAsset></BarChartAsset>
        </div>
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
      {/* ================ table =================== */}

      {isLoading ? (
        <LoadingComponent></LoadingComponent>
      ) : assetsData.length === 0 ? (
        <NoDataFound></NoDataFound>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table head */}
            <thead>
              <tr>
                <th>no.</th>
                <th>Asset</th>
                <th>Name</th>
                <th>Type</th>
                <th>Total Qty</th>
                <th>Available</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {assetsData.map((asset, index) => (
                <tr key={asset._id}>
                  <th>{index + 1 + currentPage * 10}</th>

                  {/* Asset image + name */}
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-10">
                        <img src={asset.productImage} />
                      </div>
                    </div>
                  </td>

                  <td className="">{asset.productName}</td>
                  <td className="capitalize">{asset.productType}</td>
                  <td>{asset.productQuantity}</td>
                  <td>{asset.availableQuantity}</td>
                  <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>

                  {/* Actions */}
                  <td>
                    <div className="space-x-2 flex">
                      <NavLink to={`/update-asset/${asset._id}`}>
                        <button className="btn btn-sm btn-outline btn-info">
                          Edit
                        </button>
                      </NavLink>
                      <button
                        onClick={() => hanldeDelete(asset._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ============= pagination =============== */}
          <div className="flex items-center justify-center m-6">
            <div className="join  flex flex-wrap items-center justify-center">
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

      {/* =============================== */}
    </div>
  );
};

export default AssetList;
