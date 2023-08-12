import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'

const defaultMenuItems = [
    { menuLevelOne: 'File', subMenus: ['Period', 'Entity Management', 'Employee Master', 'Transaction Definition', 'Parameter Definition'] },
    { menuLevelOne: 'Tasks', subMenus: ['Loan Transaction', 'Pay Transaction', 'Membership', 'Discontinuation'] },
    { menuLevelOne: 'Process', subMenus: ['Payroll Process']},
    { menuLevelOne: 'Reports', subMenus: ['Payroll Advice', 'Payroll Sheet', 'Payroll Display'] },
    { menuLevelOne: 'Utilities', subMenus: ['TP Calculation', 'Tax Rate'] },
    { menuLevelOne: 'Settings', subMenus: ['General Setup', 'Rights Management', 'User Management'] },

];


const setupApp = async (organizationId: any) => {
    for (const menu of defaultMenuItems) {
        const parentId = uuid();
        const menuPath = `/apps/${menu.menuLevelOne.toLowerCase().replace(/ /g, '-')}`
        const parentQuery = `INSERT INTO menu_items(id, organization_id, parent_id, menu_title, menu_path) VALUES ($1, $2, $3, $4, $5);`;
        await pool.query(parentQuery, [parentId, organizationId, null, menu.menuLevelOne, menuPath,])
        if (menu.subMenus && menu.subMenus.length > 0) {
            for (const subMenu of menu.subMenus) {
                const childId = uuid();
                const subMenuPath = `${menuPath}/${subMenu.toLowerCase().replace(/ /g, '-')}`
                const childQuery = `INSERT INTO menu_items(id, organization_id, parent_id, menu_title, menu_path) VALUES ($1, $2, $3, $4, $5);`;
                await pool.query(childQuery, [childId, organizationId, parentId, subMenu, subMenuPath])
            }
        }
    }
}

export const getAllFromOrganizations = async (organizationId: string) => {
    const { rows: menus } = await pool.query(`
    SELECT c.id, c.parent_id as menu_level_one_id, c.menu_title AS menu_title, c.menu_path, p.menu_title AS menu_level_one_title
    FROM menu_items c
    LEFT JOIN menu_items p ON c.parent_id = p.id
    WHERE c.organization_id =$1`,
        [organizationId])
    return menus
}


export default {
    getAllFromOrganizations,
    setupApp
}