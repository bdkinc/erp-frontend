import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Banknote,
  BarChart, BookOpen, BookUser, Building2, ChartSpline,
  ChevronDown,
  ChevronRight, CircleDollarSign,
  Coins,
  DollarSign,
  Earth,
  FileText, Frown, Grid2X2,
  HandCoins,
  HandPlatter,
  HelpCircle,
  ListTree,
  LogOut,
  type LucideProps, Receipt,
  ScrollText,
  Settings,
  Star, TableProperties, Truck,
  Users, WalletCards
} from 'lucide-react'
import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  useState
} from 'react'

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
    icon: Star,
    label: 'Favorites',
    subItems: []
  },
  {
    icon: HandCoins,
    label: 'Accounts Payable',
    subItems: [
      { label: 'Analytics', icon: BarChart },
      { label: 'Reports', icon: FileText }
    ]
  },
  {
    icon: DollarSign,
    label: 'Accounts Receivable',
    subItems: [
      { label: 'Team', icon: Users },
      { label: 'Permissions', icon: Settings }
    ]
  },
  {
    icon: FileText,
    label: 'Billing',
    subItems: []
  },
  {
    icon: ListTree,
    label: 'Bill of Material',
    subItems: []
  },
  {
    icon: Banknote,
    label: 'Cash Management',
    subItems: []
  },
  {
    icon: Coins,
    label: 'Cost Accounting',
    subItems: []
  },
  {
    icon: Settings,
    label: 'Cross Applications',
    subItems: []
  },
  {
    icon: Earth,
    label: 'Currency Translation',
    subItems: []
  },
  {
    icon: HandPlatter,
    label: 'Customer Orders',
    subItems: []
  },
  {
    icon: ScrollText,
    label: 'Customer Quotes',
    subItems: []
  },
  {
    icon: Frown,
    label: 'Deduction Management',
    subItems: []
  },
  {
    icon: Building2,
    label: 'Executive',
    subItems: []
  },
  {
    icon: TableProperties,
    label: 'General Ledger',
    subItems: []
  },
  {
    icon: Grid2X2,
    label: 'Inventory',
    subItems: []
  },
  {
    icon: CircleDollarSign,
    label: 'Multi-currency',
    subItems: []
  },
  {
    icon: BookOpen,
    label: 'Material Planning',
    subItems: []
  },
  {
    icon: BookUser,
    label: 'Production Control',
    subItems: []
  },
  {
    icon: WalletCards,
    label: 'Purchasing',
    subItems: []
  },
  {
    icon: ChartSpline,
    label: 'Sales Analysis',
    subItems: []
  },
  {
    icon: Truck,
    label: 'Shipping',
    subItems: []
  },
  {
    icon: Receipt,
    label: 'Taxes',
    subItems: []
  },
  {
    icon: HelpCircle,
    label: 'Help',
    subItems: []
  }
]

export default function SidebarContent() {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center h-16 p-4">
        <span className="text-2xl font-semibold font-heading">
          <span className="text-primary font-bold">BDK</span>
          <span>erp</span>
        </span>
      </div>
      <ScrollArea className="flex-1">
        <nav>
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
