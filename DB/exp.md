userID: (type unique Number)
isTransationExpense: (type boolen)
isTransactionTrip:(type object)
isTransactionRepeating:(type object)
onDate:(type string)
ofAmount:(type number)
isExpenseNote:(type string)
primeCategory:(type string)
subCategory:(type string)
transactionTimestamp:(type string)




const { body } = require('express-validator');

const transactionValidationRules = [
  body('userID')
    .isNumeric().withMessage('userID must be a number'),

  body('isTransationExpense')
    .isBoolean().withMessage('isTransationExpense must be a boolean'),

  body('isTransactionTrip')
    .isObject().withMessage('isTransactionTrip must be an object'),

  body('isTransactionRepeating')
    .isObject().withMessage('isTransactionRepeating must be an object'),

  body('onDate')
    .isISO8601().withMessage('onDate must be a valid ISO 8601 date string'),

  body('ofAmount')
    .isNumeric().withMessage('ofAmount must be a number'),

  body('isExpenseNote')
    .isString().withMessage('isExpenseNote must be a string'),

  body('primeCategory')
    .isString().withMessage('primeCategory must be a string'),

  body('subCategory')
    .isString().withMessage('subCategory must be a string'),

  body('transactionTimestamp')
    .isISO8601().withMessage('transactionTimestamp must be a valid ISO 8601 datetime string'),
];

module.exports = transactionValidationRules;



const transactionSchema = new mongoose.Schema({
userId: {
type: Number,
required: true,
unique: false, // unique per user, but many transactions can have same userId
index: true
},
isTransactionExpense: {
type: Boolean,
required: true
},
isTransactionTrip: {
type: Boolean,
default: false
},
isTransactionRepeating: {
type: Boolean,
default: false
},
onDate: {
type: String,
required: true
},
ofAmount: {
type: Number,
required: true
},
title: {
type: String,
required: true
},
description: {
type: String
},
primeCategory: {
type: String
},
subCategory: {
type: String
},
userCategory: {
type: String
},
transactionTimestamp: {
type: String,
required: true
}
},);

[
body('userId').isInt().withMessage('User ID must be an integer'),
body('isTransactionExpense').isBoolean().withMessage('isTransactionExpense must be boolean'),
body('isTransactionTrip').isBoolean().withMessage('isTransactionTrip must be boolean'),
body('isTransactionRepeating').isBoolean().withMessage('isTransactionRepeating must be boolean'),
body('onDate').isISO8601().withMessage('onDate must be a valid date string'),
body('ofAmount').isFloat({ gt: 0 }).withMessage('ofAmount must be a positive number'),
body('title').isString().isLength({ min: 1 }).withMessage('title is required'),
body('description').optional().isString(),
body('primeCategory').optional().isString(),
body('subCategory').optional().isString(),
body('userCategory').optional().isString(),
body('transactionTimestamp').isISO8601().withMessage('transactionTimestamp must be a valid ISO date string')
];

///////////////////////////////////////////////////////////////////////////!SECTION

