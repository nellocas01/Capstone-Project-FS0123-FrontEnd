// import { useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const AddCampiForm = () => {
//   const navigator = useNavigate();

//   const [token, setToken] = useState();

//   const [campo, setCampo] = useState({
//     nome: "",
//     indirizzo: "",
//     //prenotazione: "",
//   });

//   useEffect(() => {
//     setToken(localStorage.getItem("accessToken"));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   const addCampo = async (e) => {
//     e.preventDefault();
//     //setError("");
//     try {
//       const response = await fetch(`http://localhost:3001/campi`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//         body: JSON.stringify(campo),
//       });
//       if (response.ok) {
//         const risposta = await response.json();
//         console.log(risposta);
//         navigator("/campi");
//       } else {
//         //setError("Credenziali errate. Riprova.");
//         const errorData = await response.json();
//         console.log(errorData);
//       }
//     } catch (error) {
//       console.log(error);
//       //setError("Si è verificato un errore. Riprova più tardi.");
//     }
//   };

//   return (
//     <>
//       <Col sm={12} className="text-center mb-3">
//         <h1>Aggiungi Campo</h1>
//       </Col>
//       <Col sm={12} style={{ background: "#161B22" }}>
//         <div>
//           <Form>
//             <Form.Group className="my-3" controlId="nome">
//               <Form.Label>Nome del campo</Form.Label>
//               <Form.Control
//                 type="text"
//                 required
//                 value={campo.nome}
//                 onChange={(e) => setCampo({ ...campo, nome: e.target.value })}
//                 style={{ background: "#010409", color: "#fff" }}
//               />
//             </Form.Group>
//             <Form.Group className="my-3" controlId="indirizzo">
//               <Form.Label>Indirizzo del campo</Form.Label>
//               <Form.Control
//                 type="text"
//                 required
//                 value={campo.indirizzo}
//                 onChange={(e) =>
//                   setCampo({ ...campo, indirizzo: e.target.value })
//                 }
//                 style={{ background: "#010409", color: "#fff" }}
//               />
//             </Form.Group>
//             {/* <Form.Group className="my-3" controlId="prenotazione">
//               <Form.Label>Prenotazione campo</Form.Label>
//               <Form.Control
//                 type="text"
//                 required
//                 value={campo.prenotazione}
//                 onChange={(e) =>
//                   setCampo({ ...campo, prenotazione: e.target.value })
//                 }
//                 style={{ background: "#010409", color: "#fff" }}
//               />
//             </Form.Group> */}
//             <Button
//               variant="primary"
//               className="w-100 mb-3"
//               type="button"
//               onClick={addCampo}
//             >
//               Aggiungi Campo
//             </Button>
//           </Form>
//           <Button
//             variant="success"
//             className="w-100 mb-3"
//             onClick={() => navigator("/home")}
//           >
//             Torna alla home
//           </Button>
//         </div>
//       </Col>
//     </>
//   );
// };
// export default AddCampiForm;
