'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Dashboard } from '@/components/Dashboard'
import { ExpenseForm } from '@/components/ExpenseForm'
import { ExpenseList } from '@/components/ExpenseList'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Expense } from '@/types'
import { BarChart3, List, Plus, X } from 'lucide-react'

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses'>('dashboard')

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('dhakad-anda-farm-expenses')
    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses).map((expense: any) => ({
        ...expense,
        date: new Date(expense.date)
      }))
      setExpenses(parsedExpenses)
    }
  }, [])

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('dhakad-anda-farm-expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
    }
    setExpenses([newExpense, ...expenses])
    setShowForm(false)
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setShowForm(true)
  }

  const handleUpdateExpense = (expenseData: Omit<Expense, 'id'>) => {
    if (editingExpense) {
      const updatedExpense: Expense = {
        ...expenseData,
        id: editingExpense.id,
      }
      setExpenses(expenses.map(exp => exp.id === editingExpense.id ? updatedExpense : exp))
      setEditingExpense(null)
      setShowForm(false)
    }
  }

  const handleDeleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(exp => exp.id !== id))
    }
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingExpense(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddExpense={() => setShowForm(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <div className="flex justify-center">
            <ExpenseForm
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              onCancel={handleCancelForm}
              initialData={editingExpense || undefined}
              isEditing={!!editingExpense}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm border">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'expenses' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('expenses')}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                Expenses
              </Button>
            </div>

            {/* Content */}
            {activeTab === 'dashboard' ? (
              <Dashboard expenses={expenses} />
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Expense Management</h2>
                  <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Expense
                  </Button>
                </div>
                <ExpenseList
                  expenses={expenses}
                  onEdit={handleEditExpense}
                  onDelete={handleDeleteExpense}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Welcome Message for Empty State */}
      {!showForm && expenses.length === 0 && activeTab === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <span className="text-4xl">🥚</span>
                Welcome to Dhakad Andaa Farm!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Start tracking your egg farm expenses to better manage your business finances.
              </p>
              <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 mx-auto">
                <Plus className="h-4 w-4" />
                Add Your First Expense
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 