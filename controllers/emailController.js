import nodemailer from "nodemailer"
import md5 from "md5";      //serve pra zerar o hash
import { Usuario } from "../models/Usuario.js";
import { Troca } from "../models/Troca.js";

// async..await is not allowed in global scope, must use a wrapper
async function main(nome, email, hash) {

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 465,
        secure: false,
        auth: {
            user: "72de88ddb16c79",
            pass: "eeaaff247b1c55"
        }
    });

    const link = "http://localhost:3000/usuarios/trocasenha/" + hash

    let mensa = "<h4>Sistemas da Vinícola</h4>"
    mensa += `<h5>Estimado Usuário: ${nome}</h5>`
    mensa += "<h5>Você solicitou a troca de senha</h5>"
    mensa += `<a href="${link}">Alterar a senha</a>`

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Vinícola Freitas 👻" <vinicolafreitas@example.com>', // sender address
        to: email, // list of receivers
        subject: "Troca de Senha", // Subject line
        text: `Copie e cole o link ${link} para alterar a senha`, // plain text body
        html: mensa, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

export async function enviaEmail(req, res) {
    const { email } = req.body

    try {
        const usuario = await Usuario.findOne({ where: { email } })

        if (usuario == null) {
            res.status(400).json({ erro: "E-mail inválido" })
            return
        }

        const hash = md5(usuario.nome + email + Date.now())

        main(usuario.nome, email, hash).catch(console.error)

        await Troca.create({email, hash})

        res.status(200).json({msg: "Ok! E-mail enviado com sucesso :)"})
    } catch (error) {
        res.status(400).json({ error })
    }
}