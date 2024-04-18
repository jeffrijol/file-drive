import { BellRing } from "lucide-react"

import { cn } from "@/lib/utils"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch";
import { ContactDrawer } from "./contact-drawer";
import { ContractsDrawer } from "./contracts-drawer";

const notifications = [
  {
    title: "Contrato de luz",
    description: "Iberdrola",
  }
]

type CardProps = React.ComponentProps<typeof Card>

export function ApartmentCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Don Ramón</CardTitle>
        <CardDescription>Casa de apartamento en zona residencial</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Alquilado actualmente
            </p>
            <p className="text-sm text-muted-foreground">
              Juan Silio F
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-2 p-4">
        <ContactDrawer />
        <ContractsDrawer />
      </CardFooter>
    </Card>
  )
}
