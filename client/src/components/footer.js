import React from "react";

const Footer = (props) => {
  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: "2rem",
        fontSize: "0.8rem",
        color: "#666",
        borderTop: "1px solid #ccc",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        {props.signing}
        <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">
          Terms of Use
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </div>
      <div>
        {props.new}
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: "bold", color: "#333" }}
        >
          {props.create}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
