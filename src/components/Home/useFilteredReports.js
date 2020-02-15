import { useState, useMemo } from "react";

export default function useFilteredReports(reports) {
  const [stageFilter, setStageFilter] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [searchBy, setSearchBy] = useState({ type: null, value: null });
  const [showArchived, setShowArchived] = useState(null);

  function handleFilterByStage(value) {
    setStageFilter(value);
  }

  function handleOrderBy(value) {
    setOrderBy(value);
  }

  function handleSearchByType(type, value) {
    setSearchBy({ ...searchBy, type: type, value: value });
  }

  function handleShowArchived(value) {
    setShowArchived(value);
  }

  const filteredReports = useMemo(() => {
    const reportsA =
      stageFilter !== null
        ? reports.filter(report => report.stage === stageFilter)
        : reports;

    const reportsB = reportsA.sort((a, b) => {
      if (orderBy === null) return 0;

      if (orderBy === "events") {
        return b.events - a.events;
      }

      // There are only two orders
      const typeA = a.type === "error" ? 3 : a.type === "warning" ? 2 : 1;
      const typeB = b.type === "error" ? 3 : b.type === "warning" ? 2 : 1;
      return typeB - typeA;
    });
    const reportsC = reportsB.filter(report => {
      if (!showArchived) return !report.archived;
      else {
        return report.archived === true;
      }
    });

    if (Object.values(searchBy).some(value => !value)) return reportsC;

    const finalReports = reportsC.filter(report => {
      return String(report[searchBy.type])
        .toLowerCase()
        .includes(searchBy.value.toLowerCase());
    });

    return finalReports;
  }, [reports, stageFilter, orderBy, searchBy, showArchived]);

  const actions = {
    handleFilterByStage,
    handleOrderBy,
    handleSearchByType,
    handleShowArchived
  };

  return { filteredReports, actions };
}
