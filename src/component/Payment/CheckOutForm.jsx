import React, { useState } from "react";
import { Container } from "react-bootstrap";

const CheckOutForm = ({ clientSecret }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Effettua la richiesta al tuo backend per completare il pagamento
      const response = await fetch("/conferma-pagamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientSecret,
          name,
          email,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Pagamento confermato con successo!");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage("Si è verificato un errore. Riprova più tardi.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container className="my-5">
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Attendere..." : "Conferma Pagamento"}
        </button>
      </Container>
    </form>
  );
};

export default CheckOutForm;
