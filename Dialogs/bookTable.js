const { ComponentDialog, WaterfallDialog, ChoicePrompt, ChoiceFactory, TextPrompt, NumberPrompt, Dialog , DateTimePrompt } = require('botbuilder-dialogs')
const { bookTable } = require('../Constants/DialogsId')
const { CardFactory } = require('botbuilder')
const {confirmtable} = require('../Cards/cards')
const TextPromptDialog1 = 'TextPromptDialog1'
const TextPromptDialog = 'TextPromptDialog'
const NumberPromptDialog = 'NumberPromptDialog'
const ChoicePromptDialog = 'ChoicePromptDialog'

const booktableWF1 = 'booktableWF1'

const mongoose = require('mongoose');

//connection
mongoose.connect('mongodb://localhost:27017/msbot',{useNewUrlParser : true, useUnifiedTopology : true})
.then(()=> console.log("Successful!"))
.catch((err)=> console.log(err))
;

const schema = mongoose.Schema({
    date : {
        type : Date,
        default : Date.now
    },
    time: {
            type: String,
            required: true
    },
    seats : Number
})

const dataofmongo = new mongoose.model("dataofmongo",schema)

class Booktable extends ComponentDialog {
    constructor(conversationState) {
        super(bookTable);

        if (!conversationState) throw new Error("conversationState required")
        this.conversationState = conversationState;
        //accessor -object of state where infor of dialogs,all dialog ids are hold 
        this.applyLeaveStateAccessor = this.conversationState.createProperty('bookingtablestate')
        this.addDialog(new TextPrompt(TextPromptDialog1))
        this.addDialog(new TextPrompt(TextPromptDialog))
        this.addDialog(new NumberPrompt(NumberPromptDialog))
        this.addDialog(new ChoicePrompt(ChoicePromptDialog))


        this.addDialog(new WaterfallDialog(booktableWF1, [ 
            this.preprocessdata.bind(this),
            this.askdate.bind(this),
            this.asktime.bind(this),
            this.asknoofseat.bind(this),
            this.displaydata.bind(this),
            this.confirm.bind(this)
        ]))
        this.initialDialogId = booktableWF1;
}

data = {}

async preprocessdata(stepContext){
    if(stepContext.options && stepContext.options.luisResult){
    
        let numberentity = stepContext.options.entities.number ? stepContext.options.entities.number[0] : null
        let datetime = stepContext.options.entities.datetimeV2 ? stepContext.options.entities.datetimeV2[0].values[0].resolution[0].value.split(' ') : null
        console.log(datetime)
        let x = datetime ? datetime.length : null

        for(let i=0;i<x;i++){
           if(datetime[i].includes('-')) {
                var date =  datetime[i] ? datetime[i] : null
                if(date.length == 0){
                    var date = null
               }
           }
          
           
        }
           for(let i=0;i<x;i++){
            if(datetime[i].includes(':')) {
                var time = datetime[i] ? datetime[i] : null
            }
            else{
             var time = null
            }
           }
        
        stepContext.values.entities = {
            date,
            time,
            numberentity
        }
        
        console.log("kkkkkkkkkkkkkkkk33",stepContext.values.entities)
        return stepContext.next()
    }
}



async askdate(stepContext){
    let dialogData = await this.applyLeaveStateAccessor.get(stepContext.context)

    if(stepContext.values.entities.date == null || undefined){
        return await stepContext.prompt(TextPromptDialog1,`on what date?`)
    }
    else{
        this.data.date = stepContext.values.entities.date
        return stepContext.next()
    }
    
    
}
async asktime(stepContext){
    let dialogData = await this.applyLeaveStateAccessor.get(stepContext.context)

    if(this.data.date == undefined)
        this.data.date = stepContext.result

    if(stepContext.values.entities.time == null){
        return await stepContext.prompt(TextPromptDialog,`On what time?`)
    }
    else{
        this.data.time = stepContext.values.entities.time
        return stepContext.next()
    }
 

}
async asknoofseat(stepContext){
    let dialogData = await this.applyLeaveStateAccessor.get(stepContext.context)
    if(this.data.time == undefined){
        this.data.time = stepContext.result
    }

    if(stepContext.values.entities.numberentity == null){
        return await stepContext.prompt(NumberPromptDialog,`Number of seats `)
    }
    else{
        this.data.seats = stepContext.values.entities.numberentity
        return stepContext.next()
    }
    
    
}

async displaydata(stepContext){
    if(this.data.seats == undefined){
        this.data.seats = stepContext.result
    }
    await stepContext.context.sendActivity(`Your table for ${this.data.date} on ${this.data.time} for ${this.data.seats} `)
    return await stepContext.prompt(ChoicePromptDialog, {
        prompt: 'Are you confirmed with your above choices?',
        choices: ChoiceFactory.toChoices(['Yes', 'No'])
    })
}

async confirm(stepContext){
    if(stepContext.result.value == 'Yes'){
        await stepContext.context.sendActivity('Awesome, I have booked your table')
        await stepContext.context.sendActivity({
        attachments : [
            CardFactory.adaptiveCard(confirmtable(this.data.date,this.data.time,this.data.seats))
        ]
       })
      await stepContext.context.sendActivity('Thank you for using our services.')
    
      const mongodata = new dataofmongo({
        date : this.data.date,
        time : this.data.time,
        seats : this.data.seats
    })
    await mongodata.save()
    }
    else{
        await stepContext.context.sendActivity('Information Dropped')
    }
    return stepContext.endDialog();
}
}
module.exports.Booktable = Booktable;