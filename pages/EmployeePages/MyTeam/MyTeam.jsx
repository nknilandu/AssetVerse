import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../provider/AuthProvider";

export default function MyTeam() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const { user } = useContext(AuthContext);

  // Get all affiliations for this employee
  const { data: affiliations = [], isLoading } = useQuery({
    queryKey: ["myAffiliations", user.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2031/employeeAffiliations?employeeEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      return res.json();
    },
  });

  // console.log(affiliations);

  // 2️⃣ Unique companies for dropdown
  const companies = useMemo(() => {
    return [...new Set(affiliations.map((a) => a.companyName))];
  }, [affiliations]);

  useEffect(() => {
    if (companies.length && !selectedCompany) {
      setSelectedCompany(companies[0]);
    }
  }, [companies, selectedCompany]);

  // 3️⃣ Team members in selected company
  const { data: team = [] } = useQuery({
    enabled: !!selectedCompany,
    queryKey: ["team", selectedCompany],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2031/employeeAffiliations/companyName?companyName=${selectedCompany}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      return res.json();
    },
  });

  // console.log(team);

  // 4️⃣ Upcoming birthdays (current month)
  const upcomingBirthdays = team.filter((member) => {
    if (!member.dateOfBirth) return false;
    return new Date(member.dateOfBirth).getMonth() === new Date().getMonth();
  });

  if (isLoading) return <p>Loading team...</p>;

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
          <label className="font-medium">Select Company</label>
          <select
            className="select select-bordered w-full max-w-sm mt-2"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {companies.map((company) => (
              <option key={company}>{company}</option>
            ))}
          </select>
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-3 gap-4">
          {team.map((member) => (
            <div
              key={member.employeeEmail}
              className="card bg-base-100 shadow-md"
            >
              <div className="card-body items-center text-center">
                <img
                  src={member.employeeLogo}
                  alt={member.employeeName}
                  className="w-16 h-16 rounded-full"
                />
                <h3 className="font-semibold mt-2">{member.employeeName}</h3>
                <p className="text-sm text-gray-500">{member.employeeEmail}</p>
                <p className="text-sm">{member.position || "Employee"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Birthdays */}
        {upcomingBirthdays.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              🎂 Upcoming Birthdays (This Month)
            </h2>
            <ul className="space-y-1">
              {upcomingBirthdays.map((member) => (
                <li key={member.employeeEmail}>
                  {member.employeeName} —{" "}
                  {new Date(member.dateOfBirth).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
