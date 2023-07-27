import { Get, JsonController, QueryParam, Res } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { Member } from '../model/Member';
import { MemberService } from '../services/MemberService';


@Service()
@JsonController('/members')
export class MembersController {
  constructor(private MemberService: MemberService) {}

  @ResponseSchema(Member)
  @Get()
  public async search(
    @QueryParam('id') id: number | undefined,
    @QueryParam('name') name: string | undefined,
    @QueryParam('lastname') lastname: string | undefined,
    @Res() response
  ): Promise<any> {
    try {
      return response
        .status(200)
        .json(this.MemberService.search(id, name, lastname));
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ code: 500, message: 'There was an error with your request' });
    }
  }
}
