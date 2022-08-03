const { ComponentDialog, WaterfallDialog, ChoicePrompt, ChoiceFactory, TextPrompt, NumberPrompt, Dialog , DateTimePrompt } = require('botbuilder-dialogs')
const { orderFood } = require('../Constants/DialogsId')
const { CardFactory , AttachmentLayoutTypes } = require('botbuilder')
const {confirmtable , soups , southindians,orderdetailcards} = require('../Cards/cards')

const orderfoodwf = 'orderfoodwf'
const ChoicePromptDialog = 'ChoicePromptDialog'
const NumberPromptDialog = 'NumberPromptDialog'
const TextPromptDialog = 'TextPromptDialog'

const mongoose = require('mongoose');

//connection
mongoose.connect('mongodb://localhost:27017/msbot',{useNewUrlParser : true, useUnifiedTopology : true})
.then(()=> console.log("Successful!"))
.catch((err)=> console.log(err));

const schema = mongoose.Schema({
    ordertype: String,
    typeoffood : String,
    dessertdrinks : String,
    price: Number
})

const dataoforder = new mongoose.model("dataoforder",schema)

class Orderfood extends ComponentDialog {
    constructor(conversationState) {
        super(orderFood);

        if (!conversationState) throw new Error("conversationState required")
        this.conversationState = conversationState;
        this.applyLeaveStateAccessor = this.conversationState.createProperty('orderfoodstate')
        this.addDialog(new ChoicePrompt(ChoicePromptDialog))
        this.addDialog(new TextPrompt(TextPromptDialog))
        this.addDialog(new NumberPrompt(NumberPromptDialog))

        this.addDialog(new WaterfallDialog(orderfoodwf, [ 
            this.ordertype.bind(this),
            this.typeoffood.bind(this),
            this.vegfood.bind(this),
            this.dessertdrinks.bind(this),
            this.typeofdelivery.bind(this),
            this.contact.bind(this), 
            this.prolylast.bind(this),
            this.revieworder.bind(this)
        ]))

        this.initialDialogId = orderfoodwf;
    }
    orderdetails = {}
    price = 0
    async ordertype(stepContext){
        console.log("oooooooooooo",JSON.stringify(stepContext.options.entities))
        await stepContext.context.sendActivity("Do you want to place easy order , most recent order or new order")
        return await stepContext.prompt(ChoicePromptDialog, {
            prompt: 'choose type of order?',
            choices: ChoiceFactory.toChoices(['Easy Order', 'Recent order', 'new order'])
        })
    }

    async typeoffood(stepContext){
        this.orderdetails.ordertype = stepContext.result
            return await stepContext.prompt(ChoicePromptDialog, {
                prompt: 'choose type of food',
                choices: ChoiceFactory.toChoices(['Veg', 'Non veg', 'Chinese'])
            })
        }
    
