import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { AddExpenseDto } from './dto/add_expense.dto';
import { AddInvoiceDto } from './dto/add_invoice.dto';
import { AddCommentDto } from './dto/add_comment.dto';
import { SendReminderDto } from './dto/send_reminder.dto';
import { UpdateExpenseDto } from './dto/update_expense.dto';
import { ProfileDetailsDto } from './dto/profile_details.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('expenses')
  addExpense(@Body() addExpenseDto: AddExpenseDto) {
    return this.managerService.addExpense(addExpenseDto);
  }

  @Get('expenses')
  seeExpenses(@Query('filter') filter: string) {
    return this.managerService.seeExpenses(filter);
  }

  @Post('invoices')
  addInvoice(@Body() addInvoiceDto: AddInvoiceDto) {
    return this.managerService.addInvoice(addInvoiceDto);
  }

  @Get('invoices/:id')
  seeInvoice(@Param('id') id: string) {
    return this.managerService.seeInvoice(parseInt(id));
  }

  @Patch('items/:id/comment')
  addComment(@Param('id') id: string, @Body() addCommentDto: AddCommentDto) {
    return this.managerService.addComment(parseInt(id), addCommentDto);
  }

  @Get('logs')
  seeLogs() {
    return this.managerService.seeLogs();
  }

  @Get('reports')
  getReport() {
    return this.managerService.getReport();
  }

  @Post('reminders')
  sendReminder(@Body() sendReminderDto: SendReminderDto) {
    return this.managerService.sendReminder(sendReminderDto);
  }

  @Put('expenses/:id')
  updateExpense(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.managerService.updateExpense(parseInt(id), updateExpenseDto);
  }

  @Delete('invoices/:id')
  deleteInvoice(@Param('id') id: string) {
    return this.managerService.deleteInvoice(parseInt(id));
  }

  @Get('profile')
  getProfile() {
    return this.managerService.getProfile();
  }

  @Put('profile')
  updateProfile(@Body() userDto: ProfileDetailsDto) {
    return this.managerService.updateProfile(userDto);
  }
}
