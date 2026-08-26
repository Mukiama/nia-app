import OffMapOption from "./OffMapOption";

function OffMapQuestion({
  question,
  options,
  selected,
  onSelect,
}) {
  return (
    <section className="offmap-question">
      <h2>{question}</h2>

      <div className="offmap-options">
        {options.map((option) => (
          <OffMapOption
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selected === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </section>
  );
}

export default OffMapQuestion;