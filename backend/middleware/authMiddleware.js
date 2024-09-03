const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: '토큰이 없습니다. 인증이 거부되었습니다.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
        req.user = { userId: decoded.userId }; // userId가 제대로 설정되었는지 확인
        next();
    } catch (err) {
        res.status(401).json({ msg: '토큰이 유효하지 않습니다.' });
    }
};

module.exports = authMiddleware;
