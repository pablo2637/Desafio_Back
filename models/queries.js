
const queriesRoles = {
    insertRol: `INSERT INTO roles (user_id, role)
                VALUES ($1, $2);`,

    getRol: `SELECT role
                FROM roles
                WHERE user_id=$1;`
};


const queriesUser = {
    getUsers: `SELECT user_id, name, last_name, email, avatar
                FROM users;`,

    getUserByEmail: `SELECT user_id, name, last_name, email, avatar
                    FROM users
                    WHERE email=$1;`,

    createUser: `INSERT INTO users (name, last_name, email, avatar, password)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING user_id, name, email;`,

    updateUser: `UPDATE users
                        SET name=$1,
                            last_name=$2,
                            email=$3,                            
                            avatar=$4,
                            password=$5                            
                        WHERE user_id=$6;`,

    getUserPass: `SELECT password
                    FROM users AS u
                    WHERE user_id=$1;`,
};


module.exports = {
    queriesRoles,
    queriesUser
}

