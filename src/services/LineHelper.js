export const lineHelperFunc = (expenseData = [], incomeData = []) => {
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

  let year = 2023;

  // Iterate over months (assuming 12 months in a year)
  for (let month = 1; month <= monthNames?.length; month++) {
    const monthName = monthNames[month - 1];
    // Find corresponding income item for the month
    const matchingIncomeItem = incomeData?.filter(
      (incomeItem) => incomeItem?.month === month && incomeItem?.year === year
    );

    // Find corresponding expense item for the month
    const matchingExpenseItem = expenseData?.filter(
      (expenseItem) =>
        expenseItem?.month === month && expenseItem?.year === year
    );

    const entry = {
      year: year,
      month: monthName,
      income: 0,
      expense: 0,
    };
    matchingExpenseItem?.forEach((item) => {
      entry.expense += item?.totalAmount;
    });
    matchingIncomeItem?.forEach((item) => {
      entry.income += item?.totalAmount;
    });

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
