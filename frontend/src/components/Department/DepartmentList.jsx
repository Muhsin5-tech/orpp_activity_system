function DepartmentList() {
    const departments = [
      "Registration and Field Services",
      "Compliance and Regulation",
      "Finance and Accounts",
      "Human Resource Management",
    ];
  
    return (
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">Departments</h2>
        <ul className="space-y-2">
          {departments.map((dept, index) => (
            <li key={index} className="border p-3 rounded">
              {dept}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default DepartmentList;
  