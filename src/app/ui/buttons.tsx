"use client";

import { Button } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { deleteRecipe } from "@/app/lib/action";
import Link from "next/link";
import { useTransition } from "react";

export function ViewRecipeButton({ id }: { id: string }) {
  return (
    <Link href={`/recipes/${id}`}>
      <Button variant="contained" color="primary" >
          View
      </Button>
    </Link>
  )
}

export function AddRecipeButton() {
  return (
    <Link href="/recipes/add">
      <Button variant="contained" color="primary" startIcon={<Add />}>
        Add Recipe
      </Button>
    </Link>
  );
}

export function UpdateRecipeButton({ id }: { id: string }) {
  return (
    <Link href={`/recipes/${id}/update`}>
      <Button variant="outlined" color="secondary" startIcon={<Edit />}>
        Edit
      </Button>
    </Link>
  );
}

export function DeleteRecipeButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => startTransition(async () => {
        await deleteRecipe(id);
      })}
      className="inline"
    >
      <Button type="submit" variant="outlined" color="error" startIcon={<Delete />} >
        Delete
      </Button>
    </form>
  );
}
