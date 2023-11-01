import { Group, columns } from "./columns";
import { DataTable } from "./data-table";
import AddGroup from "@/components/group/AddGroup";

async function getData(): Promise<Group[]> {
  const res = await fetch("http://localhost:3000/group", {
    cache: "no-store",
  });

  const resData = await res.json();

  const data = resData.data || [];

  return data;
}

export default async function GetGroup() {
  const data = await getData();
  return (
    <div className="md:ml-60 px-10 bg-white">
      <h1 className="text-5xl mb-10">Group</h1>
      <AddGroup />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
