import type { UserType } from "@/domains/types/user";
import React from "react";
import CreateUser from "./create-user";
import UserList from "./user-list";

interface UserSectionProps {
  users: UserType[];
}

export default function UserSection({ users: initialUsers }: UserSectionProps) {
  const [users, setUsers] = React.useState(
    initialUsers.map((user) => ({
      ...user,
    })),
  );

  return (
    <section className="p-10">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between pb-4">
          <h1>AstroApp</h1>

          <div className="flex flex-row gap-2">
            <CreateUser
              onCreated={(u) => {
                setUsers((prev) => [...prev, u]);
              }}
            />
          </div>
        </div>

        <UserList
          users={users}
          onUpdated={(u) => {
            setUsers((prev) => prev.map((r) => (r.id === u.id ? u : r)));
          }}
          onDeleted={(id) => {
            setUsers((prev) => prev.filter((e) => e.id !== id));
          }}
        />
      </div>
    </section>
  );
}
