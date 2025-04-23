"use client"
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white">
          <div className="flex flex-col p-8 space-y-4">
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="nav-link">Investissements</a>
              <a href="#" className="nav-link">Crédits</a>
              <a href="#" className="nav-link">Nos Membres</a>
              <a href="#" className="nav-link">Qui sommes-nous ?</a>
              <a href="#" className="nav-link">Contact</a>
            </div>
            <div className="pt-4">
              <Link href="/auth/login">
                <Button className="bg-[#00a455] text-white hover:bg-green-500">
                  Se connecter
                </Button>
              </Link>
            </div>
            {/* <div>
              <Link href="/auth/register">
                <Button variant="outline" className="w-full border-[#2299DD] text-[#2299DD] hover:bg-[#2299DD] hover:text-white">
                  S'inscrire
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
