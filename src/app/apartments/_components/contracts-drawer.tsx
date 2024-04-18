import * as React from "react"
import { Check, BellRing, Minus, Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button"
import {
    Drawer,
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

const data = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
]

export function ContractsDrawer() {
    /* const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    } */

    return (
        <Drawer onClose={() => console.log('Drawer closed')}>
            <DrawerTrigger asChild>
                <Button className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Detalle Contratos
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
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
    const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="flex items-center justify-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(-10)}
                    disabled={goal <= 200}
                >
                    <Minus className="h-8 w-8" />
                    <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                    <div className="text-6xl font-bold tracking-tighter">
                        {goal}
                    </div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Precio/mes
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(10)}
                    disabled={goal >= 400}
                >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                </Button>
            </div>
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
                <Label htmlFor="username">Nombre</Label>
                <Input id="username" defaultValue="Eulogio S F" />
            </div>{/* 
            <Button type="submit">Save changes</Button> */}
        </form>
    )
}
