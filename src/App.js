
// import './App.css';

// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";


// const FnFForm = () => {
//   const [formData, setFormData] = useState([]);
//   const [newEntry, setNewEntry] = useState({
//     slNo: "",
//     empId: "",
//     name: "",
//     ctc: "",
//     grossWages: "",
//     basic: "",
//     gratuity: "",
//     leave: "",
//     bonus: "",
//     lastSalary: "",
//     retrenchment: "",
//     other: "",
//     total: "",
//     fnfDate: "",
//     reason: "",
//     rejoin: "No",
//     newVendor: "",
//     dojNewVendor: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewEntry({ ...newEntry, [name]: value });
//   };

//   const handleAdd = () => {
//     const updatedEntry = {
//       slNo: formData.length + 1,
//       ...newEntry,
//     };
//     setFormData([...formData, updatedEntry]);
//     setNewEntry({
//       slNo: "",
//       empId: "",
//       name: "",
//       ctc: "",
//       grossWages: "",
//       basic: "",
//       gratuity: "",
//       leave: "",
//       bonus: "",
//       lastSalary: "",
//       retrenchment: "",
//       other: "",
//       total: "",
//       fnfDate: "",
//       reason: "",
//       rejoin: "No",
//       newVendor: "",
//       dojNewVendor: "",
//     });
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const json = XLSX.utils.sheet_to_json(sheet);
//       setFormData(json);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleDownload = () => {
//     const sortedData = [...formData].sort((a, b) => a.slNo - b.slNo);
//     const worksheet = XLSX.utils.json_to_sheet(sortedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "FNF Data");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, "FnF_Settlement.xlsx");
//   };

//   return (
//     <div className="fnf-container">
//       <h2> Form</h2>

//       <div className="upload-section">
//         <label>Upload Excel File:</label>
//         <input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
//       </div>

//       <form className="fnf-form">
//         {Object.keys(newEntry).map((key) => (
//           key === "rejoin" ? (
//             <div className="form-group" key={key}>
//               <label>Rejoin:</label>
//               <select name="rejoin" value={newEntry.rejoin} onChange={handleChange}>
//                 <option value="No">No</option>
//                 <option value="Yes">Yes</option>
//               </select>
//             </div>
//           ) : (
//             <div className="form-group" key={key}>
//               <label>{key}:</label>
//               <input
//                 type={key.includes("Date") ? "date" : "text"}
//                 name={key}
//                 value={newEntry[key]}
//                 onChange={handleChange}
//               />
//             </div>
//           )
//         ))}
//         <button type="button" className="add-btn" onClick={handleAdd}>Add Entry</button>
//       </form>

//       <div className="action-buttons">
//         <button onClick={handleDownload}>Download Excel</button>
//       </div>

//       <h3>Entries:</h3>
//       <div className="table-wrapper">
//         <table className="fnf-table">
//           <thead>
//             <tr>
//               {["slNo", ...Object.keys(newEntry)].map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {formData.map((entry, idx) => (
//               <tr key={idx}>
//                 {["slNo", ...Object.keys(newEntry)].map((key) => (
//                   <td key={key}>{entry[key]}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FnFForm;

// import './App.css';
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// // Helper to format keys into capitalized labels
// const formatLabel = (key) => {
//   return key
//     .replace(/([A-Z])/g, " $1") // Add space before capital letters
//     .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
//     .toUpperCase(); // Convert entire string to uppercase
// };

// const FnFForm = () => {
//   const [formData, setFormData] = useState([]);
//   const [newEntry, setNewEntry] = useState({
//     slNo: "",
//     empId: "",
//     name: "",
//     ctc: "",
//     grossWages: "",
//     basic: "",
//     gratuity: "",
//     leave: "",
//     bonus: "",
//     lastSalary: "",
//     retrenchment: "",
//     other: "",
//     total: "",
//     fnfDate: "",
//     reason: "",
//     rejoin: "No",
//     newVendor: "",
//     dojNewVendor: "",
//   });

//   const calculateTotal = (entry) => {
//     const fieldsToSum = [
//       "gratuity",
//       "leave",
//       "bonus",
//       "lastSalary",
//       "retrenchment",
//       "other",
//     ];
//     const total = fieldsToSum.reduce((sum, field) => {
//       const value = parseFloat(entry[field]) || 0;
//       return sum + value;
//     }, 0);
//     return total.toFixed(2);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedEntry = { ...newEntry, [name]: value };

