const {getUser} = require('../controllers/users');

const loginHandler = async function(req, reply){
    const query = `SELECT * FROM users WHERE email = $1`;

    const response = await this.pg.query(query, [req.body.email]);
    if(response.rows.length == 0) return { responseCode: "KO" };
    
    const hashedPassword = response.rows[0].password;
    const rightPass = await this.bcrypt.compare(req.body.password, hashedPassword);
    
    if(rightPass) {
        try{
            const payload = await getUser(this, response.rows[0].user_id);
            const token = this.jwt.sign(payload);
            return { responseCode: "OK", token};
        }catch(ex){
            reply.status(400);
        }
        
    }
    reply.status(401);
    return {responseCode: "KO"};
};

module.exports = {
    loginHandler
};