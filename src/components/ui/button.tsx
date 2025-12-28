import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-2 border-black hover:-translate-y-1 active:translate-y-0 active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-gumroad-pink text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000]",
        destructive:
          "bg-red-500 text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000]",
        outline:
          "bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:bg-gumroad-yellow",
        secondary:
          "bg-gumroad-yellow text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000]",
        ghost:
          "border-transparent shadow-none hover:bg-black/5 hover:translate-y-0",
        link: "text-black underline-offset-4 hover:underline border-none shadow-none hover:translate-y-0",
        gumroad: "bg-black text-white shadow-[4px_4px_0px_0px_#888] hover:shadow-[6px_6px_0px_0px_#888] hover:text-gumroad-pink",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-4",
        sm: "h-9 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-12 rounded-sm px-8 has-[>svg]:px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
