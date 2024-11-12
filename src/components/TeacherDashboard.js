// TeacherDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [classDetails, setClassDetails] = useState({
    className: '',
    classNumber: '',
    slot: 'A1',
  });
  const navigate = useNavigate();
  
  const slots = ['A1', 'A2', 'B1', 'B2', 'G1', 'G2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2'];

  const addClass = () => {
    setIsModalVisible(true);
  };

  const handleChange = (e) => {
    setClassDetails({
      ...classDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classDetails.className && classDetails.classNumber) {
      setClasses([
        ...classes,
        {
          name: classDetails.className,
          classNumber: classDetails.classNumber,
          slot: classDetails.slot,
          students: [],
        },
      ]);
      setIsModalVisible(false);
      setClassDetails({ className: '', classNumber: '', slot: 'A1' });
    } else {
      alert('Please fill in all fields!');
    }
  };

  const handleClassClick = (classItem) => {
    // Navigate to ClassPage with class details
    navigate('/classpage', { state: { classDetails: classItem } });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>Teacher Dashboard</h1>
        <button
          onClick={addClass}
          style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
        >
          Add Class
        </button>
      </header>

      {isModalVisible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '28rem',
            width: '100%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1F2937' }}>Add New Class</h2>
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1F2937', fontWeight: 'bold' }}>Class Name:</label>
              <input
                type="text"
                name="className"
                value={classDetails.className}
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

              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1F2937', fontWeight: 'bold' }}>Class Number:</label>
              <input
                type="text"
                name="classNumber"
                value={classDetails.classNumber}
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

              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1F2937', fontWeight: 'bold' }}>Slot:</label>
              <select
                name="slot"
                value={classDetails.slot}
                onChange={handleChange}
                style={{
                  border: '1px solid #E2E8F0',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  width: '100%',
                  fontSize: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                {slots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

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

      <div style={{
        marginTop: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {classes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#4B5563' }}>No classes added yet!</p>
        ) : (
          classes.map((classItem, index) => (
            <div
              key={index}
              onClick={() => handleClassClick(classItem)}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <h3 style={{ color: '#1F2937', fontWeight: 'bold', fontSize: '1.25rem' }}>{classItem.name}</h3>
              <p style={{ color: '#4B5563' }}>Class Number: {classItem.classNumber}</p>
              <p style={{ color: '#4B5563' }}>Slot: {classItem.slot}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
