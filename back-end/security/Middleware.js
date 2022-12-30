const { checkToken } = require('./jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) return res.sendStatus(401);
    
    const [type, token] = authorization.split(/\s+/);
    if (type !== "Bearer") return res.sendStatus(401);
    
    const user = checkToken(token);
    if (!user) return res.sendStatus(401);
    if (!user.isConfirmed) return res.sendStatus(401);

    prisma.user.findUnique({
        where: {
            id: user.id
        },
        include: {
            fkRooms: true
        }
    }).then((user) => {
        if (!user) return res.sendStatus(401);
        if (!user.isConfirmed) return res.sendStatus(401);
        req.user = user;
        console.log(token)
        next();
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    });

    // req.user = user; // {id: #, email: ######, isConfirmed: true}

}