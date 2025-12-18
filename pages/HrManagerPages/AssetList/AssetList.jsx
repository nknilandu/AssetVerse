import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiBox, FiSearch } from "react-icons/fi";
import { IoPlanetOutline } from "react-icons/io5";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import { AuthContext } from "../../../provider/AuthProvider";


const AssetList = () => {

    const { user } = useContext(AuthContext)
    const [ assetsData ,setAssetsData] = useState([])
    const [ stateLoading ,setStateLoading] = useState(true)

    useEffect(()=>{       

        fetch(`http://localhost:2031/assets?email=${user.email}`)
            .then(res=>res.json())
            .then(data=> {
                setAssetsData(data)
                setStateLoading(false)
            })
            .catch(e=>{
                setStateLoading(false)
                toast.error("Could not fatch data");
                console.log(e)
            })

    }, [user.email])


    const hanldeDelete = (id) => {
        console.log(id)
    }





  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    // console.log(searchText)

    fetch(`http://localhost:2031/assets?email=${user.email}&search=${searchText}`)
            .then(res=>res.json())
            .then(data=> {
                setAssetsData(data)
                setStateLoading(false)
            })
            .catch(e=>{
                setStateLoading(false)
                toast.error("Could not fatch data");
                console.log(e)
            })
  };






  return (
    <div className="p-5">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          All Asset List
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
                className="input text-sm py-2 pl-12 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
            <button disabled={stateLoading} className="btn btn-primary rounded-md">Search</button>
          </form>
          <div className="flex justify-center items-center gap-2">
            <IoPlanetOutline size={20} />
            <p>Total {assetsData.length} Assets found</p>
          </div>
          {/* =============== */}
        </div>
      </div>
      {/* ================ table =================== */}

      {
        stateLoading ? (
            <LoadingComponent></LoadingComponent>
        ) : assetsData.length===0 ? (
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
                <th>{index + 1}</th>

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
                    <button className="btn btn-sm  btn-outline btn-info">
                      Edit
                    </button>
                    <button onClick={()=>hanldeDelete(asset._id)} className="btn btn-sm btn-outline btn-error">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        )
      }

      {/* =============================== */}
    </div>
  );
};

export default AssetList;