//     if (["gratuity", "leave", "bonus", "lastSalary", "retrenchment", "other"].includes(name)) {
//       updatedEntry.total = calculateTotal(updatedEntry);
//     }

//     setNewEntry(updatedEntry);
//   };

//   const handleAdd = () => {
//     const updatedEntry = {
//       slNo: formData.length + 1,
//       ...newEntry,
//       total: calculateTotal(newEntry),
//     };
//     setFormData([...formData, updatedEntry]);
//     setNewEntry({
//       slNo: "",
//       empId: "",
//       name: "",
//       ctc: "",
//       grossWages: "",
//       basic: "",
//       gratuity: "",
//       leave: "",
//       bonus: "",
//       lastSalary: "",
//       retrenchment: "",
//       other: "",
//       total: "",
//       fnfDate: "",
//       reason: "",
//       rejoin: "No",
//       newVendor: "",
//       dojNewVendor: "",
//     });
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const json = XLSX.utils.sheet_to_json(sheet);
//       setFormData(json);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleDownload = () => {
//     const sortedData = [...formData].sort((a, b) => a.slNo - b.slNo);
//     const worksheet = XLSX.utils.json_to_sheet(sortedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "FNF DATA");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, "FnF_Settlement.xlsx");
//   };

//   return (
//     <div className="fnf-container">
//       <h2>EMPLOYEE F&F FORM</h2>

//       <div className="upload-section">
//         <label>UPLOAD EXCEL FILE:</label>
//         <input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
//       </div>

//       <form className="fnf-form">
//         {Object.keys(newEntry).map((key) => (
//           key === "rejoin" ? (
//             <div className="form-group" key={key}>
//               <label>{formatLabel(key)}:</label>
//               <select name="rejoin" value={newEntry.rejoin} onChange={handleChange}>
//                 <option value="No">No</option>
//                 <option value="Yes">Yes</option>
//               </select>
//             </div>
//           ) : (
//             <div className="form-group" key={key}>
//               <label>{formatLabel(key)}:</label>
//               <input
//                 type={key.includes("Date") ? "date" : "text"}
//                 name={key}
//                 value={newEntry[key]}
//                 onChange={handleChange}
//               />
//             </div>
//           )
//         ))}
//         <button type="button" className="add-btn" onClick={handleAdd}>ADD ENTRY</button>
//       </form>

//       <div className="action-buttons">
//         <button onClick={handleDownload}>DOWNLOAD EXCEL</button>
//       </div>

//       <h3>ENTRIES:</h3>
//       <div className="table-wrapper">
//         <table className="fnf-table">
//           <thead>
//             <tr>
//               {["slNo", ...Object.keys(newEntry)].map((key) => (
//                 <th key={key}>{formatLabel(key)}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {formData.map((entry, idx) => (
//               <tr key={idx}>
//                 {["slNo", ...Object.keys(newEntry)].map((key) => (
//                   <td key={key}>{entry[key]}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FnFForm;


// import './App.css';
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// // Helper to format keys into capitalized labels
// const formatLabel = (key) => {
//   return key
//     .replace(/([A-Z])/g, " $1")
//     .replace(/^./, str => str.toUpperCase())
//     .toUpperCase();
// };

// const FnFForm = () => {
//   const [formData, setFormData] = useState([]);

//   const [newEntry, setNewEntry] = useState({
//     slNo: "",
//     empId: "",
//     nameOfEmp: "",
//     bpoAssociates: "",
//     contractorName: "",
//     workOrder: "",
//     aadharNo: "",
//     dob: "",
//     doj: "",
//     dos: "",
//     totalServiceYears: "",
//     designation: "",
//     category: "",
//     department: "",
//     division: "",
//     workLocation: "",
//     empAddress: "",
//     ctcPm: "",
//     grossWages: "",
//     basicPd: "",
//     gratuityAmt: "",
//     leaveAmt: "",
//     bonusAmt: "",
//     lastMonthSalary: "",
//     retrenchmentBenefit: "",
//     otherAmt: "",
//     totalAmt: "",
//     deduction: "",
//     netPayment: "",
//     fnfDate: "",
//     reasonForSeparation: "",
//     paymentMadeToEmp: "",
//     rejoin: "No",
//     newVendorName: "",
//     dojNewVendor: "",
//     remarks: ""
//   });

