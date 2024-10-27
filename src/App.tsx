import React, { useState } from "react";
import ElectionData from "./Views/Yearly";
import MenuButtons from "./Components/MenuButtons";
import ViewSingleCandidate from "./Components/ViewSingleCandidate";
import TopCandidates from "./Components/TopCandidates";
import FilterForm from "./Components/FilterForm";
import { YEARS } from "./dataUtils/years";
import { useGetData } from "./hooks/useGetData";

type TPage = "yearly" | "top candidates";

function App() {
  const [currentCandidate, setCurrentCandidate] = useState("");
  const [currentPage, setCurrentPage] = useState<TPage>("top candidates");
  const [filter, setFilter] = useState("");

  const { candidateData } = useGetData();

  const menuOptions = ["yearly", "top candidates"];

  if (currentCandidate !== "") {
    return (
      <div>
        <ViewSingleCandidate
          currentCandidate={currentCandidate}
          setCurrentCandidate={setCurrentCandidate}
        />
      </div>
    );
  }
  if (currentPage === "yearly") {
    return (
      <div>
        <MenuButtons
          setCurrent={setCurrentPage}
          current={currentPage}
          options={menuOptions}
        />
        <FilterForm filter={filter} setFilter={setFilter} />
        <ElectionData
          setCurrentCandidate={setCurrentCandidate}
          filter={filter}
        />
      </div>
    );
  }

  if (currentPage === "top candidates") {
    return (
      <div>
        <MenuButtons
          setCurrent={setCurrentPage}
          current={currentPage}
          options={menuOptions}
        />

        <TopCandidates
          setCurrentCandidate={setCurrentCandidate}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    );
  }
}

export default App;
