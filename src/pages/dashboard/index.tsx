import Head from "next/head";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import withAuth from "src/lib/withAuth";
import Layout from "@/components/Layout";
import { getFullName } from "@/utils/utils";
import Table from "@/components/common/Table";
import Loading from "@/components/Layout/Loader";
import DropDown from "@/components/Layout/Dropdown";
import DeleteModal from "@/components/Layout/DeleteModal";
import { deleteNurse, fetchAllNurse } from "@/reducers/nurse";

type CellProps = {
  value: number;
};

const Dashboard: NextPage = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("info");
  const [open, setOpen] = useState(false);
  const [currentNurseId, setCurrentNurseId] = useState(0);

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

  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state?.nurse);

  useEffect(() => {
    dispatch(fetchAllNurse() as any);
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
            <button
              className="inline-block mb-9 p-2 mt-5 h-10 bg-blue-500 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-blue-200"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              onClick={() => setOpen(true)}
            >
              Add New Nurse
            </button>
            <Table columns={columns} data={data ?? []} />
          </>
        )}
      </Layout>
    </div>
  );
};

export default withAuth(Dashboard);