userID:(type unique number)
bills:(type array of objs) [
{
isTransationExpense: (type boolen /// but always true)
isTransactionRepeat:(type boolen /// but always true)
ofAmount:(type number)
title:(type string)
description:(type string)
primeCategory:(type string)
subCategory:(type string)
userCategory:(type string)
createdOn:(type string)
}

]

// bill sub-document schema
const billSchema = new mongoose.Schema({
isTransactionExpense: {
type: Boolean,
default: true
},
isTransactionRepeat: {
type: Boolean,
default: true
},
ofAmount: {
type: Number,
required: true
},
title: {
type: String,
required: true
},
description: {
type: String
},
primeCategory: {
type: String
},
subCategory: {
type: String
},
userCategory: {
type: String
},
createdOn: {
type: String,
required: true
}
});

// main user schema
const billsSchema = new mongoose.Schema({
userId: {
type: Number,
unique: true,
required: true,
index: true
},
bills: [billSchema]
});

// Validation middleware for bills array
const billsValidationRules = () => {
return [
body('userId').isInt().withMessage('User ID must be an integer'),
body('bills').isArray().withMessage('Bills must be an array'),

    // Validate every object inside bills array
    body('bills.*.ofAmount').isFloat({ gt: 0 }).withMessage('ofAmount must be positive'),
    body('bills.*.title').isString().notEmpty().withMessage('Title is required'),
    body('bills.*.description').optional().isString(),
    body('bills.*.primeCategory').optional().isString(),
    body('bills.*.subCategory').optional().isString(),
    body('bills.*.userCategory').optional().isString(),
    body('bills.*.createdOn').isISO8601().withMessage('createdOn must be a valid date')

];
};

bill type : monthly or yearly add left

//////////////////////////////////////////////////////////////////////////////////////////////!SECTION

userID:
ofYear: number
monthlyBudget: number
oldBudget: [
{
value: number
changedOn: boolen
}
]

// Subdocument schema for oldBudget
const oldBudgetSchema = new mongoose.Schema({
value: {
type: Number,
required: true
},
changedOn: {
type: String, // store as ISO date string
required: true
}
});

// Main Budget Schema
const budgetSchema = new mongoose.Schema({
userId: {
type: Number,
unique: true,
required: true,
index: true
},
ofYear: {
type: Number,
required: true
},
monthlyBudget: {
type: Number,
required: true
},
oldBudget: [oldBudgetSchema]
});

const budgetValidationRules = () => {
return [
body('userId').isInt().withMessage('User ID must be an integer'),
body('ofYear').isInt({ min: 2000 }).withMessage('Invalid year'),
body('monthlyBudget').isFloat({ gt: 0 }).withMessage('monthlyBudget must be a positive number'),

    body('oldBudget').optional().isArray(),
    body('oldBudget.*.value').isFloat({ gt: 0 }).withMessage('oldBudget value must be positive'),
    body('oldBudget.*.changedOn').isISO8601().withMessage('oldBudget changedOn must be a valid date')

];
};

/////////////////////////////////////////////////////////////////////////////////////////////////!SECTION

userID:
year: number
minSpent: number
minSpentList:[] contains array of trans ids ( \_id:ObjectId('')) which was generated auto by DB
maxSpent : number
maxSpentList:[] contains array of trans ids ( \_id:ObjectId('')) which was generated auto by DB

const spendingSummarySchema = new mongoose.Schema({
userId: {
type: Number,
required: true,
index: true
},
year: {
type: Number,
required: true
},
minSpent: {
type: Number,
required: true
},
minSpentList: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Transaction' // reference to Transaction collection (optional but useful)
}],
maxSpent: {
type: Number,
required: true
},
maxSpentList: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Transaction'
}]
});

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const spendingSummaryValidationRules = () => {
return [
body('userId').isInt().withMessage('User ID must be an integer'),
body('year').isInt({ min: 2000 }).withMessage('Invalid year'),
body('minSpent').isFloat({ gt: 0 }).withMessage('minSpent must be positive'),
body('minSpentList').isArray().withMessage('minSpentList must be array'),
body('minSpentList.*').custom(value => {
if (!isValidObjectId(value)) {
throw new Error('Invalid ObjectId in minSpentList');
}
return true;
}),
body('maxSpent').isFloat({ gt: 0 }).withMessage('maxSpent must be positive'),
body('maxSpentList').isArray().withMessage('maxSpentList must be array'),
body('maxSpentList.*').custom(value => {
if (!isValidObjectId(value)) {
throw new Error('Invalid ObjectId in maxSpentList');
}
return true;
}),
];
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

userID:
byYear:[{
year: number
total : number
}]
byMonth:[
{
year:number
months:[
{
month: number
total number
}
]
}
]

byPrime:[
{
year:number
primeList:[
{
category : string
total : number
months:[
{
month: number
total number
}
]
}
]
}

]

bySub:[
{
year:number
subList:[
{
category : string
ofPrime: string
total : number
months:[
{
month: number
total number
}
]
}
]
}

]

const monthSchema = new mongoose.Schema({
month: { type: Number, required: true },
total: { type: Number, required: true }
});

const subListSchema = new mongoose.Schema({
category: { type: String, required: true },
ofPrime: { type: String, required: true },
total: { type: Number, required: true },
months: [monthSchema]
});

const primeListSchema = new mongoose.Schema({
category: { type: String, required: true },
total: { type: Number, required: true },
months: [monthSchema]
});

const byYearSchema = new mongoose.Schema({
year: { type: Number, required: true },
total: { type: Number, required: true }
});

const byMonthSchema = new mongoose.Schema({
year: { type: Number, required: true },
months: [monthSchema]
});

const byPrimeSchema = new mongoose.Schema({
year: { type: Number, required: true },
primeList: [primeListSchema]
});

const bySubSchema = new mongoose.Schema({
year: { type: Number, required: true },
subList: [subListSchema]
});

const reportSchema = new mongoose.Schema({
userId: { type: Number, required: true, unique: true, index: true },
byYear: [byYearSchema],
byMonth: [byMonthSchema],
byPrime: [byPrimeSchema],
bySub: [bySubSchema]
});

const reportValidationRules = () => {
return [
body('userId').isInt().withMessage('userId must be an integer'),

    body('byYear').optional().isArray(),
    body('byYear.*.year').isInt(),
    body('byYear.*.total').isFloat(),

    body('byMonth').optional().isArray(),
    body('byMonth.*.year').isInt(),
    body('byMonth.*.months').isArray(),
    body('byMonth.*.months.*.month').isInt({ min: 1, max: 12 }),
    body('byMonth.*.months.*.total').isFloat(),

    body('byPrime').optional().isArray(),
    body('byPrime.*.year').isInt(),
    body('byPrime.*.primeList').isArray(),
    body('byPrime.*.primeList.*.category').isString(),
    body('byPrime.*.primeList.*.total').isFloat(),
    body('byPrime.*.primeList.*.months').isArray(),
    body('byPrime.*.primeList.*.months.*.month').isInt({ min: 1, max: 12 }),
    body('byPrime.*.primeList.*.months.*.total').isFloat(),

    body('bySub').optional().isArray(),
    body('bySub.*.year').isInt(),
    body('bySub.*.subList').isArray(),
    body('bySub.*.subList.*.category').isString(),
    body('bySub.*.subList.*.ofPrime').isString(),
    body('bySub.*.subList.*.total').isFloat(),
    body('bySub.*.subList.*.months').isArray(),
    body('bySub.*.subList.*.months.*.month').isInt({ min: 1, max: 12 }),
    body('bySub.*.subList.*.months.*.total').isFloat(),

];
};

//////////////////////////////////////////////////////////////////////////!SECTION

userID:
userEmail: string
createdOn: string



userID
year : 2025
total : xx
monthlist:[
  {month:0,total:xx},
  {month:1,total:xx},
]
primeList:[ {name:prime1,total:xx},
  {name:prime2,total:xx},] 

subList : [{primename:prime1,name:sub1,total:xx},
   {name:sub2,total:xx},]
   



userID
year : 2025
total : xx
monthlist:[
  {month:0,total:xx},
  {month:1,total:xx},
]
primeList:{
  {name:prime1,total:xx,subList : [
   {name:sub1,total:xx},
   {name:sub2,total:xx},
]},
  {name:prime2,total:xx,subList : [
   {name:sub1,total:xx},
   {name:sub2,total:xx},
]},
}



