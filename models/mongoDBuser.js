const mongoose = require('mongoose');
const passportLocalMangoose = require('passport-local-mongoose');

const dbConfig = require("./config/db");
const { Schema } = mongoose;

//スキーマの作成
// const IngredientSchema = new Schema({ name: String });
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    ingredients: {
        type: [],
        default: undefined
    }
});

userSchema.plugin(passportLocalMangoose, {
    errorMessages: {
        UserExistsError: 'そのユーザー名はすでに使われています。',
        MissingPasswordError: 'パスワードを入力してください。',
        AttemptTooSoonError: 'アカウントがロックされてます。時間をあけて再度試してください。',
        TooManyAttemptsError: 'ログインの失敗が続いたため、アカウントをロックしました。',
        NoSaltValueStoredError: '認証ができませんでした。',
        IncorrectPasswordError: 'パスワードまたはユーザー名が間違っています。',
        IncorrectUsernameError: 'パスワードまたはユーザー名が間違っています。',
    }
});

//モデル（クラス）の作成
module.exports.User = mongoose.model('User', userSchema);