const bcrypt = require('bcrypt');

module.exports = {
    comparePassword: async(password,hashPassword) => {
        try{
            const result = await bcrypt.compare(password,hashPassword)

            return result
        }catch(err){
            throw Error('bcrypt error');
        }


    }
}