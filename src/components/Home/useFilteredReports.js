import { useState, useMemo } from "react";

export default function useFilteredReports(reports) {
  const [stageFilter, setStageFilter] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [searchBy, setSearchBy] = useState({ type: null, value: null });

  function handleFilterByStage(value) {
    setStageFilter(value);
  }

  function handleOrderBy(value) {
    setOrderBy(value);
  }

  function handleSearchByType(type) {
    setSearchBy({ ...searchBy, type });
  }

  const filteredReports = useMemo(() => {
    const reportsA =
      stageFilter !== null
        ? reports.filter(report => report.stage === stageFilter)
        : reports;

    const reportsB = reportsA.sort((a, b) => {
      if (orderBy === null) return 0;

      if (orderBy === "events") return b - a;

      // There are only two orders
      const typeA = a.type === "error" ? 3 : a.type === "warning" ? 2 : 1;
      const typeB = b.type === "error" ? 3 : b.type === "warning" ? 2 : 1;
      return typeB - typeA;
    });

    if (Object.values(searchBy).some(value => !value)) return reportsB;

    const finalReports = reportsB.filter(report =>
      String(report[searchBy.type]).includes(searchBy.value)
    );

    return finalReports;
  }, [reports, stageFilter, orderBy, searchBy]);

  const actions = { handleFilterByStage, handleOrderBy, handleSearchByType };

  return { filteredReports, actions };
}

export function hello() {}
