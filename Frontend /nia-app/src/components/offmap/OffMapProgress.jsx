function OffMapProgress({ current, total }) {
  const formattedCurrent = String(current).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  return (
    <div className="offmap-progress">
      <span>
        {formattedCurrent} — {formattedTotal}
      </span>
    </div>
  );
}

export default OffMapProgress;