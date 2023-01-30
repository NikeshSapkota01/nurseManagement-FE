import Head from "next/head";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";

import withAuth from "src/lib/withAuth";
import { AppDispatch, RootState } from "store";
import { deleteNurse, fetchAllNurse } from "@/reducers/nurse";

import AddNurse from "./AddNurse";
import Layout from "@/components/Layout";
import { getFullName } from "@/utils/utils";
import Table from "@/components/common/Table";
import Loading from "@/components/Layout/Loader";
import DropDown from "@/components/Layout/Dropdown";
import DeleteModal from "@/components/Layout/DeleteModal";
import { Checkbox } from "@/components/common/Table/Checkbox";

type CellProps = {
  value: number;
};

const Dashboard: NextPage = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("info");
  const [open, setOpen] = useState(false);
  const [currentNurseId, setCurrentNurseId] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state?.nurse);

  const columns = useMemo(
    () => [
      {
        Header: "Full  Name",
        accessor: ({
          firstName,
          middleName,
          lastName,
        }: {
          firstName: string;
          middleName: string;
          lastName: string;
        }) => getFullName(firstName, middleName, lastName),
      },
      {
        Header: "Email",
        accessor: "email",
        isSortable: true,
      },
      {
        Header: "Contact",
        accessor: "contact",
        isSortable: true,
      },
      {
        Header: "Is Rounding Manager",
        accessor: "isRoundingManager",
        isSortable: true,
      },
      {
        Header: "Working days",
        accessor: "working_days",
        isSortable: true,
      },
      {
        Header: "Start Time",
        accessor: "duty_start_time",
        isSortable: true,
      },
      {
        Header: "End Time",
        accessor: "duty_end_time",
        isSortable: true,
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ value: initialValue }: CellProps) => {
          const onItemClick = (value: string) => {
            console.log("value", value, initialValue);
            setCurrentNurseId(initialValue);
            if (value === "delete") setOpen(true);
          };

          return (
            <DropDown
              options={[
                { label: "Edit", value: "edit" },
                { label: "Delete", value: "delete" },
              ]}
              onItemClick={onItemClick}
            />
          );
        },
      },
    ],
    []
  );

  const tableProps = useTable(
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
          Cell: ({ row }: { row: any }) => (
            <Checkbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    dispatch(fetchAllNurse());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      const { data, status } = userInfo;

      setData(data);
      setStatus(status);
    }
  }, [userInfo]);

  useEffect(() => {
    if (open) {
      DeleteModal({
        confirmHandler: () => handleDelete(),
      });
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleDelete = () => {
    dispatch(deleteNurse(currentNurseId));
    setCurrentNurseId(0);
  };

  return (
    <div>
      <Head>
        <title>Nurse Dashboard</title>
        <meta name="description" content="Nurse management | Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {status === "loading" ? (
          <Loading />
        ) : (
          <>
            <h1> Nurse Management </h1>

            <AddNurse />
            <Table tableProps={tableProps} />

            {JSON.stringify(
              {
                selectedFlatRows: tableProps.selectedFlatRows?.map(
                  ({ original }) => original
                ),
              },
              null,
              2
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export default withAuth(Dashboard);
