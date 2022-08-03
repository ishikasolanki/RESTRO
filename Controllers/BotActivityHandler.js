const { ActivityHandler, CardFactory  } = require('botbuilder')

class BotActivityHandler extends ActivityHandler {
// This provides an extensible class for handling incoming activities in an event-driven way
    constructor(conversationState, rootDialog) {
        super();

        if (!conversationState) throw new Error("conversationState required")
        this.conversationState = conversationState;
        this.rootDialog = rootDialog;
        this.accessor = this.conversationState.createProperty('DialogAccessor')
        
        // this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        // to get msg from bot when user give input


        this.onConversationUpdate(async (context, next) => {

            //sends a conversation update when a party joins the conversation
            //Register an activity and update on every incoming conservation automatically
            if(context.activity.membersAdded && context.activity.membersAdded[1].id == context.activity.from.id){
            // The Bot Framework Activity schema defines the activities that can be exchanged between a user or channel and a bot.
                await context.sendActivity("WELCOME")
                await context.sendActivity({
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
            } 
                await next();
                
})


        this.onMessage(async (context, next) => {
        //The message activity carries conversation information between the parties
        //Registers an activity event handler for the message event, emitted for every incoming message activity.
            await this.rootDialog.run(context , this.accessor)
            await next();
        })


       
        }
        async run(context) {
            await super.run(context)
            await this.conversationState.saveChanges(context, false)
        }
    } 
module.exports.BotActivityHandler = BotActivityHandler;
