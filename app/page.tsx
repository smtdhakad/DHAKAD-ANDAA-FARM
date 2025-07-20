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
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses'>('dashboard')
  const [loading, setLoading] = useState(false)

  // Fetch expenses from Supabase on mount
  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false })
      if (!error && data) {
        setExpenses(
          data.map((expense: any) => ({
            ...expense,
            date: new Date(expense.date),
            paymentMethod: expense.payment_method,
          }))
        )
      }
      setLoading(false)
    }
    fetchExpenses()
  }, [])

  // Add expense to Supabase
  const handleAddExpense = async (expenseData: Omit<Expense, 'id'>) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          ...expenseData,
          payment_method: expenseData.paymentMethod,
        },
      ])
      .select()
    if (error) {
      console.error('Supabase insert error:', error)
    }
    if (!error && data && data[0]) {
      setExpenses([ { ...data[0], date: new Date(data[0].date), paymentMethod: data[0].payment_method }, ...expenses ])
      setShowForm(false)
    }
    setLoading(false)
  }

  // Edit expense (open form)
  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setShowForm(true)
  }

  // Update expense in Supabase
  const handleUpdateExpense = async (expenseData: Omit<Expense, 'id'>) => {
    if (editingExpense) {
      setLoading(true)
      const { data, error } = await supabase
        .from('expenses')
        .update({
          ...expenseData,
          payment_method: expenseData.paymentMethod,
        })
        .eq('id', editingExpense.id)
        .select()
      if (error) {
        console.error('Supabase update error:', error)
      }
      if (!error && data && data[0]) {
        setExpenses(
          expenses.map(exp =>
            exp.id === editingExpense.id
              ? { ...data[0], date: new Date(data[0].date), paymentMethod: data[0].payment_method }
              : exp
          )
        )
        setEditingExpense(null)
        setShowForm(false)
      }
      setLoading(false)
    }
  }

  // Delete expense from Supabase
  const handleDeleteExpense = async (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setLoading(true)
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)
      if (!error) {
        setExpenses(expenses.filter(exp => exp.id !== id))
      }
      setLoading(false)
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