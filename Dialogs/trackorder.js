const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs')
const { Trackorder } = require('../Constants/DialogsId')
const { CardFactory } = require('botbuilder')

const TRACKORDER = 'TRACKORDER'

class trackOrder extends ComponentDialog {
    constructor(conversationState) {
        super(Trackorder);
        if (!conversationState) throw new Error("conversationState required")
        this.conversationState = conversationState;
        this.applyLeaveStateAccessor = this.conversationState.createProperty('trackfoodstate')

        this.addDialog(new WaterfallDialog(TRACKORDER, [ 
            this.tracking.bind(this)
        ]))
        this.initialDialogId = TRACKORDER;
  
}

async tracking(stepcontext){
   await stepcontext.context.sendActivity("You currently don't have any active order")   
   await stepcontext.context.sendActivity({
    attachments:[
        CardFactory.heroCard(
            'Here are some suggestions that you can try',
            null,
            CardFactory.actions([
                {
                    type: 'imBack',
                    title: 'Book table',
                    value: 'Book table'
                },
                {
                    type: 'imBack',
                    title: 'Order Food',
                    value: 'Order Food'
                },
                {
                    type: 'imBack',
                    title: 'Track',
                    value: 'Track'
                },{
                    type: 'imBack',
                    title: 'Customer care',
                    value: 'Customer care'
                }
            ])
        )
    ]
})
return await stepcontext.endDialog()
}


    }

module.exports.trackOrder = trackOrder