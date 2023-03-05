export async function checkAuthetication(req,res, next){
    if(req.isAuthenticated())
    {
        return next()
    }
    else{
        res.redirect('/failed')
    }
}

export async function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated())
    {
        res.redirect('/')
    }
    else
    next()
}