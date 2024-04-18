"use client";
import { ApartmentCard } from "./apartment-card";
import Image from "next/image";
import { GridIcon, RowsIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        alt="an image of a picture and directory icon"
        width="300"
        height="300"
        src="/empty.svg"
      />
      <div className="text-2xl">No tienes archivos, sube uno ahora</div>
    </div>
  );
}

export function ApartmentBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>

        
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
          <TabsList className="mb-2">
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <RowsIcon /> Tabla
            </TabsTrigger>
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon />
              Grid
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center">
            <Label htmlFor="type-select">Categoría</Label>
            <Select
            >
              <SelectTrigger id="type-select" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Administrativo">Gasto administrativo</SelectItem>
                <SelectItem value="Inmueble">Inmueble</SelectItem>
                <SelectItem value="Otros">Otros</SelectItem> 
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="grid">
          <div className="grid grid-cols-3 gap-4">
            
          <ApartmentCard />
          <ApartmentCard />
          <ApartmentCard />
          </div>
        </TabsContent>
        <TabsContent value="table">
          <ApartmentCard />
          <ApartmentCard />
          <ApartmentCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
