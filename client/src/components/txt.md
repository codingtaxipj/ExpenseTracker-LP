useEffect(() => {
    const yearOf = getOldestDate(entries);
    const yearIs = moment(yearOf.entryDate).year();
    const monthIs = moment(yearOf.entryDate).month();
    const weekIs = moment(yearOf.entryDate).week();
    setCardConfig((prev) => ({
      ...prev,
      year: { firstEntry: yearIs },
      month: { firstEntry: monthIs },
      week: { firstEntry: weekIs },
    }));
  }, [entries]);

  useEffect(() => {
    if (cardConfig.year.current == cardConfig.year.firstEntry) {
      const listSameYear = getEntriesOfYear(entries, cardConfig.year.current);
      if (cardFor.toLowerCase().trim() === "year") {
        const yearTotal = getTotalOfEntries(listSameYear);
        setCardConfig((prev) => ({
          ...prev,
          title: `This Year ${cardConfig.setFor}`,
          total: yearTotal,
        }));
      }
      if (cardFor.toLowerCase().trim() === "month") {
        if (cardConfig.month.current == cardConfig.month.firstEntry) {
          const monthEntries = getEntriesOfMonth(
            listSameYear,
            cardConfig.month.current,
          );
          const monthTotal = getTotalOfEntries(monthEntries);
          setCardConfig((prev) => ({
            ...prev,
            title: `This Month ${cardConfig.setFor}`,
            total: monthTotal,
          }));
        }
        if (cardConfig.month.current > 0) {
          const monthEntries = getEntriesOfMonth(
            listSameYear,
            cardConfig.year.current - 1,
          );
          const monthTotal = getTotalOfEntries(monthEntries);
          setCardConfig((prev) => ({
            ...prev,
            title: `Last Month ${cardConfig.setFor}`,
            total: monthTotal,
          }));
        }
      }
      if (cardFor.toLowerCase().trim() === "week") {
        if (cardConfig.week.current == cardConfig.week.firstEntry) {
          const weekEntries = getEntriesOfWeek(
            listSameYear,
            cardConfig.week.current,
          );
          const yearTotal = getTotalOfEntries(weekEntries);
          setCardConfig((prev) => ({
            ...prev,
            title: `This Week ${cardConfig.setFor}`,
            total: yearTotal,
          }));
        }
        if (cardConfig.week.current > 1) {
          const weekEntries = getEntriesOfWeek(
            listSameYear,
            cardConfig.week.current - 1,
          );
          const yearTotal = getTotalOfEntries(weekEntries);
          setCardConfig((prev) => ({
            ...prev,
            title: `Last Week ${cardConfig.setFor}`,
            total: yearTotal,
          }));
        }
      }
    }

    if (cardConfig.year.current > cardConfig.year.firstEntry) {
      const listPrevYear = getEntriesOfYear(
        entries,
        cardConfig.year.current - 1,
      );
      if (cardFor.toLowerCase().trim() === "year") {
        const yearTotal = getTotalOfEntries(listPrevYear);
        setCardConfig((prev) => ({
          ...prev,
          title: `Last Year ${cardConfig.setFor}`,
          total: yearTotal,
        }));
      }

      if (cardFor.toLowerCase().trim() === "month") {
        if (
          cardConfig.month.current == 0 &&
          cardConfig.month.firstEntry <= 11
        ) {
          const monthEntries = getEntriesOfMonth(listPrevYear, 11);
          const monthTotal = getTotalOfEntries(monthEntries);
          setCardConfig((prev) => ({
            ...prev,
            title: `Last Month ${cardConfig.setFor}`,
            total: monthTotal,
          }));
        }
        if (cardConfig.month.current > 0) {
          const listSameYear = getEntriesOfYear(
            entries,
            cardConfig.year.current,
          );
          const monthEntries = getEntriesOfMonth(
            listSameYear,
            cardConfig.month.current - 1,
          );
          const monthTotal = getTotalOfEntries(monthEntries);
          setCardConfig((prev) => ({
            ...prev,
            title: `Last Month ${cardConfig.setFor}`,
            total: monthTotal,
          }));
        }
      }

      if (cardFor.toLowerCase().trim() === "week") {
        if (cardConfig.week.current == 1) {
          const lastEntryOfYear = getNewestDate(listPrevYear);
          const lastWeek = moment(lastEntryOfYear.entryDate).week();
          const weekEntries = getEntriesOfWeek(listPrevYear, lastWeek);
          const weekTotal = getTotalOfEntries(weekEntries);
          setCardConfig((prev) => ({
            ...prev,
            title: `Last Week ${cardConfig.setFor}`,
            total: weekTotal,
          }));
        }
        if (cardConfig.week.current > 1) {
          const listSameYear = getEntriesOfYear(
            entries,
            cardConfig.year.current,
          );
          const weekEntries = getEntriesOfWeek(
            listSameYear,
            cardConfig.week.current - 1,
          );

          console.log(`curr week = ${cardConfig.week.current}`);

          const weekTotal = getTotalOfEntries(weekEntries);
          setCardConfig((prev) => ({
            ...prev,
            title: `Last Week ${cardConfig.setFor}`,
            total: weekTotal,
          }));
        }
      }
    }
  }, [cardConfig, cardFor, entries]);