import { useState } from "react";

function ReportsPage() {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Political Parties Compliance Report.pdf",
      department: "Compliance and Regulation Department",
      uploadedAt: "2024-07-03",
    },
    {
      id: 2,
      name: "Field Services Summary.docx",
      department: "Registration and Field Services Department",
      uploadedAt: "2024-07-04",
    },
  ]);

  return (
    <div className="p-8 bg-[#f4f9ff] min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Reports</h1>

      <div className="bg-white p-6 rounded shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#abc9e8] text-[#002147]">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Uploaded At</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="p-3">{report.name}</td>
                <td className="p-3">{report.department}</td>
                <td className="p-3">{report.uploadedAt}</td>
                <td className="p-3">
                  <button className="bg-[#002147] text-white py-1 px-3 rounded hover:bg-blue-800">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsPage;
