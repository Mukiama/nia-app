import "./states.css";

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>

      <h3>Loading places...</h3>
      <p>Please wait while we fetch the latest information.</p>
    </div>
  );
}

export default Loading;