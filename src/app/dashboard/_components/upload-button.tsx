"use client";

import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";

const formSchema = z.object({
  title: z.string().min(1).max(200),
  typeCat: z
  .string({
    required_error: "Por favor indicar una categoría.",
  }).min(5).max(50),
  filePeriod: z
  .string({
    required_error: "Por favor indicar un período fiscal.",
  }).min(4).max(9),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`),
});

export function UploadButton() {
  const { toast } = useToast();
  const organization = useOrganization();
  const user = useUser();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
      typeCat: "Otros",
      filePeriod: "I-24",
    },
  });

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!orgId) return;

    const postUrl = await generateUploadUrl();

    const fileType = values.file[0].type;
    const fileTypeCat = values.typeCat;    
    const filePeriods = values.filePeriod;

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": fileType },
      body: values.file[0],
    });
    const { storageId } = await result.json();

    const types = {
      "image/png": "image",
      "application/pdf": "pdf",
      "text/csv": "csv",
    } as Record<string, Doc<"files">["type"]>;

    const typeCat = {
      "Administrativo": "Administrativo",
      "Inmueble": "Inmueble",
      "Otros": "Otros",
    } as Record<string, Doc<"files">["typeCat"]>;

    const filePeriod = {
      "I-24": "I-24",
      "II-24": "II-24",
      "III-24": "III-24",
      "IV-24": "IV-24",
    } as Record<string, Doc<"files">["filePeriod"]>;

    try {
      await createFile({
        name: values.title,
        fileId: storageId,
        orgId,
        type: types[fileType],
        typeCat: typeCat[fileTypeCat],
        filePeriod: filePeriod[filePeriods],
      });

      form.reset();

      setIsFileDialogOpen(false);

      toast({
        variant: "success",
        title: "Archivo subido",
        description: "Ahora todos pueden ver su archivo",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Algo salió mal",
        description: "Su archivo no se pudo cargar, inténtelo más tarde",
      });
    }
  }

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const createFile = useMutation(api.files.createFile);

  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Subir archivo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Descargue su archivo aquí</DialogTitle>
          <DialogDescription>
          Cualquier persona de su organización podrá acceder a este archivo.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="typeCat"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue  placeholder="Seleccione a que categoría quiere relacionar el archivo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Administrativo">Gasto administrativo</SelectItem>
                        <SelectItem value="Inmueble">Inmueble</SelectItem>
                        <SelectItem value="Otros">Otros</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      El archivo se relacionará a la categoría selecionada
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="filePeriod"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue  placeholder="Seleccione el período al quiere relacionar el archivo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="I-24">I-24</SelectItem>
                        <SelectItem value="II-24">II-24</SelectItem>
                        <SelectItem value="III-24">III-24</SelectItem>
                        <SelectItem value="IV-24">IV-24</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      El archivo se relacionará al período selecionado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>Archivo</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-1"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Subir
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
