const { ComponentDialog, DialogTurnStatus, WaterfallDialog } = require('botbuilder-dialogs')
const { DialogSet, DialogContext } = require('botbuilder-dialogs')
const {LuisRecognizer} = require('botbuilder-ai')
const { rootDialog , bookTable ,orderFood, Trackorder , Customercare} = require('../Constants/DialogsId')
const {booktable ,orderfood ,trackorder , customercare} = require('./index')
const parseMessage = 'parseMessage'

const luisConfig = {
    applicationId: 'e3b463bc-2e42-44f2-84df-c69994b868fd',
    endpointKey: '8247b7a9eb0747e2af74181edfc14c4f',
    endpoint: 'https://restrobottraining.cognitiveservices.azure.com/'
}
//Component dialogs let you break your bot's logic up into components that can themselves
//be added as a dialog to another ComponentDialog or DialogSet
class RootDialog extends ComponentDialog {
    constructor(conversationState) {
        super(rootDialog);
        if (!conversationState) throw new Error("conversationState required")
        this.conversationState = conversationState;
        
        this.addDialog(new booktable(conversationState))
        this.addDialog(new orderfood(conversationState))
        this.addDialog(new trackorder(conversationState))
        this.addDialog(new customercare(conversationState))

        this.recognizer = new LuisRecognizer(luisConfig, {
            apiVersion: 'v3'
        });

        this.addDialog(new WaterfallDialog(parseMessage, [
            this.routeMessage.bind(this)
        ]));

        this.initialDialogId = parseMessage;

    }
    
//bot has nothing to process..so if they empty begin with the instance available

    async run(context,accessor){

        try{

           const dialogSet = new DialogSet(accessor)
                //dialog set to hold a lot Of dialogs
           dialogSet.add(this);
                //DialogSet.add(this) - it will push all the current information we have in the class above
           const dialogContext = await dialogSet.createContext(context)

           const results = await dialogContext.continueDialog();
            //bot ask ques and expects an answer, so status bot and dialog is waiting,when answered they are at null status
           if(results && results.status === DialogTurnStatus.empty){
               await dialogContext.beginDialog(this.id)
               // root dialog is this.id
               // results.status is empty
           }else{
               console.log('dialog stack is empty',results.status)
               // results will be equal to waiting if already in chat,else it would be empty    
           }
        }catch(err){
            console.log(err)
        }
    }


async routeMessage(stepContext){
let luisresponse = await this.recognizer.recognize(stepContext.context)
// console.log("=========luis response======",luisresponse)

// console.log("ROUTE MESSAGE",stepContext.context.activity.text.toLowerCase())

let luisIntent = luisresponse.luisResult.prediction.topIntent
// console.log("=========luisIntent response======",JSON.stringify(luisresponse.luisResult.prediction))
//switch(stepContext.context.activity.text.toLowerCase()

switch(luisIntent){
    case 'booktable':
        return await stepContext.beginDialog(bookTable,{
            luisResult : true,
            entities : luisresponse.luisResult.prediction.entities
        })
    case 'orderfood':
        return await stepContext.beginDialog(orderFood,{
            luisResult : true,
            entities : luisresponse.luisResult.prediction.entities
        })
    case 'track ':
        return await stepContext.beginDialog(Trackorder)
    case 'customer care':
        return await stepContext.beginDialog(Customercare)
    default:
        return await stepContext.context.sendActivity("Sorry I am still learning.")
}
}
}
module.exports.RootDialog = RootDialog;