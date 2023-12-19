function ExpenseList({ expense }) {
  return (
    <tr>
      <th>{expense?.expenseId}</th>
      <th>{expense?.expenseCategoryName}</th>
      <th>{expense?.amount}</th>
      <th>{expense?.date}</th>
      <th>{expense?.note}</th>
    </tr>
  );
}

export default ExpenseList;
