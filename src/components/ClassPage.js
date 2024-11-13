import React, { useState } from 'react';

function ClassPage() {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    regNo: '',
    name: '',
    email: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setStudentDetails({
      ...studentDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting student details:", studentDetails);

    if (studentDetails.regNo && studentDetails.name && studentDetails.email) {
      try {
        // Optional: Add API call to submit data to server
        const response = await fetch('http://localhost:5000/add-student', {
          method: 'POST',
          body: JSON.stringify(studentDetails),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit student details');
        }

        const newStudent = await response.json();  // Assume backend returns the added student
        setStudents([...students, newStudent]);  // Update state with the new student
        setIsModalVisible(false);
        setStudentDetails({ regNo: '', name: '', email: '' });
      } catch (error) {
        console.error('Error submitting student details:', error);
        alert('An error occurred while submitting the student details. Please try again.');
      }
    } else {
      alert('Please fill in all fields!');
    }
  };

  // Show modal to add a student
  const addStudent = () => {
    setIsModalVisible(true);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>Class Page</h1>
        <button
          onClick={addStudent}
          style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
        >
          Add Student
        </button>
      </header>

      {/* Modal for adding student */}
      {isModalVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '28rem',
              width: '100%',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1F2937' }}>
              Add New Student
            </h2>
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1F2937', fontWeight: 'bold' }}>
                Registration Number:
              </label>
              <input
                type="text"
                name="regNo"
                value={studentDetails.regNo}
                onChange={handleChange}
                required
                style={{
                  border: '1px solid #E2E8F0',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  width: '100%',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                }}
              />

              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1F2937', fontWeight: 'bold' }}>
                Student Name:
              </label>
              <input
                type="text"
                name="name"
                value={studentDetails.name}
                onChange={handleChange}
                required
                style={{
                  border: '1px solid #E2E8F0',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  width: '100%',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                }}
              />

              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1F2937', fontWeight: 'bold' }}>
                Student Email:
              </label>
              <input
                type="email"
                name="email"
                value={studentDetails.email}
                onChange={handleChange}
                required
                style={{
                  border: '1px solid #E2E8F0',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  width: '100%',
                  fontSize: '1rem',
                  marginBottom: '1.5rem',
                }}
              />

              <button
                type="submit"
                style={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  fontWeight: 'bold',
                  width: '100%',
                  transition: 'background-color 0.3s ease',
                  marginBottom: '1rem',
                }}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsModalVisible(false)}
                style={{
                  backgroundColor: '#EF4444',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  fontWeight: 'bold',
                  width: '100%',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Display list of students */}
      <div
        style={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}
      >
        {students.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#4B5563' }}>No students added yet!</p>
        ) : (
          students.map((student, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <h3
                  style={{
                    color: '#1F2937',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    marginRight: '1rem',
                  }}
                >
                  {student.name}
                </h3>
                <p
                  style={{
                    color: '#4B5563',
                    fontSize: '1rem',
                  }}
                >
                  {student.regNo}
                </p>
              </div>
              <p
                style={{
                  color: '#4B5563',
                  fontSize: '1rem',
                  marginLeft: 'auto',
                }}
              >
                {student.email}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClassPage;
