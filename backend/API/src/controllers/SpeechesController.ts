import { Body, Get, JsonController, Post, QueryParam, Req, Res } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { SpeechService } from '../services/SpeechService';
import { Speech } from '../model/Speech';


@Service()
@JsonController('/speeches')
export class SpeechesController {
  constructor(private SpeechService: SpeechService) {}

  @ResponseSchema(Speech)
  @Get()
  public async search(
    @QueryParam('id') id: number | undefined,
    @QueryParam('member_id') memberId: string | undefined,
    @QueryParam('dateFrom') dateFrom: Date | undefined,
    @QueryParam('dateTo') dateTo: Date | undefined,
    @Res() response
  ): Promise<any> {
    try {
      return response
        .status(200)
        .json(await this.SpeechService.search(id, memberId, dateFrom, dateTo));
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ code: 500, message: 'There was an error with your request' });
    }
  }

  @ResponseSchema(Speech)
  @Post()
  public async create(
    @Body() body,
    @Res() response
  ): Promise<any>{
    try{
      console.log(body)
      return response.status(200).json(await this.SpeechService.create(body));
    } catch(error) {
      console.log(error)
      return response.status(500).json({code: 500, message: `There was an error creating the speech: ${error.message}`});
    }
  }
}
