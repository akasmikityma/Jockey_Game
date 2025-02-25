import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const AlertBoard = ({ msg }: { msg: string }) => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-1/6  bg-white/30 backdrop-blur-lg shadow-2xl rounded-lg p-4 border border-white/40">
      <Alert className="shadow-lg">
        <AlertTitle className="text-lg font-semibold text-gray-800">Message</AlertTitle>
        <AlertDescription className="text-gray-700">{msg}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertBoard;

// import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
// import { motion } from "framer-motion";

// const AlertBoard = ({ msg }: { msg: string }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-1/6 
//                 bg-white/30 backdrop-blur-lg shadow-2xl rounded-lg p-4 border border-white/40"
//     >
//       <Alert className="shadow-lg">
//         <AlertTitle className="text-lg font-semibold text-gray-800">Message</AlertTitle>
//         <AlertDescription className="text-gray-700">{msg}</AlertDescription>
//       </Alert>
//     </motion.div>
//   );
// };

// export default AlertBoard;
// import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
// import { motion } from "framer-motion";

// const AlertBoard = ({ msg }: { msg: string }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 
//                  w-full max-w-md bg-white/30 backdrop-blur-lg 
//                  shadow-2xl rounded-lg p-4 border border-white/40"
//     >
//       <Alert className="shadow-lg text-center">
//         <AlertTitle className="text-lg font-semibold text-gray-800">
//           Message
//         </AlertTitle>
//         <AlertDescription className="text-gray-700">{msg}</AlertDescription>
//       </Alert>
//     </motion.div>
//   );
// };

// export default AlertBoard;
