"use client";
import { useState } from "react";

type User = {
  name: string;
  email: string;
  course: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [user, setUser] = useState<User[]>([]);
  const [editEmail, setEditEmail] = useState<string | null>(null);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (editEmail) {
      setUser((prev) =>
        prev.map((u) => (u.email === editEmail ? { name, email, course } : u))
      );
      setEditEmail(null);
    } else {
      const newUser = { name, email, course };
      setUser((prevVal) => [...prevVal, newUser]);
    }
    setName("");
    setEmail("");
    setCourse("");
  };

  const handleDelete = (emailToDelete: string) => {
    setUser((val) => val.filter((u) => u.email !== emailToDelete));
  };

  const handleUpdate = (user: User) => {
    setEditEmail(user.email);
    setName(user.name);
    setEmail(user.email);
    setCourse(user.course);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-gray-700">
          {editEmail ? "Edit User" : "Add User"}
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Course
          </label>
          <input
            type="text"
            value={course}
            placeholder="Enter your course"
            onChange={(e) => setCourse(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {editEmail ? "Update User" : "Add User"}
        </button>
      </form>

      {user.length > 0 && (
        <ul className="w-full max-w-md mt-6 space-y-4">
          {user.map((user, index) => (
            <li
              key={index}
              className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2"
            >
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.course}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleUpdate(user)}
                  className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.email)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
