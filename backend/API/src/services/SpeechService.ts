import { Service } from 'typedi';
import { SpeechRepository } from '../repositories/SpeechRepository';
import { Speech } from '../model/Speech';

@Service()
export class SpeechService {
  constructor(private speechRepository: SpeechRepository) {}

  public async create(speech: Speech): Promise<any> {
    this.speechRepository.create(speech);
  }

  public async search(
    id: number | undefined,
    member_id: string | undefined,
    dateFrom: Date | undefined,
    dateTo: Date | undefined   
  ): Promise<any> {
    return this.speechRepository.search(id, member_id, dateFrom, dateTo);
  }
}
