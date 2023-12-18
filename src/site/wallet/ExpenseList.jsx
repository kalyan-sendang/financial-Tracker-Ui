function ExpenseList({ expense }) {
  return (
    <tr>
      <th>{expense?.expenseId}</th>
      <th>{expense?.categoryName}</th>
      <th>{expense?.amount}</th>
      <th>{expense?.note}</th>
      <th>{expense?.date}</th>
    </tr>
  );
}

export default ExpenseList;
