'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '../ui/sidebar'
import { cn } from '@/lib/utils'
import { Home, LayoutDashboard, Settings, LogOut,  Bell, Users, ShoppingCart, FileText, BarChart2, Mail, MessageSquare, Tag, Shield, HelpCircle, FolderOpenDot } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { useEffect } from 'react'
import useAuthStore from '@/stores/authStore'

interface MenuItem {
  icon: any
  label: string
  href: string
  badge?: string
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

const menuSections: MenuSection[] = [
  {
    title: 'Principal',
    items: [
      { icon: Home, label: 'Accueil', href: '/' },
      { icon: LayoutDashboard, label: 'Credit', href: '/dashboard/credit', badge: '10' },
      { icon: FolderOpenDot, label: 'Projets', href: '/dashboard/projects', badge: '5' },
    ]
  },
  {
    title: 'Gestion',
    items: [
      { icon: Users, label: 'Investissement', href: '/dashboard/investissement' },
      { icon: ShoppingCart, label: 'Mes Credit', href: '/dashboard/products' },
      { icon: FileText, label: 'Historique', href: '/dashboard/historique', badge: '5' },
    ]
  },
  {
    title: 'Configuration',
    items: [
      { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
      { icon: Shield, label: 'Sécurité', href: '/dashboard/security' },
      { icon: HelpCircle, label: 'Aide', href: '/dashboard/help' },
    ]
  },
]

export default function SidebarComponent() {
  const pathname = usePathname()

  const { user, isAuthenticated, isLoading, loadUser, logout } = useAuthStore();

    useEffect(() => {
        loadUser();
    }, []);
    

  return (
    <Sidebar className="hidden border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:flex w-[18%]">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Image src="/umurindi.jpeg" alt="Logo" className='rounded-lg' width={40} height={40} />
            </div>
            <h2 className="font-semibold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Umurindi</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex flex-1 flex-col gap-6 py-8 overflow-y-auto ">
        {menuSections.map((section, index) => (
          <SidebarGroup key={section.title}>
            <div className="px-4 mb-2">
              <h3 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            <nav className="grid gap-1 px-2">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      'hover:bg-accent/50 hover:text-accent-foreground',
                      isActive 
                        ? 'bg-primary/50 text-gray-500 font-bold' 
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-5 text-primary" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        item.badge === 'New' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
            {index < menuSections.length - 1 && (
              <div className="mx-4 my-4 h-px bg-border/50" />
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="ring-2 ring-primary/10">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
