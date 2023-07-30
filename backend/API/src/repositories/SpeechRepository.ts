import { Service } from 'typedi';
import MemberEntity from '../entity/member.entity';
import { Speech } from '../model/Speech';
import SpeechEntity from '../entity/speech.entity';
import { Op } from 'sequelize';

@Service()
export class SpeechRepository {
  constructor() {}

  public async create(speech: Speech) {
    let speechData = JSON.parse(JSON.stringify(speech));
    const newSpeech = await SpeechEntity.create(speechData);
    return newSpeech;
  }

  public search(
    id: number | undefined,
    member_id: string | undefined,
    dateFrom: Date | undefined,
    dateTo: Date | undefined    
  ): Promise<any> {
    let whereClause = {};
    if (id) whereClause['memberId'] = id;
    if (member_id) whereClause['memberName'] = member_id;
    let from = dateFrom ? dateFrom : new Date('1990-12-12');
    let to = dateTo ? dateTo : new Date('2050-12-31');
    whereClause['memberLastName'] = {[Op.between] : [from, to]} ;

    console.log(whereClause)
    return SpeechEntity.findAll({ where: whereClause });
  }
}
