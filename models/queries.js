
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
    SELECT p.place_id, p.contact_name, r.role, re.*
    FROM places AS p
    INNER JOIN restaurants AS re
    ON re.id=p.rest_id
    INNER JOIN roles AS r
    ON r.place_id=p.place_id
    ORDER BY p.register_date;`,

    placeByPhoneQuery: `
    SELECT p.place_id, p.contact_name, r.role, re.*
    FROM places AS p
    INNER JOIN restaurants AS re
    ON re.id=p.rest_id
    INNER JOIN roles AS r
    ON r.place_id=p.place_id
    WHERE re.phone=$1;`,

    createPlaceQuery: `
    INSERT INTO places (place_name, address, coords, phone, email, contact_name, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING place_id, place_name, address, coords, phone, email, contact_name`,

    updatePlaceQuery: `
    UPDATE places
    SET place_name=$1,address=$2,coords=$3,phone=$4,email=$5,contact_name=$6
    WHERE place_id=$7`,

    deletePlaceQuery: `
    DELETE FROM places
    WHERE email=$1`,

    getPlacePass: `SELECT password
    FROM places AS p
    WHERE place_id=$1;`,
};



const queriesRestaurants = {

    getRestaurants: `SELECT id as place_id, name as place_name, address, image_url, ARRAY[latitude, longitude] AS coords,
                        phone, price, url, rating
                    FROM restaurants
                    ORDER BY name;`,

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

    getRecycles: `SELECT * FROM recycle`,

    getUserRecyclesByID: `SELECT r.register_date, u.name, u.user_id, u.email, e.name, e.address, e.phone, r.qty, r.reward,
                            CASE WHEN EXISTS (SELECT 1 FROM recycle re WHERE re.qty = 0 AND re.user_id = u.user_id) THEN u.user_id END AS points
                            FROM recycle AS r
                            INNER JOIN users AS u ON r.user_id = u.user_id
                            INNER JOIN places AS p ON p.place_id = r.place_id
                            INNER JOIN restaurants AS e ON p.rest_id = e.id
                            WHERE u.user_id = $1
                            ORDER BY r.register_date;`,

    getPlacesRecyclesByEmail: `SELECT r.register_date, u.name, u.user_id, u.email, p.place_name, p.coords, p.phone, r.qty, r.reward
                FROM recycle AS r
                INNER JOIN users AS u
                ON r.user_id=u.user_id
                INNER JOIN places AS p
                ON p.place_id=r.place_id
                WHERE p.email=$1
                ORDER BY r.register_date;`,


    check1000Points: `SELECT user_id
                        FROM recycle as r
                        WHERE EXISTS (qty = 0 AND user_id=$1);`,


    sumRecycle: ` Select user_id, total_rewards from 
                 (SELECT sum(reward) total_rewards, user_id
                FROM recycle group by user_id) C1 where C1.user_id = $1 ;`,

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
    queriesRestaurants,
    queriesUser,
    queriesRecycle,
    queriesComments,
    queriesRewards
}

