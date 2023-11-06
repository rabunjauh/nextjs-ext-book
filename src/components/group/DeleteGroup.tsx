import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteGroup({ table }) {
  const router = useRouter();

  const executeDelete = async () => {
    try {
      const destroyGroup = await removeGroup();
      toast.success(destroyGroup);
    } catch (error) {
      console.log(error);
      toast.error("There is something wrong, delete data failed");
    }
    router.refresh();
  };

  const removeGroup = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const deleteData: number[] = [];

    selectedRows.map((row) => {
      deleteData.push(row.original.id);
    });
    return fetch("http://localhost:3000/multipleDeleteGroup", {
      method: "DELETE",
      body: JSON.stringify({
        id: deleteData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        return response.message;
      });
  };

  return (
    <div>
      <ToastContainer />
      <Button variant="outline" onClick={executeDelete}>
        Delete Selected
      </Button>
    </div>
  );
}
