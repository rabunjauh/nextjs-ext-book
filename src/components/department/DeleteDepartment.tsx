import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteDepartment({ table }) {
  const router = useRouter();
  const [confirmModal, setConfirmModal] = useState(false);

  const executeDelete = async () => {
    try {
      const destroyDepartment = await removeDepartment();
      toast.success(destroyDepartment);
    } catch (error) {
      console.log(error);
      toast.error("There is something wrong, delete data failed");
    }
    router.refresh();
  };

  const removeDepartment = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const deleteData: number[] = [];

    selectedRows.map((selectedRow) => {
      deleteData.push(selectedRow.original.departmentId);
    });
    return fetch("http://localhost:3000/multipleDeleteDepartment", {
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
      {confirmModal ? (
        <div className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/70 z-50">
          <div className="bg-white p-5 rounded-lg w-96">
            <h3 className="font-bold text-lg">Delete Item</h3>
            <div>
              Are you sure you want to delete this item?
              <div className="flex justify-end mt-2">
                <div className="px-3">
                  <Button
                    onClick={() => {
                      setConfirmModal(false);
                      window.location.reload();
                    }}
                  >
                    No
                  </Button>
                </div>

                <div>
                  <Button variant="destructive" onClick={executeDelete}>
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Button variant="outline" onClick={() => setConfirmModal(true)}>
        Delete Selected
      </Button>
    </div>
  );
}
