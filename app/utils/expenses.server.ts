import {prisma} from './db.server'
import type {Expense} from '@prisma/client'

export function addExpense({
  title,
  amount,
  date,
}: Pick<Expense, 'title' | 'amount' | 'date'>) {
  return prisma.expense.create({
    data: {
      title,
      amount: +amount,
      date: new Date(date),
    },
  })
}

export function getExpenses() {
  return prisma.expense.findMany({orderBy: {date: 'desc'}})
}

export function getExpense(id: Expense['id']) {
  return prisma.expense.findUnique({where: {id}})
}
