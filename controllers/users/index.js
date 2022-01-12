const getUser = async (fastify, userId) => {
    const query = `SELECT u.user_id, u.email, r.name as role_name
                        FROM users u
                        INNER JOIN user_roles ur ON ur.user_id = u.user_id
                        INNER JOIN roles r ON r.role_id = ur.role_id
                        WHERE u.user_id = $1`;

    let result = {};
    try{
        const queryResult = await fastify.pg.query(query,[userId]);
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
        throw new Error(ex.message);
    }                 
            
    return result;
};

module.exports = {getUser};