//   const calculateTotal = (entry) => {
//     const fieldsToSum = [
//       "gratuityAmt",
//       "leaveAmt",
//       "bonusAmt",
//       "lastMonthSalary",
//       "retrenchmentBenefit",
//       "otherAmt"
//     ];
//     const total = fieldsToSum.reduce((sum, field) => {
//       const value = parseFloat(entry[field]) || 0;
//       return sum + value;
//     }, 0);
//     return total.toFixed(2);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedEntry = { ...newEntry, [name]: value };

//     if (
//       ["gratuityAmt", "leaveAmt", "bonusAmt", "lastMonthSalary", "retrenchmentBenefit", "otherAmt"].includes(name)
//     ) {
//       updatedEntry.totalAmt = calculateTotal(updatedEntry);
//     }

//     setNewEntry(updatedEntry);
//   };

//   const handleAdd = () => {
//     const updatedEntry = {
//       slNo: formData.length + 1,
//       ...newEntry,
//       totalAmt: calculateTotal(newEntry)
//     };
//     setFormData([...formData, updatedEntry]);

//     // Reset form
//     setNewEntry({
//       slNo: "",
//       empId: "",
//       nameOfEmp: "",
//       bpoAssociates: "",
//       contractorName: "",
//       workOrder: "",
//       aadharNo: "",
//       dob: "",
//       doj: "",
//       dos: "",
//       totalServiceYears: "",
//       designation: "",
//       category: "",
//       department: "",
//       division: "",
//       workLocation: "",
//       empAddress: "",
//       ctcPm: "",
//       grossWages: "",
//       basicPd: "",
//       gratuityAmt: "",
//       leaveAmt: "",
//       bonusAmt: "",
//       lastMonthSalary: "",
//       retrenchmentBenefit: "",
//       otherAmt: "",
//       totalAmt: "",
//       deduction: "",
//       netPayment: "",
//       fnfDate: "",
//       reasonForSeparation: "",
//       paymentMadeToEmp: "",
//       rejoin: "No",
//       newVendorName: "",
//       dojNewVendor: "",
//       remarks: ""
//     });
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const json = XLSX.utils.sheet_to_json(sheet);
//       setFormData(json);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleDownload = () => {
//     const sortedData = [...formData].sort((a, b) => a.slNo - b.slNo);
//     const worksheet = XLSX.utils.json_to_sheet(sortedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "FNF DATA");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, "FnF_Settlement.xlsx");
//   };

//   return (
//     <div className="fnf-container">
//       <h2>EMPLOYEE F&F FORM</h2>

//       <div className="upload-section">
//         <label>UPLOAD EXCEL FILE:</label>
//         <input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
//       </div>

//       <form className="fnf-form">
//         {Object.keys(newEntry).map((key) => (
//           key === "rejoin" ? (
//             <div className="form-group" key={key}>
//               <label>{formatLabel(key)}:</label>
//               <select name="rejoin" value={newEntry.rejoin} onChange={handleChange}>
//                 <option value="No">No</option>
//                 <option value="Yes">Yes</option>
//               </select>
//             </div>
//           ) : (
//             <div className="form-group" key={key}>
//               <label>{formatLabel(key)}:</label>
//               <input
//                 type={["dob", "doj", "dos", "fnfDate", "dojNewVendor"].includes(key) ? "date" : "text"}
//                 name={key}
//                 value={newEntry[key]}
//                 onChange={handleChange}
//               />
//             </div>
//           )
//         ))}
//         <button type="button" className="add-btn" onClick={handleAdd}>ADD ENTRY</button>
//       </form>

//       <div className="action-buttons">
//         <button onClick={handleDownload}>DOWNLOAD EXCEL</button>
//       </div>

//       <h3>ENTRIES:</h3>
//       <div className="table-wrapper">
//         <table className="fnf-table">
//           <thead>
//             <tr>
//               {Object.keys(newEntry).map((key) => (
//                 <th key={key}>{formatLabel(key)}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {formData.map((entry, idx) => (
//               <tr key={idx}>
//                 {Object.keys(newEntry).map((key) => (
//                   <td key={key}>{entry[key]}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FnFForm;


import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./App.css";
import 'antd/dist/reset.css'; 



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
