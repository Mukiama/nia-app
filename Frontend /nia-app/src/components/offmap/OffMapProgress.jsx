function OffMapProgress({ current, total }) {
  return (
    <div className="offmap-progress">
      <span>
        {current} / {total}
      </span>
    </div>
  );
}

export default OffMapProgress;