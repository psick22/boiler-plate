import React, { useEffect } from "react";
import axios from "axios";

function LangdingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);

  return <div>LandingPage</div>;
}

export default LangdingPage;
