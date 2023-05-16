
const queriesRoles = {
    insertRol: `INSERT INTO roles (user_id, rol)
                VALUES ($1, $2);`,

    getRol: `SELECT rol
                FROM roles
                WHERE user_id=$1;`
};

const queriesPlaces = {

    allPlacesQuery:`
    SELECT * FROM places
    ORDER BY register_date;`,

    placeByEmailQuery:`
    SELECT p.place_id, p.place_name, p.address, p.coords, p.phone, p.email, p.contact_name
    FROM places AS p
    WHERE p.email=$1;`,

    createPlaceQuery:`
    INSERT INTO places (place_name, address, coords, phone, email, contact_name)
    VALUES ($1, $2, $3, $4, $5, $6)`,

    updatePlaceQuery:`
    UPDATE places
    SET place_name=$1,address=$2,coords=$3,phone=$4,email=$5,contact_name=$6
    WHERE place_id=$7`,

    deletePlaceQuery:`
    DELETE FROM places
    WHERE email=$1`
}

// SELECT p.place_id, p.place_name, p.address, p.coords, p.phone, p.email, p.contact_name, u.name, u.last_name, u.email, r.register_date, r.qty
//     FROM places AS p
//     INNER JOIN recycle AS r ON p.place_id = r.place_id
//     INNER JOIN users AS u ON u.user_id = r.user_id
//     WHERE u.email=$1
//     GROUP BY r.user_id

module.exports = {

    queriesRoles,
    queriesPlaces
}

