"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddDepartment() {
  const [modal, setModal] = useState(false);
  const [orderOpt, setOrderOpt] = useState([]);
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      department: [{ name: "", status: "", order: "", groupId: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "department",
    control,
    rules: {
      required: true,
    },
  });

  useEffect(() => {
    fetch("http://localhost:3000/group")
      .then((data) => data.json())
      .then((val) => setOrderOpt(val.data));
  }, []);

  console.log(orderOpt);

  const toggle = () => {
    setModal(!modal);
    reset({
      department: [{ name: "", status: "", order: "", groupId: "" }],
    });
  };

  const submit = async (data: FieldValues) => {
    try {
      const createDepartments = await postDepartment(data);
      toast.success(createDepartments);
    } catch (error) {
      console.log(error);
      toast.error("There is something wrong, added data failed");
    }
    router.refresh();
    setModal(false);
  };

  const postDepartment = (data: FieldValues) => {
    return fetch("http://localhost:3000/department", {
      method: "POST",
      body: JSON.stringify(data.department),
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

  modal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div>
      <ToastContainer />

      <Button variant="outline" size="sm" onClick={toggle}>
        Add Department
      </Button>
      <hr className="mt-2" />

      {modal ? (
        <div className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/70 z-50">
          <div className="bg-white p-5 rounded-lg w-full mx-5">
            <h3 className="font-bold text-lg">Add New Group</h3>
            <div>
              <Button variant="outline" size="sm" onClick={() => append()}>
                Append
              </Button>
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4 my-2">
                <table className="table-auto border-collapse border border-{#E5E7EB} w-full my-2 shadow-md">
                  <thead>
                    <tr>
                      <th className="border border-{#E5E7EB} px-2">#</th>
                      <th className="border border-{#E5E7EB} px-2">
                        Department Name
                      </th>
                      <th className="border border-{#E5E7EB} px-2">Status</th>
                      <th className="border border-{#E5E7EB} px-2">Order</th>
                      <th className="border border-{#E5E7EB} px-2">Group</th>
                      <th className="border border-{#E5E7EB} px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => {
                      return (
                        <tr key={field.id}>
                          <td className="border border-{#E5E7EB} px-2">
                            {index + 1}
                          </td>
                          <td className="border border-{#E5E7EB} p-2">
                            <Input
                              type="text"
                              {...register(`department.${index}.name`, {
                                required: true,
                              })}
                              className="w-full mb-2 mr-2"
                            />
                            <p>
                              {errors.department?.[index]?.name && (
                                <p>This can't be empty</p>
                              )}
                            </p>
                          </td>
                          <td className="border border-{#E5E7EB} p-2">
                            <select
                              {...register(`department.${index}.status`, {
                                required: true,
                              })}
                            >
                              <option value="">Select...</option>
                              <option value="1">Active</option>
                              <option value="0">Not Active</option>
                            </select>
                            <p>
                              {errors.department?.[index]?.status && (
                                <p>This can't be empty</p>
                              )}
                            </p>
                          </td>
                          <td className="border border-{#E5E7EB} p-2">
                            <Input
                              type="text"
                              {...register(`department.${index}.order`, {
                                required: true,
                              })}
                              className="w-full mb-2 mr-2"
                            />
                            <p>
                              {errors.department?.[index]?.order && (
                                <p>This can't be empty</p>
                              )}
                            </p>
                          </td>
                          <td className="border border-{#E5E7EB} p-2">
                            <select
                              {...register(`department.${index}.groupId`, {
                                required: true,
                              })}
                            >
                              <option value="">Select...</option>
                              {orderOpt.map((opt, i) => (
                                <option key={i} value={opt.groupId}>
                                  {opt.description}
                                </option>
                              ))}
                            </select>
                            <p>
                              {errors.department?.[index]?.groupId && (
                                <p>This can't be empty</p>
                              )}
                            </p>
                          </td>

                          <td className="border border-{#E5E7EB} px-2">
                            {index > 0 ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ScrollArea>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" type="submit">
                  Submit
                </Button>

                <Button variant="outline" size="sm" onClick={toggle}>
                  Close
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
