import {
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes
} from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  LayoutDashboard,
  Search,
  Menu,
  Home,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Users,
  FileText,
  BarChart,
  type LucideProps
} from 'lucide-react'
import DarkModeToggle from '@/components/DarkModeToggle.tsx'

interface MenuItem {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  label: string
}

interface ParentItem extends MenuItem {
  subItems: MenuItem[]
}

const menuItems = [
  {
    icon: Home,
    label: 'Home',
    subItems: []
  },
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    subItems: [
      { label: 'Analytics', icon: BarChart },
      { label: 'Reports', icon: FileText }
    ]
  },
  {
    icon: Users,
    label: 'Users',
    subItems: [
      { label: 'Team', icon: Users },
      { label: 'Permissions', icon: Settings }
    ]
  },
  {
    icon: Settings,
    label: 'Settings',
    subItems: []
  },
  {
    icon: HelpCircle,
    label: 'Help',
    subItems: []
  }
]

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
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
        <main className="flex-1 overflow-auto p-4">
          {/* Add your main content here */}
          <div className="bg-card rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">
              Welcome to your Dashboard
            </h2>
            <p>This is where your main content will go.</p>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center h-16 border-b">
        <LayoutDashboard className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-semibold">OneCase</span>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {menuItems.map((item, index) => (
            <CollapsibleMenuItem key={index} item={item} />
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

function CollapsibleMenuItem({ item }: { item: ParentItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-between mb-1"
        onClick={() => item.subItems.length > 0 && setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
        </span>
        {item.subItems.length > 0 &&
          (isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ))}
      </Button>
      {isOpen && item.subItems.length > 0 && (
        <div className="ml-4 border-l pl-2">
          {item.subItems.map((subItem: MenuItem, subIndex: number) => (
            <Button
              key={subIndex}
              variant="ghost"
              className="w-full justify-start mb-1"
            >
              <subItem.icon className="mr-2 h-4 w-4" />
              {subItem.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
