import mongoose, {Schema} from "mongoose";


const advSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['house', 'car', 'land'],
            required: true
        },
        dealType: {
            type: String,
            enum: ['rent', 'sell'],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        thumbnails: [{
            type: String, //cloudinary url
            required: true
        }],
        video:{
            type: String,   //cloudinary url
            required: false
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        // additional fields
        houseType: {
            type: String,
            enum: ['flat', 'personal_house', 'villa'],
            required: function() {
                return this.type === 'house';
            }
        },
        carType: {
            type: String,
            enum: ['petrol', 'diesel'],
            required: function() {
                return this.type === 'car';
            }
        },
        landType: {
            type: String,
            enum: ['farming','residential','multipurpose'],
            required: function() {
                return this.type === 'land';
            }
        }
    }, 
    {
        timestamps: true
    }
)


export const Adv = mongoose.model("Adv", advSchema);