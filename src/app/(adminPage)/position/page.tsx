import { Position, columns } from "./columns";
import { DataTable } from "./data-table";
import AddPosition from "@/components/position/AddPosition";

async function getData(): Promise<Position[]> {
  const res = await fetch("http://localhost:3000/position", {
    cache: "no-store",
  });

  if (res.status === 204) {
    return [];
  } else {
    const resData = await res.json();

    console.log(resData);
    // get array 'data' from resData
    const data = resData.data || [];
    return data;
  }
}

export default async function GetDepartment() {
  const data = await getData();
  return (
    <div className="md:ml-60 px-10 bg-white">
      <h1 className="text-5xl mb-10">Position</h1>
      <AddPosition />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
