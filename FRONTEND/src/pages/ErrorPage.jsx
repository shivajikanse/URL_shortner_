export default function ErrorPage() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>404 — Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: 16,
          padding: "10px 18px",
          borderRadius: 8,
          background: "#6366f1",
          color: "white",
          textDecoration: "none",
        }}
      >
        Go Home
      </a>
    </div>
  );
}
