const z = require("zod");

function validate(req, res, next){
    const requiredInput = z.object({
        username: z.string().min(4).max(12),
        email: z.email(),
        password: z.string().min(8).max(16)
    });
    const check = requiredInput.safeParse(req.body);
    if(check.success) next();
    else{
        res.status(400).json({
            msg: JSON.parse(check.error.message)[0].message,
            check: false
        });
    }
}

module.exports = validate;