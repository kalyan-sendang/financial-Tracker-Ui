function IncomeList({ income }) {
  return (
    <tr>
      <th>{income?.incomeId}</th>
      <th>{income?.categoryName}</th>
      <th>{income?.amount}</th>
      <th>{income?.date}</th>
      <th>{income?.note}</th>
    </tr>
  );
}

export default IncomeList;
