import { HeaderGroup, Row } from "react-table";

const ReactTable = ({ tableProps }: any) => {
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
    pageOptions,
    gotoPage,
    setPageSize,
    state,
  } = tableProps;

  const { pageIndex, pageSize } = state;

  return (
    <div className="m-12">
      <table
        {...getTableProps()}
        className="min-w-full border-x border-y rounded-t-lg rounded-r-lg border-blue-200 divide-y divide-blue-200  "
      >
        <thead className="bg-grey-100">
          {headerGroups.map((headerGroup: HeaderGroup) => {
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
          {page.map((row: Row) => {
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
              className="px-3 py-2 ml-0 leading-tight text-grey-500 bg-white border border-grey-300 rounded-l-lg hover:bg-grey-100 hover:text-grey-700 disabled:bg-grey-300"
              onClick={() => previousPage()}
            >
              {"<"}
            </button>
          </li>
          <li>
            {pageOptions.map((number: number) => (
              <button
                onClick={() => {
                  gotoPage(number);
                }}
                key={number}
                className={
                  number === pageIndex
                    ? "px-3 py-2 leading-tight text-grey-100 bg-grey-900 border border-grey-300 hover:bg-grey-100 hover:text-grey-700"
                    : "px-3 py-2 leading-tight text-grey-500 bg-white border border-grey-300 hover:bg-grey-100 hover:text-grey-700"
                }
              >
                {number + 1}
              </button>
            ))}
          </li>
          <li>
            <button
              disabled={!canNextPage}
              className="px-3 py-2 leading-tight text-grey-500 bg-white border border-grey-300 rounded-r-lg hover:bg-grey-100 hover:text-grey-700 disabled:bg-grey-300"
              onClick={() => nextPage()}
            >
              {">"}
            </button>
          </li>
          <li>
            <select
              value={pageSize}
              className="w-40 cursor-default bg-white ml-3 h-10 text-center shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
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
    </div>
  );
};

export default ReactTable;
