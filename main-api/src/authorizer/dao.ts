import pool from '../config/pool'
import { compare } from '../utils/encrypt'
import { v4 as uuid } from 'uuid'


export const comparePassword = async (email: string, password: string): Promise<any> => {
    const result = await pool.query('SELECT * FROM user_accounts WHERE email=$1', [email])
    const user = result?.rows[0]
    const isMatch = await compare(password, user?.password)
    delete user?.password
    const { rows } = await pool.query(`
    SELECT ru.role_id, ur.role_name, rb.branch_id
    FROM user_accounts ua
    JOIN role_user ru ON ua.id = ru.user_id
    JOIN user_roles ur ON ru.role_id = ur.id
    JOIN role_branch rb ON ru.role_id = rb.role_id
    WHERE ua.id  = $1;
    `, [user?.id])
    user.role = rows[0].role_name.toLowerCase()
    user.branchId = rows[0].branch_id.toLowerCase()
    return { isMatch, user }
}



export const getNavigationMenu = async (roleId: string) => {
    const navigationQueryResponse = await pool.query(`
    SELECT
        parent.menu_title AS title,
        parent.icon AS icon,
        ARRAY_AGG(
            json_build_object(
                'title', child.menu_title,
                'path', child.menu_path
            ) ORDER BY CAST(child.menu_code AS NUMERIC) ASC
        ) AS children
    FROM
        menu_items AS parent
        LEFT JOIN role_menu AS parent_role_menu ON parent_role_menu.menu_id = parent.id
        LEFT JOIN menu_items AS child ON child.parent_id = parent.id
        LEFT JOIN role_menu AS child_role_menu ON child_role_menu.menu_id = child.id
    WHERE
        parent_role_menu.read_allowed = TRUE
        AND parent_role_menu.role_id = $1
        AND child_role_menu.read_allowed = TRUE
        AND (child_role_menu IS NULL OR child_role_menu.role_id = $1)
    GROUP BY
        parent.menu_title, parent.id, parent.menu_code, parent.icon
    HAVING
        COUNT(child.id) > 0
    ORDER BY CAST(parent.menu_code AS NUMERIC) ASC;
    `, [roleId]);

    const rawNavigationMenu = navigationQueryResponse.rows;
    return rawNavigationMenu;
};

export const getUserToken = async (userId: string) => {
    // const roleId = '78623c3a-d5f7-4e60-90dd-e9fec1154353'
    const userTokenQueryResponse = await pool.query(`
    SELECT
    *
    FROM user_token where user_id = $1;
    `, [userId])
    const userTokenData = userTokenQueryResponse.rows
    return userTokenData[0]
}

export const createUserToken = async (userId: string, date: any) => {
    const id = uuid()
    const userTokenQueryResponse = await pool.query(`
    INSERT INTO user_token
    (
        id, 
        user_id,
        token_date
    )
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [id, userId, date])
    const userTokenData = userTokenQueryResponse.rows
    return userTokenData[0]
}

export const deleteUserToken = async (userId: string) => {
    const userTokenQueryResponse = await pool.query(`
    DELETE FROM user_token
    WHERE user_id = $1;
    `, [userId])
    const userTokenData = userTokenQueryResponse.rows
    return userTokenData[0]
}

export const getNavigationPath = async (roleId: string) => {
    const navigationQueryResponse = await pool.query(`
    SELECT
    menu_path
    FROM
    menu_items 
    INNER JOIN role_menu ON role_menu.menu_id = menu_items.id
    WHERE
        role_menu.read_allowed = TRUE
        AND role_menu.role_id = $1
    `, [roleId]);
    const rawNavigationMenu = navigationQueryResponse.rows;
    return rawNavigationMenu;
};

export default {
    getUserToken,
    deleteUserToken,
    comparePassword,
    getNavigationMenu,
    getNavigationPath,
    createUserToken
}