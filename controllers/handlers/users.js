const getUsersHandler = async function(req, reply) {
    const query = `SELECT u.user_id, u.email, r.name as role_name
                        FROM users u
                        INNER JOIN user_roles ur ON ur.user_id = u.user_id
                        INNER JOIN roles r ON r.role_id = ur.role_id
                        ORDER BY u.user_id`;

    let result = [];
    try{
        const queryResult = await this.pg.query(query);
        if(queryResult.rows.length == 0){
            return queryResult.rows;
        }

        result = queryResult.rows.reduce(function(acc, cur){  
            const lastElement = acc.length == 0 ? {} : acc[acc.length - 1];   
                            
            if(lastElement.user_id !== cur.user_id){
                let newElem = {};
                newElem.user_id = cur.user_id;
                newElem.email = cur.email;
                newElem.roles = [cur.role_name];                  
                acc.push(newElem);
            }else{
                lastElement.roles = lastElement.roles.concat(cur.role_name);
            }     

            return acc;      
        }, []);
        
    } catch(ex){
        console.error(ex);
    }                 
            
    return result;
};

const getUserHandler = async function(req, reply){
    const query = `SELECT u.user_id, u.email, r.name as role_name
                        FROM users u
                        INNER JOIN user_roles ur ON ur.user_id = u.user_id
                        INNER JOIN roles r ON r.role_id = ur.role_id
                        WHERE u.user_id = $1`;

    let result = {};
    try{
        const queryResult = await this.pg.query(query,[req.params.userId]);
        if(queryResult.rows.length == 0){
            return {};
        }

        result = queryResult.rows.reduce(function(acc, cur, index){       
            if(index == 0){
                acc.user_id = cur.user_id;
                acc.email = cur.email;
                acc.roles = [cur.role_name];

                return acc;

            }else{
                acc.roles.push(cur.role_name);
            }     
            return acc;      
        }, {});
        
    } catch(ex){
        console.error(ex);
    }                 
            
    return result;
};

const addUserHandler = async function(req, reply){
    const hashedPassword = await this.bcrypt.hash(req.body.password);
    const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id`;
    const transactDone = await this.pg.transact(async client => {
        const response = await client.query(query, [req.body.email, hashedPassword]);
        
        if(response.rows.length > 0){
            const queryRoles = `INSERT INTO user_roles (user_id, role_id) VALUES ($1, 2)`;
            await client.query(queryRoles, [response.rows[0].user_id]);
            return true;
        }

        return false;
    });    

    return {responseCode: transactDone ? "OK" : "KO"};
};

const updateUserHandler = async function(req, reply){
    const hashedPassword = await this.bcrypt.hash(req.body.password);
    const query = `UPDATE users SET password = $1 WHERE user_id = $2`;
    const response = await this.pg.query(query, [hashedPassword, req.params.userId]);
    if(response.rowCount > 0){
        return {responseCode: "OK"};
    }   
    return {responseCode: "KO"};
};

const deleteUserHandler = async function(req, reply){
    const delUserRolesQuery = `DELETE FROM user_roles WHERE user_id = $1`;
    const delUserQuery = `DELETE FROM users WHERE user_id = $1`;
    const deleted = await this.pg.transact( async client =>{
        try{
            const delUser = await client.query(delUserQuery, [req.params.userId]);
            const delUserRoles = await client.query(delUserRolesQuery, [req.params.userId]);
            if(delUser && delUserRoles);
        }catch(ex){
            return false;
        }
        
    });

    return {responseCode: deleted ? "OK" : "ERROR"};
};

module.exports = {
    getUsersHandler,
    getUserHandler,
    addUserHandler,
    updateUserHandler,
    deleteUserHandler
};