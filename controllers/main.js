const login = async (req,res) => {
    res.send('login/register/signup route')
}

const dashboard = async (req,res) => {
    const luckyNumber =  Math.floor(Math.random()*100)
    res.status(200).json({msg : `Hello , Sahit`,secret : `Here is your authourized data, your lucky number is ${luckyNumber} `})
}

module.exports = {
    login , dashboard
}