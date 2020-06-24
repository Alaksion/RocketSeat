import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    if (this.transactions.length === 0) {
      throw Error('No transactions registered for the current user');
    }
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length === 0) {
      return { income: 0, outcome: 0, total: 0 };
    }

    const income = this.transactions.reduce((total, element) => {
      if (element.type === 'income') {
        total += element.value;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, element) => {
      if (element.type === 'outcome') {
        total += element.value;
      }
      return total;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    const newTransaction = new Transaction({
      value,
      type,
      title,
    });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
