const { Router } = require("express")
const bcrypt = require("bcrypt-nodejs")
const { PrismaClient } = require("@prisma/client")
const sendEmail = require("../services/nodemailer")
const { makeToken, checkToken } = require("../security/jwt")

const prisma = new PrismaClient()
const router = Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email: email } })

  if (user) {
    if (!user.isConfirmed)
      return res.status(401).json({ error: "Invalid email or not confirmed" })

    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
      const token = makeToken({
        id: user.id,
        email: user.email,
        isConfirmed: true,
      })
      res.status(200).json({ token })
    } else {
      res.status(401).json({ error: "Invalid password" })
    }
  } else {
    res.status(401).json({ error: "Invalid email or not confirmed" })
  }
})

router.post("/register", async (req, res) => {
  console.log(req.body)
  const { email, password, firstname, lastname } = req.body
  console.log(email, password, firstname, lastname)
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    console.log("🚀 ~ file: auth.js:40 ~ router.post ~ user", user)

    if (user) {
      res.status(409).json({ error: "Email already exists" })
      console.log("user already exists")
    } else {
      console.log("TRY CRYPT", password)

      const hash = bcrypt.hashSync(password)
      console.log("🚀 ~ file: auth.js:58 ~ router.post ~ hash", hash)
      return
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hash,
          firstname,
          lastname,
        },
      })
      console.log("🚀 ~ file: auth.js:57 ~ router.post ~ newUser", newUser)

      const token = makeToken({
        id: newUser.id,
        email: email,
        isConfirmed: false,
      })
      console.log("🚀 ~ file: auth.js:64 ~ router.post ~ token", token)

      let mail = sendEmail(
        email,
        "Confirmez votre adresse email",
        `Salut ${
          firstname.charAt(0).toUpperCase() + firstname.slice(1)
        }, <br> Pour activer ton compte clique sur le lien : <br> <a href="http://localhost:3001/confirm?token=${token}">http://localhost:3001/confirm?token=${token}</a>`
      )
      console.log("mail sent")
      res.json({ token })
    }
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error })
  }
})

// router.get('/verify', async (req, res) => {
//     const token = req.headers.authorization.split(' ')[1];
//     try {
//         const { id } = verify(token);
//         const user = await prisma.user.findUnique({ where: { id, confirmed: true } });
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(401).json({ error: 'Invalid token' });
//         }
//     } catch (error) {
//         res.status(401).json({ error: 'Invalid token' });
//     }
// });

router.get("/confirm", async (req, res) => {
  const { token } = req.query
  try {
    const token = checkToken(token)

    if (token) {
      const { id, email, isConfirmed } = token

      prisma.user.findUnique({ where: { email: email } }).then((user) => {
        if (!user.isConfirmed)
          prisma.user
            .update({ where: { email: email }, data: { isConfirmed: true } })
            .then((user) => {
              if (user) {
                const Token = makeToken({
                  id: user.id,
                  email: user.email,
                  isConfirmed: true,
                })
                res.json({ Token })
                sendEmail(
                  user.email,
                  "Welcome to the app",
                  "Thank you for confirming your email"
                )
              }
            })
        else {
          return res.status(401).json("This account has already been confirmed")
        }
      })
    } else {
      res.status(401).json({ error: "Invalid token" })
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token bis" })
  }
})

router.patch("/reset-password", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  const { password } = req.body
  try {
    const { id, email, isConfirmed } = checkToken(token)
    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.update({
      where: { id },
      data: { password: hash },
    })
    if (user) {
      res.json(user)
    } else {
      res.status(401).json({ error: "Invalid token" })
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
})

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (user) {
    const token = makeToken({
      id: user.id,
      email: user.email,
      isConfirmed: user.isConfirmed,
    })
    // sendEmail(email,
    //     'Reset your password',
    //     'Please click on the following link to reset your password: http://localhost:3000/reset-password?token='
    //     + token) ;
    res.json({ token })
  } else {
    res.status(401).json({ error: "Invalid email" })
  }
})

module.exports = router
