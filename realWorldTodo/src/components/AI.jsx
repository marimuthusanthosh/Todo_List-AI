import { useLocation } from "react-router-dom";

// Function to format and render the suggestion text
function formatText(text) {
  // Split the text by headings and bullet points
  const lines = text.split("\n").map(line => line.trim());

  return lines.map((line, index) => {
    // Handle bold or emphasized text with '**'
    if (line.startsWith("**") && line.endsWith("**")) {
      return <strong key={index}>{line.slice(2, -2)}</strong>;
    }

    // Handle bullet points with '* '
    if (line.startsWith("* ")) {
      return <ul key={index}><li>{line.slice(2)}</li></ul>;
    }

    // Handle numbered lists with '1.'
    if (line.match(/^\d+\./)) {
      return <ol key={index}><li>{line.slice(line.indexOf(" ")+1)}</li></ol>;
    }

    // Handle headings with '**'
    if (line.startsWith("**")) {
      return <h3 key={index}>{line.replace(/\*\*/g, "")}</h3>;
    }

    // Default case for plain text
    return <p key={index}>{line}</p>;
  });
}

function AI() {
  const location = useLocation();
  const suggestion = location.state?.suggestion || "No suggestion available.";

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", lineHeight: 1.6 }}>
      <h2>AI Suggestion</h2>
      <div>{formatText(suggestion)}</div>
    </div>
  );
}

export default AI;
