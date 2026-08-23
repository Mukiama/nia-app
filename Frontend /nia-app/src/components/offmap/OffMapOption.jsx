function OffMapOption({ label, icon, selected, onClick }) {
  return (
    <button
      type="button"
      className={`offmap-option ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span
        className="offmap-option-icon"
        aria-hidden="true"
      >
        {icon}
      </span>

      <span className="offmap-option-label">
        {label}
      </span>
    </button>
  );
}

export default OffMapOption;