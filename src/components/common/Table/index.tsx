import { Checkbox } from "./Checkbox";
import { useTable, useSortBy, useRowSelect, usePagination } from "react-table";

const ReactTable = ({ columns, data }: any) => {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    selectedFlatRows,
    pageOptions,
    gotoPage,
    setPageSize,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
      },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          width: 10,
          disableSortBy: true,
          // eslint-disable-next-line
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          // eslint-disable-next-line
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const { pageIndex, pageSize } = state;

  return (
    <div className="m-12">
      <table
        {...getTableProps()}
        className="min-w-full border-x border-y rounded-t-lg rounded-r-lg border-blue-200 divide-y divide-blue-200  "
      >
        <thead className="bg-grey-100">
          {headerGroups.map((headerGroup) => {
            const {
              key: headerGroupKey,
              role: headerGroupRole,
              ...getHeaderGroupProps
            } = headerGroup.getHeaderGroupProps();

            return (
              <tr key={headerGroupKey} {...getHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const {
                    key: headerKey,
                    role: headerRole,
                    ...getHeaderProps
                  } = column.getHeaderProps(column.getSortByToggleProps());

                  return (
                    <th
                      scope="col"
                      className="p-6 text-left font-normal text-grey-500 focus:shadow-md focus:shadow-blue-300"
                      key={headerKey}
                      {...getHeaderProps}
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ▼"
                            : " ▲"
                          : ""}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-x divide-blue-200"
        >
          {page.map((row) => {
            prepareRow(row);

            const {
              key: rowKey,
              role: rowRole,
              ...getRowProps
            } = row.getRowProps();

            return (
              <tr key={rowKey} {...getRowProps}>
                {row.cells.map((cell) => {
                  const {
                    key: cellKey,
                    role: cellRole,
                    ...getCellProps
                  } = cell.getCellProps();

                  return (
                    <td
                      key={cellKey}
                      {...getCellProps}
                      className="px-6 py-4 text-grey-900 whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav className="block">
        <ul className="flex pl-0 mt-5 rounded list-none flex-wrap">
          <li>
            <button
              disabled={!canPreviousPage}
              className="bg-white w-10 h-10 text-sm items-center  border border-grey-300 disabled:bg-grey-400"
              onClick={() => previousPage()}
            >
              {"<"}
            </button>
          </li>
          <li>
            {pageOptions.map((number) => (
              <button
                onClick={() => {
                  gotoPage(number);
                }}
                key={number}
                className={
                  number === pageIndex
                    ? "bg-blue-500 w-10 h-10 text-sm  items-center  border border-blue-300"
                    : "bg-white w-10 h-10 text-sm  items-center  border border-grey-300"
                }
              >
                {number + 1}
              </button>
            ))}
          </li>
          <li>
            <button
              disabled={!canNextPage}
              className="bg-white w-10 h-10 text-sm  items-center  border disabled:bg-grey-400"
              onClick={() => nextPage()}
            >
              {">"}
            </button>
          </li>
          <li>
            <select
              value={pageSize}
              className="w-40 cursor-default bg-white ml-3 w-10 h-10 text-center shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </nav>

      {JSON.stringify(
        {
          selectedFlatRows: selectedFlatRows.map(({ original }) => original),
        },
        null,
        2
      )}
    </div>
  );
};

export default ReactTable;
