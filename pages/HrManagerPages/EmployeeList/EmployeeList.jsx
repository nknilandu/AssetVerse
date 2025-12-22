import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import { useQuery } from "@tanstack/react-query";
import { TiFlashOutline } from "react-icons/ti";
import { NavLink } from "react-router";

const EmployeeList = () => {
  const { user } = useContext(AuthContext);

  const {
    data: employees = [],
    refetch: refetchEmployees,
    isLoading: loading,
  } = useQuery({
    queryKey: ["myEmployeeList", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2031/employeeAffiliations/hr?hrEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      const data = await res.json();
      if (Array.isArray(data)) {
        return data;
      }
    },
  });

  const { data: employeeLimit = 0, refetch: refetchPackage } = useQuery({
    queryKey: ["myPackageLimit", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2031/users?email=${user.email}`,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      );
      const count = await res.json();
      return count.packageLimit;
    },
  });

//   console.log(employeeLimit);
//   console.log(employees);

  const handleRemove = (employeeEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this employee from the team?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    }).then(async (confirm) => {
      if (confirm.isConfirmed) {
        const res = await fetch(
          `http://localhost:2031/employeeAffiliations/${employeeEmail}`,
          {
            method: "DELETE",
            headers: { authorization: `Bearer ${user.accessToken}` },
          }
        );
        const result = await res.json();
        // console.log(result);

        if (result.deletedCount) {
          Swal.fire("Removed!", "Employee has been removed.", "success");
          refetchEmployees();
          refetchPackage();
        } else {
          Swal.fire("Error", "Failed to remove employee", "error");
        }
      }
    });
  };

  return (
    <div className="p-5">
      <title>Employee List | AssetVerse</title>
      <div className="w-full mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          My Employee List
        </h2>
        <p className="text-muted-foreground">
          Discover quality products from trusted suppliers worldwide
        </p>
      </div>

     {/* alert bar */}
     {
        employeeLimit<20 && (<div className="flex flex-col items-start mb-8 space-y-4 bg-warning/10 rounded-xl p-5">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-2">
            <p className="text-lg font-semibold text-warning">
              Approaching Package Limit ({employees.length}/{employeeLimit})
            </p>
            <p className="text-sm text-warning/80">
              You are currently using our basic plan or standard plan. You can upgrade your plan by purchasing a package.
            </p>
          </div>
          <NavLink to='/upgrade-package'>
            <button className="btn btn-sm btn-warning">
            <TiFlashOutline /> Upgrade Now
          </button>
          </NavLink>
        </div>
        <progress
          className="progress progress-warning w-full"
          value={employees.length}
          max={employeeLimit}
        ></progress>
      </div>)
     }


      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Employees ({employees.length}/{employeeLimit})
        </h2>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : employees.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Assets Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.employeeEmail}>
                  <td>
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={emp?.employeeLogo} alt={emp?.employeeName} />
                      </div>
                    </div>
                  </td>
                  <td>{emp?.employeeName}</td>
                  <td>{emp?.employeeEmail}</td>
                  <td>{new Date(emp?.affiliationDate).toLocaleDateString()}</td>
                  <td>{emp?.assetCount || 0}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error btn-outline"
                      onClick={() => handleRemove(emp?.employeeEmail)}
                    >
                      Remove
                    </button>
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

export default EmployeeList;
