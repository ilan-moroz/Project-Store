import React from "react";
import { CSSProperties } from "react";

const NotFoundPage: React.FC = () => {
  const style: { [key: string]: CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "88.5vh",
      background: "linear-gradient(to right, #6200ea, #bb86fc)",
      color: "white",
      position: "relative",
    },
    header: {
      fontSize: "12rem",
      fontWeight: "bold",
      marginBottom: "10px",
      textShadow: "5px 5px 15px #bb86fc",
      animation: "bounce 2s infinite",
    },
    text: {
      fontSize: "2.5rem",
      fontStyle: "italic",
      textShadow: "2px 2px 8px #bb86fc",
    },
    link: {
      marginTop: "20px",
      fontSize: "1.5rem",
      padding: "15px 30px",
      borderRadius: "30px",
      background: "white",
      color: "#6200ea",
      textDecoration: "none",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
    },
    groceryIcon: {
      position: "absolute",
      top: "10%",
      right: "10%",
      fontSize: "10rem",
      opacity: 0.4,
      zIndex: 1,
    },
  };

  return (
    <div style={style.container}>
      <h1 style={style.header}>404</h1>
      <p style={style.text}>
        Oops! Looks like you've lost your way in our aisles.
      </p>
      <a href="/" style={style.link}>
        Find Your Way Back Home
      </a>
      <div style={style.groceryIcon}>🛒</div>
    </div>
  );
};

export default NotFoundPage;
