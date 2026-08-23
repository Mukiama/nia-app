import { useEffect, useState } from "react";

import Loading from "./components/Loading";
import EmptyState from "./components/EmptyState";

function App() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setPlaces([]);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (places.length === 0) {
    return (
      <EmptyState
        title="No places available"
        message="There are currently no businesses or places available. Please check back later."
      />
    );
  }

  return (
    <div>
      {/* Your places will appear here */}
    </div>
  );
}

export default App;