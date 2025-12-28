import * as React from "react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

type CardProps = React.ComponentProps<"div"> & { loading?: boolean }

function Card({ className, loading, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative bg-card text-card-foreground flex flex-col gap-4 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    >
      {loading && (
        <Skeleton className="absolute inset-0 rounded-xl" />
      )}

      <div className={cn(loading ? "opacity-0" : "opacity-100", "relative z-10 w-full")}>
        {children}
      </div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

function CardSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Card className={cn("h-40 relative overflow-hidden", className)}>
      <Skeleton className="absolute inset-0 rounded-xl" />
    </Card>
  )
}

export { CardSkeleton }
