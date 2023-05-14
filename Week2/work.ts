import { AbstractView } from "sabre-ngv-app/app/AbstractView";
import { LayerService } from "sabre-ngv-core/services/LayerService";
import { HttpMethod } from "sabre-ngv-app/app/services/impl/HttpMethod";
import { Template } from "sabre-ngv-core/decorators/classes/view/Template";
import { IAreaService } from 'sabre-ngv-app/app/services/impl/IAreaService';
import { AbstractActionOptions } from "sabre-ngv-app/app/common/views/AbstractActionOptions";
import { SabreController } from "../controllers/SabreController";
import { AbstractViewOptions } from 'sabre-ngv-app/app/AbstractViewOptions';
import { RestModel } from "../model/RestModel";
import { getService } from "../Context";
import * as XML2JS from "xml2js";
import { remark } from "../model/remark";
import { log } from "console";
import { ExternalService } from "../services/ExternalService";
import { ccData } from "../model/ccData";
import * as CryptoJS from 'crypto-js';

@Template('com-internova-gtcpayment-web-module:CheckTotal')
export class CheckTotal extends AbstractView<RestModel> {
    constructor(options?: AbstractViewOptions, pack?: any, creditCardList?: ccData[]) {
        super(options);
        this.processPayment(pack, creditCardList);
        this.getModel().set('total', pack['total']);
        this.render();
    }
    private card;
    private payload;
    private header;
    public pack;
    public rmks: remark[] = [];
    public createRmks: remark[] = [];
    public paymentRsp: string;

    initialize(options: AbstractActionOptions): void {
        super.initialize(options);
    }

    processPayment(pack?: {}, creditCardList?: ccData[]): void {
        this.pack = pack;
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const min = date.getHours() + date.getMinutes() + date.getSeconds();
        const key = CryptoJS.enc.Utf8.parse(pack['refId']);
        const iv = CryptoJS.enc.Utf8.parse(pack['refId'] + year + month + day);
        this.card = creditCardList.filter(x => x['cardMasked'] == pack['selectedCard'])[0];
        const xApiKey: string = "500fbdc8A5f34A4b09A8236Aa604dee33fb3";
        const organisation: string = "edfb0e33Ae190A4ad6A8a76A7b1d51e2f87a";
        this.header = '{ "Content-type": "application/json", "accept":"application/json", "X-APIKEY": "' + xApiKey + '"}';
        this.payload = JSON.stringify({
            "organisation": organisation,
            "currency": "GBP",
            "amount": pack['totalVal'],
            "capture_now": false,
            "card": {
                "card_number": CryptoJS.AES.decrypt(this.card['cardNumber'], key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                "cvv": CryptoJS.AES.decrypt(pack['cvv'], key, { iv: iv }).toString(CryptoJS.enc.Utf8),
                "expiry_month": this.card['month'],
                "expiry_year": this.card['year']
            },
            "merchant_reference": pack['refId'] + date + min,
            "shopper_interaction": "moto",
            "three_ds": {
                "three_ds_required": false
            }
        });
        // console.log("Apexx Payload", this.payload);
    }

    async selfNextAction() {
        let getreservation = getService(ExternalService);
        getreservation.sendExternalRest("https://sandbox.apexx.global/atomic/v1/api/payment", 'POST', this.payload, this.header)
            .then(rsp => {
                const areaService: IAreaService = getService(IAreaService);
                if (rsp['status'] == "412") {
                    areaService.showBanner('Error', "ERROR - Remarks updated");
                } else {
                    this.paymentRsp = rsp;
                    console.log("Apexx rsp", rsp);
                    this.rmks = this.pack['UpdateRmk'];
                    let opt; //
                    const cmRemark = "CM-" + this.card['code'] + this.card['last4'] + "/" + this.card['month'] + this.card['year'] + "/*";
                    const payRemark = "PAYMENT/" + this.paymentRsp['authorization_code'] + "/" + this.pack['refId'] + "/" + this.pack['total'];
                    if (this.rmks.length) {
                        // console.log("Text 1",this.rmks.filter(x => x.Code == "CM")[0].Text);
                        // console.log("Text 2",this.rmks.filter(x => x.Code == "PAY")[0].Text);
                        let cmRmk = this.rmks.filter(x => x.Code == "CM");
                        if (cmRmk.length) { cmRmk[0].Text = cmRemark }
                        let payRmk = this.rmks.filter(x => x.Code == "PAY");
                        if (payRmk.length) { payRmk[0].Text = payRemark }

                        // this.rmks.filter(x => x.Code == "CM")[0].Text = cmRemark;
                        // this.rmks.filter(x => x.Code == "PAY")[0].Text = payRemark;
                    } else {
                        // this.generateRmk(cmRemark, "I");                 // *****           REHABILITAR REMARK AL MOVER A PROD            *****
                        this.generateRmk(payRemark, "I");
                    }
                    if (this.pack['additional']) {
                        this.generateRmk("PAYMENT/" + this.pack['additional'] + "/" + this.pack['additionalRmk'], "I");
                    }
                    // 5H-PAYMENT/A-123456/OSUICI230227/1672.80/VI1111      REMARK TYPE
                    // 5H-M1100.00/S160.00/T362.80/A50.00/TT1672.80
                    if (this.paymentRsp['status'] == "AUTHORISED") {
                        opt = "A-" + this.paymentRsp['authorization_code'] + "/";
                    } else if (this.paymentRsp['status'] == "DECLINED") {
                        opt = "D-"
                    } else {
                        opt = "E-"
                    }
                    this.generateRmk("PAYMENT/" + opt + this.pack['refId'] + "/" + this.pack['total'] + "/" + this.card['code'] + this.card['last4']);
                    let text = "";
                    if (this.pack['markUpFee']) {
                        text = "M" + this.pack['markUpFee']
                    }
                    if (this.pack['fee']) {
                        text = text + "/S" + this.pack['fee']
                    }
                    if (this.pack['pqAmt']) {
                        text = text + "/T" + this.pack['pqAmt']
                    }
                    if (this.pack['additional']) {
                        text = text + "/A" + this.pack['additional']
                    }
                    if (this.pack['total']) {
                        text = text + "/TT" + this.pack['total']
                    }
                    this.generateRmk(text, "I");
                    let getreservationpromise = getService(SabreController);
                    getreservationpromise.buildRequestAddRemark(this.createRmks)
                        .then(rsp => {
                            if (this.rmks.length) {
                                getreservationpromise.RemarkUpdate(this.rmks)
                                    .then(rsp => {
                                        console.log("Remarks were added");
                                    })
                            }
                            getreservationpromise.SendCommandMessage("*.*P5H", true, true)
                                .then(rsp => {
                                    if (this.paymentRsp['status'] == "AUTHORISED") {
                                        areaService.showBanner('Success', "AUTHORISED: " + this.paymentRsp['authorization_code'] + " - Remarks updated");
                                    } else if (this.paymentRsp['status'] == "DECLINED") {
                                        areaService.showBanner('Error', "DECLINED - Remarks updated");
                                    } else {
                                        areaService.showBanner('Error', "Apexx Error - Remarks updated");
                                    }

                                })
                        })
                }
                getService(LayerService).clearLayer();
            })
    }

    async parseXml2Js(responseValue: string): Promise<unknown> {
        return new Promise((resolve, reject) => {
            XML2JS.parseString(responseValue, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            })
        })
    }

    generateRmk(text: string, type?: string) {
        let rmk = new remark;
        if (type) {
            rmk.Type = "Invoice";
        } else {
            rmk.Type = "Historical";
        }
        rmk.Text = text;
        this.createRmks.push(rmk);
    }
}