    async vegfood(stepContext){    
        // if(stepContext.result.value == 'Veg'){
        //     return await stepContext.prompt(ChoicePromptDialog, {
        //         prompt: 'choose your food?',
        //         choices: ChoiceFactory.toChoices(['soup/70','southindian/100','appetizer/200','XYZ/250','maggi/70','sandwich/50','pasta/100','hakka noodle/120'])
        //     })
        // }
        // if(stepContext.result.value == 'Non veg'){
        //     return await stepContext.prompt(ChoicePromptDialog, {
        //         prompt: 'choose your food?',
        //         choices: ChoiceFactory.toChoices(['Tandoori chicken/360','butter chicken/400','appetizer/200','kebabs/300','shawarma/70','chicken sandwich/50'])
        //     })
        // }
        // if(stepContext.result.value == 'Chinese'){
        //     return await stepContext.prompt(ChoicePromptDialog, {
        //         prompt: 'choose your food?',
        //         choices: ChoiceFactory.toChoices(['Hakka noodle/120','momos/50','appetizer/200','manchurian/100','spring roll/100'])
        //     })
        // }
        
        let type = stepContext.result.value
        console.log("hehehehehe",type)
        await stepContext.context.sendActivity({
            attachments: [
                this.soupcard(),
                this.southindianscard(),
                this.appetizercard(),
                this.paneercard()
            ],
            attachmentLayout: AttachmentLayoutTypes.Carousel
    })
    return Dialog.EndOfTurn;
}


async dessertdrinks(stepContext){
        var det = stepContext.context.activity.value.actiontype
        // let deta = det.value.split("/")
        var det = parseInt(det)
        this.price = det
        this.orderdetails.typeoffood = stepContext.context.activity.value.item
        console.log("buttttoonnn",det)
        return await stepContext.prompt(ChoicePromptDialog, {
            prompt: 'Do you want to add dessert or drink',
            choices: ChoiceFactory.toChoices(['Drink/50','Dessert/100','NOTA/0'])
        })
        // await stepContext.context.sendActivity({
        //     attachments: [
        //         this.desserts(),
        //         this.drinks(),
        //     ],
        //     attachmentLayout: AttachmentLayoutTypes.Carousel
    }

async typeofdelivery(stepContext){
    this.orderdetails.dessertdrinks = stepContext.result
        let det = this.orderdetails.dessertdrinks
        let deta = det.value.split("/")
        parseInt(deta)
        let x = parseInt(deta[1])
        this.price += x
    
    return await stepContext.prompt(ChoicePromptDialog, {
        prompt: 'How would you like to place your order?',
        choices: ChoiceFactory.toChoices(['Take away','Delivery'])
    })
}

async contact(stepContext){
    let x = stepContext.result.value
    if(x == 'Take away'){
        return await stepContext.prompt(NumberPromptDialog,`Enter your phone number`)
    }
    else{
        return await stepContext.prompt(TextPromptDialog,`Enter delivery address`)
    }
    
}
async prolylast(stepContext){
let x = stepContext.result

console.log(stepContext.result)
if(isNaN(x)){
   await stepContext.context.sendActivity(`your delivery address is ${x}`)
   return await stepContext.prompt(ChoicePromptDialog, {
    prompt: 'wish to review your order?',
    choices: ChoiceFactory.toChoices(['yes','no'])
})
}
else{
   await stepContext.context.sendActivity(`Your phone number is ${x}`)
   await stepContext.context.sendActivity('Thank You for using our services')
   return await stepContext.prompt(ChoicePromptDialog, {
    prompt: 'wish to review your order?',
    choices: ChoiceFactory.toChoices(['yes','no'])
})
}
}

async revieworder(stepContext){
    this.orderdetails.price = this.price
    console.log("REVIEW",stepContext.result.value,this.orderdetails)
     if(stepContext.result.value == 'yes' ){
         await stepContext.context.sendActivity({
            attachments : [
                CardFactory.adaptiveCard(orderdetailcards(this.orderdetails.ordertype.value,this.orderdetails.typeoffood,this.orderdetails.dessertdrinks['value'],this.orderdetails.price))
            ]
           })
           await stepContext.context.sendActivity('Thank You for using our services,hope to see you soon.')

        }
        else{
         await stepContext.context.sendActivity('Thank You for using our services,hope to see you soon.')
        }
        const mongodata = new dataoforder({
            ordertype: this.orderdetails.ordertype.value,
            typeoffood : this.orderdetails.typeoffood,
            dessertdrinks : this.orderdetails.dessertdrinks['value'],
            price: this.orderdetails.price,
        })
        await mongodata.save()

        return stepContext.endDialog()
    }

    // ======================================
    // Helper functions used to create cards.
    // ======================================

    soupcard(){
        return CardFactory.adaptiveCard({
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "body": [
                {
                    "type": "Image",
                    "url": "https://www.inspiredtaste.net/wp-content/uploads/2018/10/Homemade-Vegetable-Soup-Recipe-2-1200.jpg"
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "SOUP",
                            "id":"SOUP",
                            "data":{  
                                "actiontype": "100" ,
                                "item": "SOUP"
                                }  
                        }
                    ]
                }
            ]
        })}
    southindianscard(){
        return CardFactory.adaptiveCard(
            {
                    "type": "AdaptiveCard",
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "version": "1.0",
                    "body": [
                        {
                            "type": "Image",
                            "url": "https://sukhis.com/app/uploads/2022/04/image3-4.jpg"
                        },
                        {
                            "type": "ActionSet",
                            "actions": [
                                {"type": "Action.Submit",
                                "title": "SOUTH INDIAN",
                                "id":"SOUTH INDIAN",
                                "data":{  
                                    "actiontype": "70",
                                    "item": "SOUTH INDIAN" 
                                    } }
                                
                            ]
                        }
                    ]
                
            }
        );
    }
    appetizercard(){
        return CardFactory.adaptiveCard({
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "body": [
                {
                    "type": "Image",
                    "url": "https://inspiredbycharm.com/wp-content/uploads/2021/02/Cold-Appetizer-Recipes.jpg"
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                                "title": "APPETIZER",
                                "id":" APPETIZER",
                                "data":{  
                                    "actiontype": "200",
                                    "item": "APPETIZER"  
                                    } }
                    ]
                }
            ]
        })
    }
    paneercard(){
        
        return CardFactory.adaptiveCard({
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "body": [
                {
                    "type": "Image",
                    "url": "https://vegplatter.in/files/public/images/partner/menu/7/paneer%20tikka%20achari_1.JPG"
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "PANEER PLATTER",
                            "id": "PANEER PLATTER",
                            "data": {
                                "actiontype": "350",
                                "item":"PANEER PLATTER"
                            }
                        }
                    ]
                }
            ]
        }
            
        )
    }
}

module.exports.Orderfood = Orderfood