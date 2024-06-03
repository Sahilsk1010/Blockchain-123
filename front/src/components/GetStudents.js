import { useState, useEffect } from "react";

const GetStudents = ({ state }) => {
  const [students, setStudents] = useState([]);
  const { contract } = state;
  const [usn, setUsn] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [showAllStudents, setShowAllStudents] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      if (contract) {
        try {
          const students = await contract.getStudents();
          setStudents(students);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };
    fetchStudents();
  }, [contract]);

  const searchStudent = () => {
    const student = students.find((student) => student.usn === usn);
    if (student) {
      setStudentInfo(student);
      setSearchError("");
    } else {
      setStudentInfo(null);
      setSearchError("No record found");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-100">
      <div className="mb-10 text-center">
        <input 
          type="text" 
          value={usn} 
          onChange={(e) => setUsn(e.target.value)} 
          placeholder="Enter USN" 
          className="px-4 py-2 border border-indigo-600 rounded focus:outline-none focus:ring focus:border-indigo-300"
        />
        <button 
          onClick={searchStudent} 
          className="px-4 py-2 ml-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded"
        >
          Get Info
        </button>
      </div>

      {studentInfo && (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">{studentInfo.name}</h3>
            <p className="text-md text-gray-800 mb-2">USN: {studentInfo.usn}</p>
            <p className="text-md text-gray-800 mb-2">Course: {studentInfo.course}</p>
            <p className="text-md text-gray-800 mb-2">
              Completion: {new Date(Number(studentInfo.completionTimestamp) * 1000).toLocaleString()}
            </p>
            <p className="text-md text-gray-800 mb-2">Credits: {studentInfo.credits}</p>
          </div>
        </div>
      )}

      {searchError && (
        <div className="text-center text-red-500 mb-6">
          <p>{searchError}</p>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={() => setShowAllStudents(!showAllStudents)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded"
        >
          {showAllStudents ? "Hide All Students" : "Show All Students"}
        </button>
      </div>

      {showAllStudents && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold text-indigo-800 mb-2">{student.name}</h3>
                <p className="text-md text-gray-800 mb-2">USN: {student.usn}</p>
                <p className="text-md text-gray-800 mb-2">Course: {student.course}</p>
                <p className="text-md text-gray-800 mb-2">
                  Completion: {new Date(Number(student.completionTimestamp) * 1000).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetStudents;
