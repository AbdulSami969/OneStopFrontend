"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import * as LucideIcons from "lucide-react"

interface IconPickerProps {
  value: string
  onChange: (value: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Get all icon names from Lucide
  const iconNames = Object.keys(LucideIcons).filter(
    (name) => typeof LucideIcons[name as keyof typeof LucideIcons] === "function" && name !== "createLucideIcon",
  )

  const filteredIcons = iconNames.filter((name) => name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSelectIcon = (iconName: string) => {
    onChange(iconName)
    setIsOpen(false)
  }

  // Get the current icon component
  const IconComponent =
    value && LucideIcons[value as keyof typeof LucideIcons]
      ? LucideIcons[value as keyof typeof LucideIcons]
      : LucideIcons.HelpCircle

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <IconComponent className="h-4 w-4 mr-2" />
          {value || "Select Icon"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Icon</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input placeholder="Search icons..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

          <div className="grid grid-cols-6 md:grid-cols-8 gap-2 max-h-96 overflow-y-auto p-1">
            {filteredIcons.map((iconName) => {
              const Icon = LucideIcons[iconName as keyof typeof LucideIcons]
              return (
                <Button
                  key={iconName}
                  variant="outline"
                  className="h-12 aspect-square p-0 flex flex-col items-center justify-center gap-1 hover:bg-gray-100"
                  onClick={() => handleSelectIcon(iconName)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] truncate w-full text-center">{iconName}</span>
                </Button>
              )
            })}

            {filteredIcons.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">No icons found</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
