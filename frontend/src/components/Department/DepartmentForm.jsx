function DepartmentForm() {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">Add New Department</h2>
        <form>
          <input type="text" placeholder="Department Name" className="w-full border px-3 py-2 mb-3 rounded" />
          <button className="bg-[#002147] text-white px-4 py-2 rounded">Add Department</button>
        </form>
      </div>
    );
  }
  
  export default DepartmentForm;
  