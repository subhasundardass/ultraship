"use client";

import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { client } from "@/lib/apolloClient";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Employee } from "@/graphql/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmployeeRow from "../components/EmployeeRow";
import EmployeeTableSkeleton from "../components/EmployeeTableSkeleton";

const LIST_EMPLOYEES = gql`
  query {
    listEmployees {
      id
      name
      age
      designation
      gender
      attendence
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $age: Int!
    $designation: String!
    $gender: String!
    $attendence: Int!
  ) {
    addEmployee(
      name: $name
      age: $age
      designation: $designation
      gender: $gender
      attendence: $attendence
    ) {
      id
      name
      age
      designation
      gender
      attendence
    }
  }
`;
const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: Int!) {
    deleteEmployee(id: $id)
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: Int!
    $name: String!
    $age: Int!
    $designation: String!
    $gender: String!
    $attendence: Int!
  ) {
    updateEmployee(
      id: $id
      name: $name
      age: $age
      designation: $designation
      gender: $gender
      attendence: $attendence
    ) {
      id
      name
      age
      designation
      gender
      attendence
    }
  }
`;

interface ListEmployeesData {
  listEmployees: Employee[];
}

export default function EmployeesPage() {
  const { data, loading, error, refetch } = useQuery<ListEmployeesData>(
    LIST_EMPLOYEES,
    {
      client,
      fetchPolicy: "cache-and-network",
    }
  );
  const [filter, setFilter] = useState("");

  //--Add new employee (Subha)
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    client,
    refetchQueries: ["ListEmployees"],
  });

  // New Employee Form State
  const [form, setForm] = useState({
    name: "",
    age: "",
    designation: "",
    gender: "Male",
    attendence: "",
  });

  //-- Pagination (Subha)
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  console.log(data);

  // Handle Add Employee event
  const handleAddEmployee = async () => {
    await addEmployee({
      variables: {
        name: form.name,
        age: Number(form.age),
        designation: form.designation,
        gender: form.gender,
        attendence: Number(form.attendence),
      },
    });
    setForm({ name: "", age: "", designation: "", gender: "", attendence: "" });
    // refetch(); //
  };

  // const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
  //   refetchQueries: ["ListEmployees"],
  // });

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    designation: "",
    gender: "",
    attendence: "",
  });

  //--update mutation
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    client,
    refetchQueries: ["ListEmployees"],
  });

  const employees = data?.listEmployees || [];

  // Filter employees
  const filteredEmployees = employees.filter((emp) =>
    [emp.name, emp.designation, emp.gender]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );
  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 800); // 👈 800ms (adjust as you like)

      return () => clearTimeout(timer);
    }
  }, [loading]);
  // if (loading)
  //   return (
  //     <div className="flex min-h-screen flex-col items-center justify-center gap-3">
  //       <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //       <p className="text-sm text-muted-foreground">Loading employees...</p>
  //     </div>
  //   );

  // if (error)
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <p className="text-lg font-medium text-red-500">
  //         Error: {error.message}
  //       </p>
  //     </div>
  //   );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Employees</CardTitle>
            <CardDescription>Manage employee records</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Search..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-8"
            />

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Add Employee</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Employee</DialogTitle>
                  <DialogDescription>
                    Enter employee details below
                  </DialogDescription>
                </DialogHeader>

                {/* FORM */}
                <div className="grid gap-4 py-4">
                  {/* Name */}
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Employee name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>

                  {/* Age */}
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      value={form.age}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, age: e.target.value }))
                      }
                    />
                  </div>

                  {/* Designation */}
                  <div className="grid gap-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      placeholder="Designation"
                      value={form.designation}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          designation: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Gender */}
                  <div className="grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    {/* <Input
                      id="gender"
                      placeholder="Gender"
                      value={form.gender}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, gender: e.target.value }))
                      }
                    /> */}
                    <Select
                      value={form.gender}
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, gender: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Attendance */}
                  <div className="grid gap-2">
                    <Label htmlFor="attendence">Attendance (%)</Label>
                    <Input
                      id="attendence"
                      type="number"
                      placeholder="0–100"
                      value={form.attendence}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          attendence: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddEmployee}>Add</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Employee</DialogTitle>
                  <DialogDescription>Update employee details</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Age</Label>
                    <Input
                      type="number"
                      value={editForm.age}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, age: e.target.value }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Designation</Label>
                    <Input
                      value={editForm.designation}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          designation: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Gender</Label>
                    {/* <Input
                      value={editForm.gender}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, gender: e.target.value }))
                      }
                    /> */}
                    <Select
                      value={editForm.gender}
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, gender: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Attendance</Label>
                    <Input
                      type="number"
                      value={editForm.attendence}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          attendence: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpenEdit(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={async () => {
                      if (!selectedEmployee) return;

                      await updateEmployee({
                        variables: {
                          id: selectedEmployee.id,
                          name: editForm.name,
                          age: Number(editForm.age),
                          designation: editForm.designation,
                          gender: editForm.gender,
                          attendence: Number(editForm.attendence),
                        },
                      });

                      setOpenEdit(false);
                      setSelectedEmployee(null);
                    }}
                  >
                    Update
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Attendence</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {showSkeleton ? (
                <EmployeeTableSkeleton rows={recordsPerPage} />
              ) : currentEmployees.length > 0 ? (
                currentEmployees.map((emp) => (
                  <EmployeeRow
                    key={emp.id}
                    employee={emp}
                    onEdit={(emp) => {
                      setSelectedEmployee(emp);
                      setEditForm({
                        name: emp.name,
                        age: String(emp.age),
                        designation: emp.designation!,
                        gender: emp.gender!,
                        attendence: String(emp.attendence),
                      });
                      setOpenEdit(true);
                    }}
                    onDelete={(id) => {
                      if (!confirm("Delete employee?")) return;
                      // deleteEmployee({ variables: { id } });
                    }}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-6"
                  >
                    No employees found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-end items-center mt-4 gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm">
              Page {currentPage} of{" "}
              {Math.ceil(filteredEmployees.length / recordsPerPage)}
            </span>

            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
