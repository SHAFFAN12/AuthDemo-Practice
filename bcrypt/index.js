const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw,salt);
    console.log(salt);
    console.log(hash);
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw,hashedPw);
    if(result){
        console.log('Logged in!!!')
    }else{
        console.log('Try Again')
    }
}

login('monkeyE','$2b$10$03ABn3E5maXZ1rBX5aWKK.pKix2XSYsn2G.xQQOcHbvl/znZJTTC.');