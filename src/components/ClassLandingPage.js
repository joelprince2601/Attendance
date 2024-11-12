import React from 'react';
import { useParams } from 'react-router-dom';

const ClassLandingPage = () => {
  const { classId } = useParams();  // Capture the classId from the URL

  return (
    <div className="class-landing-page">
      <h1>Welcome to Class {classId}</h1>
      {/* Render more class-specific details here */}
      <p>Details for Class {classId} will be displayed here.</p>
    </div>
  );
};

export default ClassLandingPage;