// import { useContext, useState } from "react";
// import io from "socket.io-client";
// import { AuthContext } from "../context/auth.context";
// import socket from "../socket";

// const ConnectWithSocket = (userToken) => {
//   // get current user's info
//   const { user } = useContext(AuthContext);

//   // get all users
//   const [users, setUsers] = useState([]);

//   // !! add user's email to auth
//   // get user's token and store it in socket.auth
//   const jwtToken = userToken;
//   socket.auth = {
//     email: user.email,
//     token: jwtToken,
//   };

//   socket.on("connection", () => {
//     console.log("succesfully connected with socket.io server");
//     console.log(socket);
//   });

//   socket.on("users", (users) => {
//     users.forEach((user) => {
//       user.self = user.userID === socket.id;
//       // initReactiveProperties(user);
//     });

//     users = users.sort((a, b) => {
//       if (a.self) return -1;
//       if (b.self) return 1;
//       if (a.email < b.email) return -1;
//       return a.email > b.email ? 1 : 0;
//     });

//     socket.on("user connected", (user) => {
//       // initReactiveProperties(user);
//       users.push(user);
//     });

//     setUsers(users);
//     console.log("--->", users);
//   });
// };

// export default ConnectWithSocket;
