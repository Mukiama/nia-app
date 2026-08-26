import { useState } from "react";
import OffMapQuestion from "../components/offmap/OffMapQuestion";
import OffMapProgress from "../components/offmap/OffMapProgress";
import OffMapResult from "../components/offmap/OffMapResult";
import offMapQuestions from "../data/offmapQuestions";
import offMapPlaces from "../data/offMapPlaces";
import {
  getOffMapRecommendation,
  getOffMapWildcard,
} from "../utils/offmapRecommendation";
import "../styles/offMap.css"

function OffMap() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [preferences, setPreferences] = useState({
    who: null,
    mood: null,
    budget: null,
    time: null,
    distance: null,
  });

  const question = offMapQuestions[currentQuestion];
  const selectedValue = preferences[question.id];

  const handleSelect = (value) => {
    if (isTransitioning) return;

    const updatedPreferences = {
      ...preferences,
      [question.id]: value,
    };

    setPreferences(updatedPreferences);
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestion < offMapQuestions.length - 1) {
        setCurrentQuestion((previous) => previous + 1);
        setIsTransitioning(false);
      } else {
        const recommendation = getOffMapRecommendation(
          updatedPreferences,
          offMapPlaces
        );

        console.log("Final preferences:", updatedPreferences);
        console.log("Recommendation:", recommendation);

        setResult(recommendation);
        setIsTransitioning(false);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleRollAgain = () => {
    const recommendation = getOffMapRecommendation(
      preferences,
      offMapPlaces,
      result?.id
    );

    setResult(recommendation);
  };

  const handleWildcard = () => {
    const wildcard = getOffMapWildcard(
      preferences,
      offMapPlaces,
      result?.id
    );

    setResult(wildcard);
  };

  /*
   * RESULT SCREEN
   */
  if (result) {
    return (
      <main className="offmap-page">
        <div className="offmap-container">
          <OffMapResult
            place={result}
            preferences={preferences}
            onRollAgain={handleRollAgain}
            onWildcard={handleWildcard}
          />
        </div>
      </main>
    );
  }

  /*
   * QUESTION SCREEN
   */
  return (
    <main className="offmap-page">
      <section className="offmap-container">

        <div className="offmap-header">
          <p className="offmap-label">
            OFFMAP
          </p>

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

        <div
          key={currentQuestion}
          className={`offmap-question-transition ${
            isTransitioning
              ? "is-exiting"
              : "is-entering"
          }`}
        >
          <OffMapQuestion
            question={question.question}
            options={question.options}
            selected={selectedValue}
            onSelect={handleSelect}
          />
        </div>

        <div className="offmap-navigation">
          <button
            type="button"
            onClick={handleBack}
            disabled={
              currentQuestion === 0 ||
              isTransitioning
            }
            className="offmap-back"
          >
            ← Back
          </button>
        </div>

      </section>
    </main>
  );
}

export default OffMap;