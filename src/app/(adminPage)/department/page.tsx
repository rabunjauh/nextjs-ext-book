import { Department, columns } from "./columns";
import { DataTable } from "./data-table";
import AddDepartment from "@/components/department/AddDepartment";

async function getData(): Promise<Department[]> {
  const res = await fetch("http://localhost:3000/department", {
    cache: "no-store",
  });

  if (res.status === 204) {
    return [];
  } else {
    const resData = await res.json();

    // get array 'data' from resData
    const data = resData.data || [];
    return data;
  }
}

export default async function GetDepartment() {
  const data = await getData();
  return (
    <div className="md:ml-60 px-10 bg-white">
      <h1 className="text-5xl mb-10">Group</h1>
      <AddDepartment />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
