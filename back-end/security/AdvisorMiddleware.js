const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (req, res, next) => {
    try {
        const { user } = req;

        if (user.role == 'ADVISOR')
            next();
        else
            return res.status(403).json({ error: 'Forbidden: User not ADVISOR' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}