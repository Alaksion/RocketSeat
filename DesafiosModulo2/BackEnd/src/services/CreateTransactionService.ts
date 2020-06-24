import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDto): Transaction {
    const transaction = { title, value, type };
    const { total } = this.transactionsRepository.getBalance();
    if (transaction.type === 'outcome' && transaction.value > total) {
      throw Error(
        "The ammount of the current outcome transaction is greater than the current user's balance",
      );
    }
    const newTransaction = this.transactionsRepository.create(transaction);
    return newTransaction;
  }
}

export default CreateTransactionService;
