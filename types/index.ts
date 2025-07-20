export interface Expense {
  id: string
  title: string
  amount: number
  category: ExpenseCategory
  date: Date
  description?: string
  paymentMethod: PaymentMethod
}

export type ExpenseCategory = 
  | 'feed'
  | 'medicine'
  | 'equipment'
  | 'labor'
  | 'transportation'
  | 'utilities'
  | 'maintenance'
  | 'other'

export type PaymentMethod = 
  | 'cash'
  | 'bank_transfer'
  | 'upi'
  | 'card'
  | 'cheque'

export interface CategoryStats {
  category: ExpenseCategory
  total: number
  count: number
  percentage: number
}

export interface MonthlyStats {
  month: string
  total: number
  count: number
}

export interface DashboardStats {
  totalExpenses: number
  monthlyExpenses: number
  averageExpense: number
  topCategory: CategoryStats
  recentExpenses: Expense[]
} 