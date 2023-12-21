export const lineHelperFunc = (expenseData, incomeData) => {
  const mergedData = [];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Iterate over months (assuming 12 months in a year)
  for (let month = 1; month < monthNames.length; month++) {
    const monthName = monthNames[month];
    // Find corresponding income item for the month
    const matchingIncomeItem = incomeData.find(
      (incomeItem) => incomeItem.month === month
    );

    // Find corresponding expense item for the month
    const matchingExpenseItem = expenseData.find(
      (expenseItem) => expenseItem.month === month
    );

    // Create an entry for the month, setting default values if data is missing
    const entry = {
      year: matchingIncomeItem
        ? matchingIncomeItem.year
        : matchingExpenseItem?.year || 0,
      month: monthName,
      income: matchingIncomeItem ? matchingIncomeItem.totalAmount : 0,
      expense: matchingExpenseItem ? matchingExpenseItem.totalAmount : 0,
    };

    // Push the entry to the mergedData array
    mergedData.push(entry);
  }

  const transformedData = [
    ["month", "Income", "Expense"],
    ...Array.from({ length: 12 }, (_, i) => {
      const monthData = mergedData.find((item) => item.month === monthNames[i]);
      return [
        monthNames[i], // Month
        monthData ? monthData.income : 0, // Income
        monthData ? monthData.expense : 0, // Expense
      ];
    }),
  ];
  return transformedData;
};
