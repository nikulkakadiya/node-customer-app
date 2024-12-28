const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
    name: 'user',
    tableName: 'users',

    columns:{
        id:{
            type:'int',
            primary:true,
            generated:true
        },
        firstName:{
            type:'varchar',
            name:'first_name',
        },
        lastName:{
            type:'varchar',
            name:'last_name',
            nullable:true,
        },
        email:{
            type:'varchar',
            unique:true
        },
        password:{
            type:'varchar',
        },
        role:{
            type:'varchar',
            enum:['admin', 'customer'],
            default: 'customer',
        },
        isVerified:{
            type:'boolean',
            name:'is_verified',
            default:false,
        },
        created_at: {
            type: 'timestamp',
            createDate: true,
        },
        updated_at: {
            type: 'timestamp',
            updateDate: true,
        }
    },
})

module.exports = User;