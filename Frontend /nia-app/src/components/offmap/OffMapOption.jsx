function OffMapOption({ label, icon, selected, onClick }) {
  return (
    <button
      type="button"
      className={`offmap-option ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <span className="offmap-option-icon">{icon}</span>

      <span className="offmap-option-label">
        {label}
      </span>
    </button>
  );
}

export default OffMapOption;