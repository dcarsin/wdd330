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
    let whereClause = {};
    if (id) whereClause['memberId'] = id;
    if (name) whereClause['memberName'] = name;
    if (last_name) whereClause['memberLastName'] = last_name;
    return MemberEntity.findAll({ where: whereClause });
  }
}
