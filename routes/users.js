const User = {
    type: 'object',
    properties: {
        user_id: { type: 'integer'},
        email: { type: 'string'},
        roles: { type: 'array'} 
    }
};

async function routes(fastify, options){
    
    fastify.get('/', async(req, reply) => {
        const query = `SELECT u.user_id, u.email, r.name as role_name
                            FROM users u
                            INNER JOIN user_roles ur ON ur.user_id = u.user_id
                            INNER JOIN roles r ON r.role_id = ur.role_id
                            ORDER BY u.user_id`;

        let result = [];
        try{
            const queryResult = await fastify.pg.query(query);
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
            conslole.log(ex.getMessage());
        }                 
                
        return result;
    });

    fastify.get('/:userId', async(req, reply)=>{
        const query = `SELECT u.user_id, u.email, r.name as role_name
                            FROM users u
                            INNER JOIN user_roles ur ON ur.user_id = u.user_id
                            INNER JOIN roles r ON r.role_id = ur.role_id
                            WHERE u.user_id = $1`;

        let result = {};
        try{
            const queryResult = await fastify.pg.query(query,[req.params.userId]);
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
            conslole.log(ex.getMessage());
        }                 
                
        return result;
    });

    fastify.post('/', async(req, reply)=>{
        const hashedPassword = await fastify.bcrypt.hash(req.body.password);
        const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id`;
        await fastify.pg.transact(async client => {
            const response = await client.query(query, [req.body.email, hashedPassword]);
            console.log(`se ha creado el usuario con id ${response}`);
            
            if(response.rows.length > 0){
                const queryRoles = `INSERT INTO user_roles (user_id, role_id) VALUES ($1, 2)`;
                await client.query(queryRoles, [response.rows[0].user_id]);
                return {responseCode: "OK"};
            }
        });    

        return {responseCode: "KO"};
    });

    fastify.put('/:userId', async(req, reply)=>{

    });

    fastify.delete('/:userId', async(req, reply)=>{

    });
}

module.exports = routes;