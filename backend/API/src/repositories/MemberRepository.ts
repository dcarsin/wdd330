import { Service } from 'typedi';
import MemberEntity from '../entity/member.entity';
import { Member } from '../model/Member';
import moment from 'moment';
import { Op } from "sequelize";

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
    last_name: string | undefined,
    active: boolean | undefined,
    group: string | undefined,
    gender: string | undefined,
  ): Promise<any> {
    let whereClause = {};
    if (id) whereClause['memberId'] = id;
    if (name) whereClause['memberName'] = name;
    if (last_name) whereClause['memberLastName'] = last_name;
    if (active) whereClause['memberStatus'] = active;
    if (gender) whereClause['memberGender'] = gender; 
    if (group) {
      whereClause['memberDateOfBirth'] = group === "anyYoung" ? { [Op.between]: [moment().add(-18, 'years').format('YYYY-MM-DD'), moment().add(-12, 'years').format('YYYY-MM-DD')] } : { [Op.lt]: moment().add(-18, 'years').format('YYYY-MM-DD') }
    }

    return MemberEntity.findAll({ where: whereClause });
  }
}
