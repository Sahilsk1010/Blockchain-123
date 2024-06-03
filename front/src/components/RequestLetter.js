import { useState } from "react";

function RequestLetter({ state }) {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [course, setCourse] = useState("");
  const [credit, setCredit] = useState("");
  const [id, setId] = useState(9); // Initialize ID to 9
  const { contract } = state;

  const handleRequest = async () => {
    try {
      // Request recommendation from the contract
      await contract.methods.addStudent(name, course, usn, credit).send({ from: state.account });

      // Increment the ID after a successful request
      setId((prevId) => prevId + 1);

      alert("Transaction ID generated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error generating transaction ID");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Enter Student Details</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-teal-400 bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="USN"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          className="mb-4 w-full px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-teal-400 bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="mb-4 w-full px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-teal-400 bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Credits"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
          className="mb-4 w-full px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-teal-400 bg-gray-700 text-white"
        />

        <button
          onClick={handleRequest}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none w-full"
        >
          Get Transaction ID
        </button>
      </div>
    </div>
  );
}

export default RequestLetter;
