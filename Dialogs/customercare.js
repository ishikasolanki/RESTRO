const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs')
const { Customercare } = require('../Constants/DialogsId')
const { CardFactory } = require('botbuilder')

const CUSTOMERCARE = 'CUSTOMERCARE'

class CustomCare extends ComponentDialog {
    constructor(conversationState) {
        super(Customercare);
        if (!conversationState) throw new Error("conversationState required")
        this.conversationState = conversationState;
        this.applyLeaveStateAccessor = this.conversationState.createProperty('customercarestate')

        this.addDialog(new WaterfallDialog(CUSTOMERCARE,[
            this.help.bind(this)
        ]))
    }
async help(stepContext){
 await stepContext.context.sendActivity('Visit the website for customer services.')
 await stepContext.context.sendActivity('Thank you for using our services.')
 await stepContext.context.sendActivity({
    attachments:[
        CardFactory.heroCard(
            'Here are some suggestions that you can try',
            null,
            CardFactory.actions([
                {
                    type: 'openUrl',
                    title: 'www.zolocrust.com',
                    value: 'https://www.zolocrust.com/'
                }
            ])
            )]
        })
return stepContext.endDialog()
}

}
module.exports.CustomCare = CustomCare
