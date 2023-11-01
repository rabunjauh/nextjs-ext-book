"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useFieldArray, Control, useWatch } from "react-hook-form";
// import Button from "@/components/Button";
import MessageAlert from "@/components/MessageAlert";
import { Button } from "@/components/ui/button";

export default function AddGroup() {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      group: [{ description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "group",
    control,
    rules: {
      required: true,
    },
  });

  const toggle = () => {
    setModal(!modal);
    reset({
      group: [{ description: "" }],
    });
  };

  const closeAlert = () => {
    setAlert(false);
  };

  const submit = async (data) => {
    try {
      const createGroups = await postGroup(data);
      setAlert(true);
      setMessage(createGroups);
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    setModal(false);
  };

  const postGroup = (data) => {
    return fetch("http://localhost:3000/group", {
      method: "POST",
      body: JSON.stringify(data.group),
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
      {alert ? (
        <MessageAlert messageValue={message} onClick={closeAlert} />
      ) : null}

      <Button variant="outline" size="sm" onClick={toggle}>
        Add Group
      </Button>

      {modal ? (
        <div className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/70 z-50">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="font-bold text-lg">Add New Group</h3>
            <div>
              <Button variant="outline" size="sm" onClick={() => append()}>
                Append
              </Button>
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <table className="table-auto border-collapse border border-slate-300 w-full my-2 shadow-md">
                <thead>
                  <tr className="bg-gray-400">
                    <th className="border border-slate-300 px-2">#</th>
                    <th className="border border-slate-300 px-2">
                      Group Description
                    </th>
                    <th className="border border-slate-300 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => {
                    return (
                      <tr className="bg-gray-200" key={field.id}>
                        <td className="border border-slate-300 px-2">
                          {index + 1}
                        </td>
                        <td className="border border-slate-300 p-2">
                          <input
                            type="text"
                            {...register(`group.${index}.description`, {
                              required: true,
                            })}
                            className="w-full mb-2 mr-2"
                          />
                          <p>
                            {errors.group?.[index]?.description && (
                              <p>This can't be empty</p>
                            )}
                          </p>
                        </td>
                        <td className="border border-slate-300 px-2">
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