"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  name: string;
  status: string;
  order: number;
  groupId: number;
};

export default function EditGroup(id: { id: number }) {
  const [modal, setModal] = useState(false);
  const [orderOpt, setOrderOpt] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/group")
      .then((data) => data.json())
      .then((val) => setOrderOpt(val.data));
  }, []);

  const openModal = async () => {
    const res = await fetch(`http://localhost:3000/department/${id.id}`);
    const resData = await res.json();

    const data = resData.data || [];
    let cols = ["name", "status", "order", "groupId"];

    setValue("name", data[0].name);
    setValue("status", data[0].status);
    setValue("order", data[0].order);
    setValue("groupId", data[0].groupId);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    reset({
      name: "",
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
      name: "",
    },
  });

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
    return fetch(`http://localhost:3000/department/${id.id}`, {
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

  modal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div>
      <ToastContainer />

      <Button variant="outline" size="sm" onClick={openModal}>
        Edit
      </Button>

      {modal ? (
        <div className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/70 z-50">
          <div className="bg-white p-5 rounded-lg w-6/12 mx-5">
            <h3 className="font-bold text-lg">Edit Department</h3>
            <form onSubmit={handleSubmit(submit)}>
              <div className="mb-2 flex-row">
                <label className="mb-2">Department Name</label>
                <Input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  })}
                />
                <p className="mt-1 text-xs text-red-600">
                  {errors.name && errors.name.message}
                </p>

                <div>
                  <label className="mb-2">Status</label>
                </div>
                <select
                  {...register("status", {
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  })}
                >
                  <option value="">Select...</option>
                  <option value="Active">Active</option>
                  <option value="Not Active">Not Active</option>
                </select>
                <p className="mt-5 text-xs text-red-600">
                  {errors.status && errors.status.message}
                </p>

                <label className="mb-2">Order</label>
                <Input
                  {...register("order", {
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  })}
                />
                <p className="mt-1 text-xs text-red-600">
                  {errors.order && errors.order.message}
                </p>

                <div>
                  <label className="mb-2">Group</label>
                </div>
                <select
                  {...register(`groupId`, {
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  })}
                >
                  <option value="">Select...</option>
                  {orderOpt.map((opt, i) => (
                    <option key={i} value={opt.groupId}>
                      {opt.description}
                    </option>
                  ))}
                </select>
                <p className="mt-5 text-xs text-red-600">
                  {errors.name && errors.name.message}
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
