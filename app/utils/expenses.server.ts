import {prisma} from './db.server'
import type {Expense} from '@prisma/client'

export function addExpense(params: Expense) {
  return prisma.expense.create({data: {...params}})
}
