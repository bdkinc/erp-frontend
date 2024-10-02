import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Search, Menu } from 'lucide-react'
import DarkModeToggle from '@/components/DarkModeToggle.tsx'
import SidebarContent from '@/components/SidebarContent.tsx'
import { ScrollArea } from '@radix-ui/react-scroll-area'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background font-sans">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 bg-card border-r lg:block">
        <SidebarContent />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-card border-b px-4 py-3 flex items-center">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold mr-4">Dashboard</h1>
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Quick search..."
              className="pl-8 w-full max-w-md"
            />
          </div>
          <div>
            <DarkModeToggle />
          </div>
        </header>

        {/* Main content */}
        <ScrollArea className="flex-1 p-4">
          {/* Add your main content here */}
          <div className="bg-card rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">
              Welcome to your Dashboard
            </h2>
            <p>This is where your main content will go.</p>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
