// import React, { useEffect } from "react";
// import "../css/toast.css"; // Import the CSS for styling

// interface ToastProps {
//   message: string;
//   onClose: () => void;
// }

// const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000); // Toast disappears after 3 seconds
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="toast">
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Toast;

import React, { useEffect } from "react";
import "../css/toast.css";

interface ToastProps {
  message: string;
  onClose: () => void;
  position?: "top" | "bottom";
}

const Toast: React.FC<ToastProps> = ({ message, onClose, position = "bottom" }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${position} z-50`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
