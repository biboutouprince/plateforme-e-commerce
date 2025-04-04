"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Sales data for the chart
const salesData = [
  { name: "Jan", total: 1500 },
  { name: "Fév", total: 2300 },
  { name: "Mar", total: 3200 },
  { name: "Avr", total: 2800 },
  { name: "Mai", total: 3600 },
  { name: "Juin", total: 4100 },
  { name: "Juil", total: 3800 },
  { name: "Août", total: 4200 },
  { name: "Sep", total: 4800 },
  { name: "Oct", total: 5100 },
  { name: "Nov", total: 5600 },
  { name: "Déc", total: 6200 },
]

// Category data for the pie chart
const categoryData = [
  { name: "Smartphones", value: 35 },
  { name: "Ordinateurs", value: 25 },
  { name: "Tablettes", value: 15 },
  { name: "Accessoires", value: 20 },
  { name: "Autres", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function SalesBarChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Ventes mensuelles</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatPrice(value as number)} />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function CategoryPieChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Répartition des ventes par catégorie</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function SalesAnalysisChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyse des ventes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatPrice(value as number)} />
              <Bar dataKey="total" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductCategoryPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des ventes par catégorie</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

