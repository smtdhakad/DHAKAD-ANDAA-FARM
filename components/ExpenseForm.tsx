'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Expense, ExpenseCategory, PaymentMethod } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Plus, Save, X } from 'lucide-react'

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void
  onCancel?: () => void
  initialData?: Expense
  isEditing?: boolean
}

const categoryOptions: { value: ExpenseCategory; label: string; icon: string }[] = [
  { value: 'feed', label: 'Feed & Nutrition', icon: '🌾' },
  { value: 'medicine', label: 'Medicine & Vaccines', icon: '💊' },
  { value: 'equipment', label: 'Equipment & Tools', icon: '🔧' },
  { value: 'labor', label: 'Labor & Wages', icon: '👷' },
  { value: 'transportation', label: 'Transportation', icon: '🚚' },
  { value: 'utilities', label: 'Utilities & Electricity', icon: '⚡' },
  { value: 'maintenance', label: 'Maintenance & Repairs', icon: '🔨' },
  { value: 'other', label: 'Other Expenses', icon: '📝' },
]

const paymentOptions: { value: PaymentMethod; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Card' },
  { value: 'cheque', label: 'Cheque' },
]

export function ExpenseForm({ onSubmit, onCancel, initialData, isEditing = false }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    amount: initialData?.amount || 0,
    category: initialData?.category || 'feed' as ExpenseCategory,
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    description: initialData?.description || '',
    paymentMethod: initialData?.paymentMethod || 'cash' as PaymentMethod,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      date: new Date(formData.date),
    })
    if (!isEditing) {
      setFormData({
        title: '',
        amount: 0,
        category: 'feed',
        date: new Date().toISOString().split('T')[0],
        description: '',
        paymentMethod: 'cash',
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Save className="h-5 w-5" />
              Edit Expense
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              Add New Expense
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expense Title</label>
            <Input
              type="text"
              placeholder="e.g., Chicken Feed Purchase"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
              required
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <Select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
              required
            >
              {paymentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description (Optional)</label>
            <textarea
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
              placeholder="Additional details about this expense..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {isEditing ? 'Update Expense' : 'Add Expense'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 