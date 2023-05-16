
const queriesRoles = {
    insertRol: `INSERT INTO roles (user_id, rol)
                VALUES ($1, $2);`,

    getRol: `SELECT rol
                FROM roles
                WHERE user_id=$1;`
};





module.exports = {
    queriesRoles
}

