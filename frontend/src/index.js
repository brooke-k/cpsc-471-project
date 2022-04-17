import React from 'react';

import ReactDOM from 'react-dom';
import './styles/base.scss';

import App from './App'

import _ from 'lodash';


// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/manufacturer_home" element={<ManufactHome />} />
//         <Route path="/admin_home" element={<AdminHome />} />
//         <Route path="/user_profile" element={<UserProfile />} />
//       </Routes>
//       <ul>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//       </ul>
//     </div>
//   )
// }

// function TestPg() {
//   return (<TestPage />);
// }

// function LoginPg() {
//   return (<LoginPg />);
// }

// export default App;

// // ReactDOM.render(
// //   <App />,
// //   document.getElementById("root")
// // );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
