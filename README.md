# Dhakad Andaa Farm - Expense Tracker

A modern, responsive expense tracking application designed specifically for egg farm management. Built with Next.js, TypeScript, and Tailwind CSS.

## 🥚 Features

### 📊 Dashboard
- **Real-time Statistics**: Total expenses, monthly expenses, average expense, and top spending category
- **Interactive Charts**: Pie chart showing expense distribution by category and bar chart for monthly trends
- **Category Breakdown**: Detailed view of expenses by category with percentages

### 💰 Expense Management
- **Add Expenses**: Easy-to-use form with farm-specific categories
- **Edit & Delete**: Full CRUD operations for expense management
- **Search & Filter**: Find expenses quickly with search and category filters
- **Sorting**: Sort by date, amount, or title in ascending/descending order

### 🏷️ Farm-Specific Categories
- 🌾 Feed & Nutrition
- 💊 Medicine & Vaccines
- 🔧 Equipment & Tools
- 👷 Labor & Wages
- 🚚 Transportation
- ⚡ Utilities & Electricity
- 🔨 Maintenance & Repairs
- 📝 Other Expenses

### 💳 Payment Methods
- Cash
- Bank Transfer
- UPI
- Card
- Cheque

### 📱 Responsive Design
- Mobile-first design that works on all devices
- Clean, modern UI with intuitive navigation
- Local storage for data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dhakad-andaa-farm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
dhakad-andaa-farm/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── Dashboard.tsx
│   ├── ExpenseForm.tsx
│   ├── ExpenseList.tsx
│   └── Header.tsx
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Colors
The application uses a custom color palette defined in `tailwind.config.js`:
- **Primary**: Orange theme (#ed7519)
- **Farm**: Green theme (#22c55e)

### Categories
Add or modify expense categories in `types/index.ts` and update the corresponding components.

## 📊 Data Persistence

The application uses browser localStorage to persist expense data. Data is automatically saved and restored when the application loads.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ for Dhakad Andaa Farm** 