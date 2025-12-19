import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

const MyTeam = () => {
  const { user } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch companies HR manages
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:2031/companies?hrEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        if (data.length) setSelectedCompany(data[0].companyName);
      })
      .catch(console.error);
  }, [user]);

  // Fetch employees for selected company
  useEffect(() => {
    if (!user?.email || !selectedCompany) return;
    setLoading(true);

    fetch(
      `http://localhost:2031/employees?hrEmail=${user.email}&companyName=${selectedCompany}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, selectedCompany]);

  // Filter upcoming birthdays in current month
  const upcomingBirthdays = employees.filter((emp) => {
    const birthDate = new Date(emp.affiliationDate); // replace with birthday field if exists
    return birthDate.getMonth() === new Date().getMonth();
  });

  return (
    <div className="p-6">
      {/* Company Selection */}
      <div className="mb-4 flex gap-4">
        {companies.map((c) => (
          <button
            key={c.companyName}
            onClick={() => setSelectedCompany(c.companyName)}
            className={`btn btn-sm ${
              selectedCompany === c.companyName ? "btn-primary" : "btn-outline"
            }`}
          >
            {c.companyName}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingComponent />
      ) : employees.length === 0 ? (
        <NoDataFound />
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2">Employees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {employees.map((emp) => (
              <div key={emp.employeeEmail} className="card shadow p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                    {emp.employeeName[0]}
                  </div>
                  <div>
                    <h3 className="font-medium">{emp.employeeName}</h3>
                    <p className="text-sm text-gray-500">{emp.employeeEmail}</p>
                    <p className="text-sm text-gray-500">{emp.position || "-"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Birthdays */}
          {upcomingBirthdays.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Upcoming Birthdays
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {upcomingBirthdays.map((emp) => (
                  <div
                    key={emp.employeeEmail}
                    className="card shadow p-4 border border-yellow-300"
                  >
                    <h3 className="font-medium">{emp.employeeName}</h3>
                    <p className="text-sm text-gray-500">{emp.employeeEmail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTeam;
