export const ResouceConstant ={
    ApiEndPoints: {

    },
    Patterns: {

    },
    menus: [
        {
            path: 'users',
            text: 'Quản lý user',
            roles: ['ROLE_ADMIN','ROLE_EDITER','REMOVE_USER','EDIT_USER','ADD_USER']
        },
        {
            path: 'units',
            text: 'Quản lý đơn vị',
            roles: ['ROLE_ADMIN','ROLE_EDITER','REMOVE_UNIT','EDIT_UNIT','ADD_UNIT']
        },
        {
            path: 'customers',
            text: 'Quản lý Customer',
            roles: ['ROLE_ADMIN','ROLE_USER','ROLE_EDITER','REMOVE_CUSTOMER','EDIT_CUSTOMER','ADD_CUSTOMER']
        },
        {
            path: 'infor',
            text: 'Thông tin',
            roles: []
        },
        {
            path: 'search',
            text: 'Tra cứu',
            roles: ['ROLE_DEFAULT']
        },
        {
            path: 'customRole',
            text: 'custom role',
            roles: ['ROLE_ADMIN']
        },
    ]

}