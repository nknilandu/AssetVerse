import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import { useQuery } from "@tanstack/react-query";

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
        `http://localhost:2031/employeeAffiliations?hrEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      const data = await res.json();
      return data;
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

  console.log(employeeLimit);
  console.log(employees);

  const handleRemove = (employeeEmail) => {

    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to remove this employee from the team?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove",
      }).then(async (confirm)=> {

         if (confirm.isConfirmed) {
            const res = await fetch(
            `http://localhost:2031/employeeAffiliations/${employeeEmail}`,
            {
              method: "DELETE",
              headers: { authorization: `Bearer ${user.accessToken}` },
            }
          );
          const result = await res.json();
          console.log(result)

          if (result.deletedCount) {
            Swal.fire("Removed!", "Employee has been removed.", "success");
            refetchEmployees()
            refetchPackage()
          } else {
            Swal.fire("Error", "Failed to remove employee", "error");
          }

         }
      })
  };

  return (
    <div className="p-5">
        <title>Employee List | AssetVerse</title>
        <div className="w-full mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            All Request Asset
          </h2>
          <p className="text-muted-foreground">
            Discover quality products from trusted suppliers worldwide
          </p>
        </div>




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
