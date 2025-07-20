'use client'

import { Button } from '@/components/ui/Button'
import { Plus, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  onAddExpense: () => void
}

export function Header({ onAddExpense }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🥚</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Dhakad Andaa Farm</h1>
                  <p className="text-sm text-gray-500">Expense Tracker</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Button onClick={onAddExpense} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-2">
              <Button onClick={onAddExpense} className="flex items-center gap-2 w-full justify-center">
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 