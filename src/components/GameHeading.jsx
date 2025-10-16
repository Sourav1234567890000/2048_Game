const GameHeading = () => {
  return (
    <h1
      style={{
        fontSize: "60px",
        fontWeight: "bold",
        color: "#776e65",       // dark text like 2048
        textAlign: "center",
        margin: "20px 0",
        fontFamily: "'Clear Sans', 'Arial', sans-serif",
        textShadow: "2px 2px #f9f6f2", // subtle 3D effect
      }}
    >
      2048
    </h1>
  );
};

export default GameHeading;
