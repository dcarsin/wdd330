import { Service } from 'typedi';
import MemberEntity from '../entity/member.entity';
import { Member } from '../model/Member';

@Service()
export class MemberRepository {
  constructor() {}

  public async create(member: Member) {
    let memberData = JSON.parse(JSON.stringify(member));
    const newMember = await MemberEntity.create(memberData);
    return newMember;
  }

  public search(
    id: number | undefined,
    name: string | undefined,
    last_name: string | undefined    
  ): Promise<any> {
    return MemberEntity.findOne({ where: {
      memberId: id,
      memberName: name,
      memberLastName: last_name,
    } });
  }
}
