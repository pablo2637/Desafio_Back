
const queriesRoles = {
    insertRol: `INSERT INTO roles (user_id, role)
                VALUES ($1, $2);`,

    getRol: `SELECT role
                FROM roles
                WHERE user_id=$1;`,

    insertRolPlaces: `INSERT INTO roles (place_id, role)
                VALUES ($1, $2);`
};



const queriesPlaces = {

    allPlacesQuery: `
    SELECT p.*, r.role
    FROM places AS p
    INNER JOIN roles AS r
    ON r.place_id=p.place_id
    ORDER BY p.register_date;`,

    placeByEmailQuery: `
    SELECT p.place_id, p.place_name, p.address, p.coords, p.phone, p.email, p.contact_name
    FROM places AS p
    WHERE p.email=$1;`,

    createPlaceQuery: `
    INSERT INTO places (place_name, address, coords, phone, email, contact_name, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING place_id`,

    updatePlaceQuery: `
    UPDATE places
    SET place_name=$1,address=$2,coords=$3,phone=$4,email=$5,contact_name=$6
    WHERE place_id=$7`,

    deletePlaceQuery: `
    DELETE FROM places
    WHERE email=$1`
};



const queriesUser = {

    getUsers: `SELECT u.user_id, u.name, u.last_name, u.email, u.avatar, r.role
                FROM users AS u                
                INNER JOIN roles AS r
                ON r.user_id=u.user_id
                ORDER BY u.register_date;`,

    getUserByEmail: `SELECT u.user_id, u.name, u.last_name, u.email, u.avatar, r.role
                    FROM users AS u                
                    INNER JOIN roles AS r
                    ON r.user_id=u.user_id
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



const queriesRecycle = {
    createRecycle: `INSERT INTO recycle (user_id, place_id, qty, reward)
    VALUES ($1, $2, $3, $4)
    RETURNING rec_id, user_id, place_id, qty, reward;`,

    getRecycles: `SELECT r.register_date, u.name, u.user_id, u.email, p.place_name, p.coords, p.phone, r.qty, r.reward
                FROM recycle AS r
                INNER JOIN users AS u
                ON r.user_id=u.user_id
                INNER JOIN places AS p
                ON p.place_id=r.place_id
                ORDER BY r.register_date;`,

    getUserRecyclesByEmail: `SELECT r.register_date, u.name, u.user_id, u.email, p.place_name, p.coords, p.phone, r.qty, r.reward
                FROM recycle AS r
                INNER JOIN users AS u
                ON r.user_id=u.user_id
                INNER JOIN places AS p
                ON p.place_id=r.place_id
                WHERE u.email=$1
                ORDER BY r.register_date;`,

    getPlacesRecyclesByEmail: `SELECT r.register_date, u.name, u.user_id, u.email, p.place_name, p.coords, p.phone, r.qty, r.reward
                FROM recycle AS r
                INNER JOIN users AS u
                ON r.user_id=u.user_id
                INNER JOIN places AS p
                ON p.place_id=r.place_id
                WHERE p.email=$1
                ORDER BY r.register_date;`
};


const queriesRewards = {
    createRewards: `INSERT INTO rewards (user_id, place_id, reward)
                    VALUES ($1, $2, $3)
                    RETURNING rew_id, user_id, place_id, reward;`,

    getRewards: `SELECT r.register_date, u.name, u.user_id, u.email, p.place_name, p.coords, p.phone, r.reward
                FROM rewards AS r
                INNER JOIN users AS u
                ON r.user_id=u.user_id
                INNER JOIN places AS p
                ON p.place_id=r.place_id
                ORDER BY r.register_date;`,

    getUserRewardsByEmail: `SELECT r.register_date, u.name, u.user_id, u.email, p.place_name, p.coords, p.phone, r.reward
                FROM rewards AS r
                INNER JOIN users AS u
                ON r.user_id=u.user_id
                INNER JOIN places AS p
                ON p.place_id=r.place_id
                WHERE u.email=$1
                ORDER BY r.register_date;;`,

    getPlacesRewardsByEmail: `SELECT r.register_date, u.name, u.user_id, u.email, p.place_name, p.coords, p.phone, r.reward
                FROM rewards AS r
                INNER JOIN users AS u
                ON r.user_id=u.user_id
                INNER JOIN places AS p
                ON p.place_id=r.place_id
                WHERE p.email=$1
                ORDER BY r.register_date;`,

};


const queriesComments = {

    getAllComm: `SELECT * FROM comm AS c
                ORDER BY c.register_date;`,


    PostComm: `INSERT INTO comm (comm, user_id, place_id)
            VALUES ($1, $2, $3)
            RETURNING comm, place_id`,


    UpdateComm: `UPDATE comm
            SET comm = $1
            WHERE user_id = $2 AND place_id = $3
            RETURNING comm`,


    deleteComm: `DELETE FROM comm WHERE comm_id = $1`,
};



module.exports = {
    queriesPlaces,
    queriesRoles,
    queriesUser,
    queriesRecycle,
    queriesComments,
    queriesRewards
}

