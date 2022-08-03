const restify = require('restify')
const { BotFrameworkAdapter , ConversationState , MemoryStorage , UserState} = require('botbuilder')
const { BotActivityHandler } = require('./Controllers/BotActivityHandler')
const {RootDialog}  = require('./Dialogs/RootDialog')
const adapter =  new BotFrameworkAdapter({
    appId: "",
    appPassword: " "
})

adapter.onTurnError = async (context , error) =>{
    console.log('error occured',error); 
     
    await context.sendActivity('Bot encountered an error.')
}

let server = restify.createServer();

server.listen(3978, ()=>{
    console.log(`${server.url}`)
});

const memory = new MemoryStorage();

let conversationState = new ConversationState(memory);

const rootDialog = new RootDialog(conversationState);

const mainBot = new BotActivityHandler(conversationState , rootDialog)

server.post('/api/messages',(req,res)=>{
    adapter.processActivity(req, res, async(context)=>{
    await mainBot.run(context);
         
    })
}
)