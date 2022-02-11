// import React, {
//   createContext,
//   useEffect,
//   useState,
//   useRef,
//   useContext,
// } from "react";
// import { SocketContext } from "./socket.context";

// const videoContext = createContext();

// const videoContextWrapper = () => {
//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();

//   const { socket } = useContext(socketContext);

//   const [stream, setStream] = useState(null);
//   const [me, setMe] = useState("");
//   const [call, setCall] = useState({});
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [name, setName] = useState("");

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((currenStream) => {
//         setStream(currenStream);
//         myVideo.current.srcObject = currenStream;
//       });
//     socket.on("me", (id) => setMe(id));

//     socket.on("calluser", ({ from, name: callerName, signal }) => {
//       setCall({ isReceivedCall: true, from, name, callerName });
//     });
//   }, []);

//   const answerCall = () => {
//     setCallAccepted(true);
//     const peer = new Peer({ initiator: false, trickle: false, stream });
//     peer.on("signal", (data) => {
//       socket.emit("answercall", { signal: data, to: call.from });
//     });

//     peer.on("stream", (currenStream) => {
//       userVideo.current.srcObject = currenStream;
//     });

//     peer.signal(call.signal);

//     connectionRef.current = peer;
//   };

//   const callUser = (id) => {
//     const peer = new Peer({ initiator: true, trickle: false, stream });
//     peer.on("signal", (data) => {
//       socket.emit("calluser", {
//         userToCall: id,
//         signalData: data,
//         from: me,
//         name,
//       });
//     });

//     peer.on("stream", (currenStream) => {
//       userVideo.current.srcObject = currenStream;
//     });

//     socket.on("callaccepted", (signal) => {
//       setCallAccepted(true);

//       peer.signal(signal);
//     });
//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);
//     connectionRef.current.destroy();

//     window.location.reload();
//   };

//   return (
//     <videoContextWrapper.Provider
//       value={{
//         call,
//         callAccepted,
//         myVideo,
//         userVideo,
//         stream,
//         name,
//         setName,
//         callEnded,
//         me,
//         callUser,
//         leaveCall,
//         answerCall,
//       }}
//     >
//       {props.children}
//     </videoContextWrapper.Provider>
//   );
// };

// export { videoContext, videoContextWrapper };
