import "@/styles/command.scss"

import { Command as CommandPrimitive } from "cmdk"
import React from "react"
import { CMD_K_EVENT } from "@/lib/constants"

export function Command() {
  const [open, onOpenChange] = React.useState(false)

  React.useEffect(() => {
    const toggle = () => onOpenChange((open) => !open)
    document.addEventListener(CMD_K_EVENT, toggle)
    return () => document.removeEventListener(CMD_K_EVENT, toggle)
  }, [])

  return (
    <CommandPrimitive.Dialog
      overlayClassName="fixed inset-0 z-40 bg-page opacity-50"
      contentClassName="raycast fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div cmdk-raycast-top-shine="" />
      <CommandPrimitive.Input autoFocus placeholder="Search..." />
      <hr cmdk-raycast-loader="" />
      <CommandPrimitive.List>
        <CommandPrimitive.Empty className="animate-in fade-in">
          No results found.
        </CommandPrimitive.Empty>
      </CommandPrimitive.List>
      <div cmdk-raycast-footer="">
        <button cmdk-raycast-open-trigger="" className="ml-auto">
          Open
          <kbd>↵</kbd>
        </button>
      </div>
    </CommandPrimitive.Dialog>
  )
}
