"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  description: string;
};

export default function EditGroup(id) {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const openModal = async () => {
    const res = await fetch(`http://localhost:3000/group/${id.id}`);
    const resData = await res.json();

    const data = resData.data || [];

    setValue("description", data[0].description);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    reset({
      description: "",
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      description: "",
    },
  });

  const submit = async (data) => {
    try {
      const createGroups = await postGroup(data);
      toast.success(createGroups);
    } catch (error) {
      console.log(error);
      toast.error("There is something wrong, added data failed");
    }
    router.refresh();
    setModal(false);
  };

  const postGroup = (data) => {
    return fetch(`http://localhost:3000/group/${id.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
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

      <Button variant="outline" size="sm" onClick={openModal}>
        Edit
      </Button>

      {modal ? (
        <div className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/70 z-50">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="font-bold text-lg">Edit Group</h3>
            <form onSubmit={handleSubmit(submit)}>
              <div className="mb-2">
                <label className="mb-2">Description</label>
                <Input
                  {...register("description", {
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  })}
                />
                <p className="mt-1 text-xs text-red-600">
                  {errors.description && errors.description.message}
                </p>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" type="submit">
                  Submit
                </Button>

                <Button variant="outline" size="sm" onClick={closeModal}>
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
