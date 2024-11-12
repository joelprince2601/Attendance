// // import React from 'react';
// // import TeacherDashboard from './components/ClassPage';
// // import './style.css';  // Import global styles

// // function App() {
// //   return (
// //     <div className="App">
// //       <TeacherDashboard />
// //     </div>
// //   );
// // }

// // export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import TeacherDashboard from './components/TeacherDashboard';
// import ClassPage from './components/ClassPage';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//       <TeacherDashboard />
//       <Routes>
//         <Route path="/" element={<TeacherDashboard />} />
//         <Route path="./ClassPage" element={<ClassPage />} />
//       </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import TeacherDashboard from './components/TeacherDashboard';
// // import ClassPage from './components/ClassPage';
// // import './App.css';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <Routes>
// //           <Route path="/" element={<TeacherDashboard />} />
// //           <Route path="/ClassPage" element={<ClassPage />} />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard'; // Adjusted import path
import ClassPage from './components/ClassPage'; // Adjusted import path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/classpage" element={<ClassPage />} />
      </Routes>
    </Router>
  );
}

export default App;
