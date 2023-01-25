import Head from "next/head";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddNurse from "./AddNurse";
import { AppDispatch } from "store";
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

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: any) => state?.nurse);

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

            <AddNurse />
            <Table columns={columns} data={data ?? []} />
          </>
        )}
      </Layout>
    </div>
  );
};

export default withAuth(Dashboard);
