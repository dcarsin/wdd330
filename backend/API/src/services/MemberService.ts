import { Service } from 'typedi';
import { Member } from '../model/Member';
import { MemberRepository } from '../repositories/MemberRepository';

@Service()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  public async create(member: Member): Promise<any> {
    this.memberRepository.create(member);
  }

  public async search(
    id: number | undefined,
    name: string | undefined,
    lastname: string | undefined
  ): Promise<any> {
    return this.memberRepository.search(id, name, lastname);
  }
}
