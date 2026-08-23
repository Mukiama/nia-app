import "./states.css";

function EmptyState({
  title = "No places found",
  message = "There are currently no places to display."
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📍</div>

      <h2>{title}</h2>

      <p>{message}</p>
    </div>
  );
}

export default EmptyState;