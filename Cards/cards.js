module.exports ={
confirmtable : (date , time , seats)=>{
    return {
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.0",
        "body": [
            {
                "type": "Container",
                "items": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": "BOOKING DETAILS:",
                                        "wrap": true,
                                        "weight": "Bolder",
                                        "size": "Large"
                                    }
                                ],
                                "separator": true
                            },
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "Image",
                                        "url": "https://i.pinimg.com/736x/fe/b4/3e/feb43ecdde7a41c8a54d15599aa5e0e1.jpg",
                                        "size": "Medium",
                                        "horizontalAlignment": "Right",
                                        "separator": true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Date:",
                                "wrap": true,
                                "weight": "Bolder",
                                "size": "Medium"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "text": `${date}`,
                                "type": "TextBlock",
                                "placeholder": "Input Date",
                                "weight": "Bolder"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Number of Seats:",
                                "wrap": true,
                                "weight": "Bolder",
                                "size": "Medium"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "text": `${seats}`,
                                "type": "TextBlock",
                                "weight": "Bolder",
                                "placeholder": "Placeholder text"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Time:",
                                "wrap": true,
                                "weight": "Bolder",
                                "size": "Medium"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "text": `${time}`,
                                "type": "TextBlock",
                                "placeholder": "Placeholder text",
                                "weight": "Bolder"
                            }
                        ]
                    }
                ]
            }
        ]
    }
},
soups: () => {
   return {
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
                        "title": "SOUP - RS.100",
                        "style": "positive"
                    }
                ]
            }
        ]
    }
},
southindians: () =>{
    return {
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
                    {
                        "type": "Action.Submit",
                        "title": "RS.70 - South Indian",
                        "style": "positive",
                        "id": "southindian"
                    }
                ]
            }
        ]
    }
},
orderdetailcards: (ordertype,typeoffood,dessertdrinks,price) =>{
    return {
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "type": "AdaptiveCard",
            "body": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "Image",
                                    "size": "medium",
                                    "url": "http://contososcuba.azurewebsites.net/assets/Contoso_logo.jpg"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Start with something like:",
                                    "size": "large",
                                    "weight": "bolder"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "'Where can I go scuba diving?'",
                                    "separation": "none"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "or",
                                    "separation": "none"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "'Show me some local wildlife.'",
                                    "separation": "none"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "You can also 'restart' anytime.",
                                    "separation": "none"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "type": "AdaptiveCard",
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.0",
        "body": [
            {
                "type": "Image",
                "url": "https://thumbs.dreamstime.com/b/order-food-online-pizza-courier-delivery-ecommerce-concept-d-illustration-170569150.jpg"
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "ORDER TYPE:",
                                "wrap": true,
                                "size": "Medium",
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [

                            {   "type": "TextBlock",
                                "text": `${ordertype}`,
                    
                                "placeholder": "{ORDER TYPE}"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "wrap": true,
                                                "text": "YOUR ORDER:",
                                                "size": "Medium",
                                                "weight": "Bolder"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": `${typeoffood}`,
                                                
                                                "placeholder": "{TYPE OF FOOD}"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "wrap": true,
                                "text": "DESSERT AND DRINKS:",
                                "weight": "Bolder",
                                "size": "Medium"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `${dessertdrinks}`,
                               
                                "placeholder": "{DESSERT AND DRINKS}"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "PRICE:",
                                "wrap": true,
                                "size": "Large",
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `${price}`,
                                
                                "placeholder": "{PRICE}"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
}