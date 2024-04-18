"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-40 flex flex-col gap-4">
      <Link href="/files">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes("/files"),
          })}
        >
          <FileIcon /> Todos
        </Button>
      </Link>

      <Link href="/files/favorites">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes("/files/favorites"),
          })}
        >
          <StarIcon /> Facturas
        </Button>
      </Link>

      <Link href="/files/trash">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes("/files/trash"),
          })}
        >
          <TrashIcon /> Eliminados
        </Button>
      </Link>
    </div>
  );
}
