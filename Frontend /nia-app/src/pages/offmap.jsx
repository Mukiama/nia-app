import { useState } from "react";
import OffMapQuestion from "../components/offmap/OffMapQuestion";
import OffMapProgress from "../components/offmap/OffMapProgress";
import offMapQuestions from "../data/offmapQuestions";

function OffMap() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [preferences, setPreferences] = useState({
    who: null,
    mood: null,
    budget: null,
    time: null,
    distance: null,
  });

  const question = offMapQuestions[currentQuestion];

  const handleSelect = (value) => {
    setPreferences((previous) => ({
      ...previous,
      [question.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < offMapQuestions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleFeelingLucky = () => {
    console.log("OffMap preferences:", preferences);
  };

  const selectedValue = preferences[question.id];

  const isLastQuestion =
    currentQuestion === offMapQuestions.length - 1;

  return (
    <main className="offmap-page">
      <section className="offmap-container">

        <div className="offmap-header">
          <p className="offmap-label">OFFMAP</p>

          <h1>Feeling Lucky?</h1>

          <p>
            Don't know where to go?
            <br />
            Let OffMap decide.
          </p>
        </div>

        <OffMapProgress
          current={currentQuestion + 1}
          total={offMapQuestions.length}
        />

        <OffMapQuestion
          question={question.question}
          options={question.options}
          selected={selectedValue}
          onSelect={handleSelect}
        />

        <div className="offmap-navigation">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="offmap-back"
          >
            ← Back
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleFeelingLucky}
              className="offmap-lucky-button"
            >
              🎲 Feeling Lucky
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="offmap-next"
            >
              Next →
            </button>
          )}
        </div>

      </section>
    </main>
  );
}

export default OffMap;