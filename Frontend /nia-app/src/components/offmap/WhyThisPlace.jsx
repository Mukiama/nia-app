function WhyThisPlace({ reasons }) {
  return (
    <section className="offmap-why">
      <p className="offmap-result-eyebrow">
        WHY THIS?
      </p>

      <div className="offmap-reasons">
        {reasons.map((reason) => (
          <div className="offmap-reason" key={reason}>
            <span className="offmap-reason-check">
              ✓
            </span>

            <span>{reason}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyThisPlace;