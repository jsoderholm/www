import "@/styles/command.scss"

import { Command as CommandPrimitive } from "cmdk"
import React from "react"
import { CMD_K_EVENT } from "@/lib/constants"
import type { PagefindSearchResultWithData } from "@/lib/pagefind"

export function Command() {
  const [open, onOpenChange] = React.useState(false)
  const [results, setResults] = React.useState<PagefindSearchResultWithData[]>([])

  const handleValueChange = async (query: string) => {
    if (!window.pagefind) return

    const response = await window.pagefind.debouncedSearch(query)
    if (!response) return

    setResults(
      await Promise.all(response.results.map(async (r) => ({ ...r, data: await r.data() })))
    )
  }

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
      shouldFilter={false}
    >
      <div cmdk-raycast-top-shine="" />
      <CommandPrimitive.Input onValueChange={handleValueChange} placeholder="Search..." autoFocus />
      <hr cmdk-raycast-loader="" />
      <CommandPrimitive.List>
        <CommandPrimitive.Empty className="animate-in fade-in">
          No results found.
        </CommandPrimitive.Empty>
        {results.length > 0 && (
          <CommandPrimitive.Group heading="Results">
            {results.map((result) => (
              <CommandPrimitive.Item
                key={result.id}
                value={result.data.meta.title}
                onSelect={() => (window.location.href = result.data.url)}
                className="flex items-center justify-between"
              >
                {result.data.meta.title}
              </CommandPrimitive.Item>
            ))}
          </CommandPrimitive.Group>
        )}
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
