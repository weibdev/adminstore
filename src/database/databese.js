const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.json");
const uniq = require("uniqid");

// Firebase
const firebase = require("firebase").default;
const firebaseSdk = require("./firebaseSdk.json");

const firebaseConfig = firebaseSdk;

const app = firebase.initializeApp(firebaseConfig);
const FireStore = app.firestore();

const FSprods = FireStore.collection("produtos");
const FSsystem = FireStore.collection("system");

// Auth
const Login = async (pass) => {
    const correctPassHash = await (await FSsystem.doc("config").get()).data()
        .passHash;
    const isCorrect = await bcrypt.compare(pass, correctPassHash);

    if (!isCorrect) return { error: true, message: "Senha invalida" };

    const token = jwt.sign({ user: "admin" }, secret, {
        expiresIn: 86400,
    });

    return {
        token,
    };
};

// System
const AddMsg = (data, msg) => {
    FSsystem.doc("msgs").update({
        arr: firebase.firestore.FieldValue.arrayUnion({
            data,
            msg,
        }),
    });
};

const ClearMsgs = () => {
    FSsystem.doc("msgs").update({
        arr: [],
    });
};

// Ccs
const AddCc = (type, item) => {
    FSprods.doc("cc")
        .update({
            [type]: firebase.firestore.FieldValue.arrayUnion({
                ...item,
                id: `${uniq()}${uniq()}${uniq()}`,
            }),
        })
        .catch((err) => {
            console.log(err);
        });
};

const AddCcConsul = (loja, item) => {
    FSprods.doc("consultaveis")
        .update({
            [loja]: firebase.firestore.FieldValue.arrayUnion({
                ...item,
                id: `${uniq()}${uniq()}${uniq()}`,
            }),
        })
        .catch((err) => {
            console.log(err);
        });
};

// Gifts
const AddGift = async (loja, value, keys) => {
    const lastArrayGift = await (await FSprods.doc("gifts").get()).data()[loja];
    const allGiftWithoutTheCorrect = lastArrayGift.filter(
        (g) => g.value !== value
    );
    const GiftCorrect = lastArrayGift.filter((g) => g.value === value)[0];

    let newKeys = [...GiftCorrect.keys];

    if (GiftCorrect.length === 0) {
        FSprods.doc("gifts")
            .update({
                [loja]: [newGiftCorrect, ...allGiftWithoutTheCorrect],
            })
            .catch((err) => {
                console.log(err);
            });
    }

    await keys.map((key) => {
        newKeys.push(key);
    });

    let newGiftCorrect = {
        ...GiftCorrect,
        keys: newKeys,
    };

    FSprods.doc("gifts")
        .update({
            [loja]: [newGiftCorrect, ...allGiftWithoutTheCorrect],
        })
        .catch((err) => {
            console.log(err);
        });
};

// Lara
const AddLara = (item) => {
    FSprods.doc("lara")
        .update({
            arr: firebase.firestore.FieldValue.arrayUnion({
                ...item,
                id: `${uniq()}${uniq()}${uniq()}`,
            }),
        })
        .catch(console.log);
};

// Login
const AddLogin = async (loja, itens) => {
    const lastArrayLogins = await (await FSprods.doc("login").get()).data()
        .logins;
    const allLoginsWithoutTheCorrect = lastArrayLogins.filter(
        (g) => g.loja !== loja
    );
    const loginCorrect = lastArrayLogins.filter((g) => g.loja === loja)[0];

    let newKeys = [...loginCorrect.keys];

    await itens.map((i) => {
        newKeys.push({ ...i, id: `${uniq()}${uniq()}${uniq()}` });
    });

    let newLoginCorrect = {
        ...loginCorrect,
        keys: newKeys,
    };

    FSprods.doc("login")
        .update({
            logins: [newLoginCorrect, ...allLoginsWithoutTheCorrect],
        })
        .catch(console.log);
};

// System
const NewNotification = (data, msg) => {
    FSsystem.doc("msgs").update({
        arr: firebase.firestore.FieldValue.arrayUnion({
            data,
            msg,
        }),
    });
};

module.exports = {
    Login,
    AddCc,
    NewNotification,
    AddCcConsul,
    AddGift,
    AddLara,
    AddLogin,
    AddMsg,
    ClearMsgs,
};
