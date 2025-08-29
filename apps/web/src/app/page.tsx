"use client";

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const GET_TODOS = gql`
  query Todos {
    todos {
      id
      title
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!) {
    createTodo(input: { title: $title }) {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodosQueryResult = {
  todos: Todo[];
};

export default function Page() {
  const { data, loading, error, refetch } = useQuery<TodosQueryResult>(GET_TODOS);
  const [title, setTitle] = useState("");

  const [createTodo, { loading: creating }] = useMutation(CREATE_TODO, {
    onCompleted: () => {
      setTitle("");
      refetch();
    },
  });

  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    onCompleted: () => refetch(),
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => refetch(),
  });

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTodo({ variables: { title: title.trim() } });
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onAdd} className="flex gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task…"
            />
            <Button type="submit" disabled={creating}>
              Add
            </Button>
          </form>

          <Separator className="my-4" />

          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-3/5" />
            </div>
          ) : error ? (
            <p className="text-sm text-red-600">Error: {error.message}</p>
          ) : (
            <ul className="space-y-2">
              {( data?.todos ?? []).map((t: any) => (
                <li key={t.id} className="flex items-center gap-3">
                  <Checkbox
                    checked={t.completed}
                    onCheckedChange={() =>
                      toggleTodo({ variables: { id: t.id } })
                    }
                  />
                  <span
                    className={`flex-1 ${t.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {t.title}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo({ variables: { id: t.id } })}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
