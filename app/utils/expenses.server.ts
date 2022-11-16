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
