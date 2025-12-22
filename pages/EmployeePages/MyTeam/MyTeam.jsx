import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../provider/AuthProvider";
import LoadingPage from "../../errorpages/LoadingPage/LoadingPage";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

export default function MyTeam() {
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const { user } = useContext(AuthContext);

  // Get all company data
  const { data: company = [], isLoading } = useQuery({
    queryKey: ["allCompanyData", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2031/employeeAffiliations?employeeEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const result = await res.json();
      console.log(result);
      if (Array.isArray(result)) {
        if (result.length !== 0) {
          setSelectedCompanyId(result[0]._id);
        }
        return result;
      }
    },
  });

  // Get all affiliations data
  const { data: team = [], isLoading: teamLoading } = useQuery({
    queryKey: ["companyAffiliationData", user, selectedCompanyId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2031/employeeAffiliations/companyAffiliations?affiliationId=${selectedCompanyId}&employeeEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      const result = await res.json();
      if (Array.isArray(result)) {
        return result;
      }
    },
  });

  // ================= get next birthday in this month ==========================
  const today = new Date();
  const currentMonth = today.getMonth();

  // Filter birthdays in this month and date >= today
  const upcomingBirthdays =
    team
      .filter((member) => {
        if (!member.dateOfBirth) return false;
        const dob = new Date(member.dateOfBirth);
        return (
          dob.getMonth() === currentMonth && dob.getDate() >= today.getDate()
        );
      })
      // Sort by day ascending
      .sort(
        (a, b) =>
          new Date(a.dateOfBirth).getDate() - new Date(b.dateOfBirth).getDate()
      ) || [];

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <div className="p-5">
      <title>My Team | AssetVerse</title>
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          My Team List
        </h2>
        <p className="text-muted-foreground">
          Discover quality products from trusted suppliers worldwide
        </p>
      </div>
      {/* ============== */}

      <div className="space-y-6">
        {/* Company Selector */}
        <div className="flex flex-col mt-10">
          <label className="label text-sm mb-1">Your Affiliated Company</label>
          <select defaultValue="Pick a color" className="select">
            <option disabled={true}>Select a company</option>
            {company.map((company) => (
              <option
                key={company._id}
                onClick={() => setSelectedCompanyId(company._id)}
              >
                {company.companyName}
              </option>
            ))}
          </select>
        </div>
        {teamLoading ? (
          <LoadingComponent></LoadingComponent>
        ) : team.length === 0 || company.length === 0 ? (
          <NoDataFound></NoDataFound>
        ) : (
          <div>
            {/* Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {team.map((member) => (
                <div
                  key={member.employeeEmail}
                  className="card bg-base-100 shadow-sm hover:shadow-xl transition-all border border-base-content/5"
                >
                  <div className="flex justify-center ">
                    <div className="avatar h-full ml-5 flex items-center ">
                      <div className="ring-primary ring-offset-base-100 w-14 h-14 rounded-full ring-2 ring-offset-2 mb-4">
                        <img
                          className="h-full object-cover"
                          src={member.employeeLogo}
                          alt={member.employeeName}
                        />
                      </div>
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">{member.employeeName}</h2>
                      <p>{member.employeeEmail}</p>
                      <div className="mt-2 badge badge-outline badge-success badge-xs">
                        {member.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Birthdays */}
            {upcomingBirthdays.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2 mt-10">
                  Upcoming Birthdays (This Month)
                </h2>

                <div className="overflow-x-auto mt-5">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Birthday Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingBirthdays.map((member) => (
                        <tr key={member.employeeEmail}>
                          <th>
                            <img
                              src={member.employeeLogo}
                              alt={member.employeeName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          </th>
                          <td>
                            <p>{member.employeeName}</p>
                          </td>
                          <td>
                            <p>{member.employeeEmail}</p>
                          </td>
                          <td>
                            <p>
                              {new Date(
                                member.dateOfBirth
                              ).toLocaleDateString()}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
