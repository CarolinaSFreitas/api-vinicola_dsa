import bcrypt from 'bcrypt'

import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';

export const Usuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(60),
        allowNull: false
    }

}, {
    timestamps: false
});

// hook (gancho) do Sequelize que é executado antes da inserção
// de um registro. Faz a criptografia da senha
// e atribui o hash ao campo senha
Usuario.beforeCreate(usuario => {
    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(usuario.senha, salt)
    usuario.senha = hash
})
