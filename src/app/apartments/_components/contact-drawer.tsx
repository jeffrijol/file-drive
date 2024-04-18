import * as React from "react"
import { Check, BellRing } from "lucide-react"
/* import { Bar, BarChart, ResponsiveContainer } from "recharts" */

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"



export function ContactDrawer() {

    return (
        <Drawer onClose={() => console.log('Drawer closed')}>
            <DrawerTrigger asChild>
                <Button className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Contacto
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Don Ramón</DrawerTitle>
                        <DrawerDescription>Calle don Ramón de la Cruz 51, 6 a</DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-2">
                        <ProfileForm className="px-4" />
                    </div>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cerrar</Button>
                        </DrawerClose> 
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}



function ProfileForm({ className }: React.ComponentProps<"form">) {
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className=" flex items-center space-x-4 rounded-md border p-4">
                <BellRing />
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Push de notifiaciones
                    </p>
                    <p className="text-sm text-muted-foreground">
                        juans@gmail.com
                    </p>
                </div>
                <Switch />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" defaultValue="eulogio@example.com" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="username">Contrado por</Label>
                <Input id="username" defaultValue="Eulogio S F" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="tel">Teléfono</Label>
                <Input id="tel" defaultValue="942658745" />
            </div>{/* 
            <Button type="submit">Save changes</Button> */}
        </form>
    )
}
