import { Injectable } from '@nestjs/common';
import { ProfileDetailsDto } from './dto/profile_details.dto';

let expenses: any[] = [];
let invoices: any[] = [];
let comments: any[] = [];
let logs: any[] = [];
let reports = {};
let reminders: any[] = [];
let profile: ProfileDetailsDto | null = null;

@Injectable()
export class ManagerService {
  addExpense(newExpense: any) {
    const expense = {
      id: expenses.length + 1,
      ...newExpense,
      status: 'pending',
    };
    expenses.push(expense);
    logs.push({ action: 'Added expense', id: expense.id });
    return { message: 'Expense added', data: expense };
  }

  seeExpenses(filter?: string) {
    let result = expenses;
    if (filter) {
      result = expenses.filter((e) => e.status === filter);
    }
    return { message: 'Expenses list', data: result };
  }

  addInvoice(newInvoice: any) {
    const invoice = {
      id: invoices.length + 1,
      ...newInvoice,
      status: 'unpaid',
    };
    invoices.push(invoice);
    logs.push({ action: 'Added invoice', id: invoice.id });
    return { message: 'Invoice added', data: invoice };
  }

  seeInvoice(id: number) {
    const invoice = invoices.find((i) => i.id === id);
    if (!invoice) {
      return { message: 'Not found' };
    }
    return { message: 'Invoice details', data: invoice };
  }

  addComment(id: number, newComment: any) {
    const comment = { itemId: id, ...newComment };
    comments.push(comment);
    logs.push({ action: 'Added comment', itemId: id });
    return { message: 'Comment added', data: comment };
  }

  seeLogs() {
    return { message: 'History logs', data: logs };
  }

  getReport() {
    return { message: 'Team report', data: reports };
  }

  sendReminder(newReminder: any) {
    const reminder = { id: reminders.length + 1, ...newReminder };
    reminders.push(reminder);
    logs.push({ action: 'Sent reminder', id: reminder.id });
    return { message: 'Reminder sent', data: reminder };
  }

  updateExpense(id: number, updatedExpense: any) {
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return { message: 'Not found' };
    }
    expenses[index] = { id, ...updatedExpense };
    logs.push({ action: 'Updated expense', id });
    return { message: 'Expense updated', data: expenses[index] };
  }

  deleteInvoice(id: number) {
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) {
      return { message: 'Not found' };
    }
    const deleted = invoices.splice(index, 1)[0];
    logs.push({ action: 'Deleted invoice', id });
    return { message: 'Invoice deleted', data: deleted };
  }
  getProfile() {
    if (!profile) {
      return { message: 'No profile set' };
    }
    return { message: 'Profile details', data: profile };
  }

  updateProfile(updatedProfile: ProfileDetailsDto) {
    profile = updatedProfile;
    logs.push({ action: 'Updated profile' });
    return { message: 'Profile updated', data: profile };
  }
}
