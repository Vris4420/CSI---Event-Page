const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: String,
    shortdescrip: String,
    image: {
        type: String,
        default:"https://media.licdn.com/dms/image/D4D03AQGzbUL1TTf1xg/profile-displayphoto-shrink_200_200/0/1701959819725?e=2147483647&v=beta&t=1U8oL5kgvZTRrCjWvbIU8sa-hBHww_PEN_BrJ5ZkOC4",
        set:(v) => v ===""?"https://media.licdn.com/dms/image/D4D03AQGzbUL1TTf1xg/profile-displayphoto-shrink_200_200/0/1701959819725?e=2147483647&v=beta&t=1U8oL5kgvZTRrCjWvbIU8sa-hBHww_PEN_BrJ5ZkOC4":v,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;