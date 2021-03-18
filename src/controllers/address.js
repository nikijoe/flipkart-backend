const UserAddress =require('../models/address')

// field within "address._id" within array
//$set for update in an array & $push to add a new record or 
// push into an existing array. in $set if "address.$" means the found array 
//element to update When parameters new used will return new
// updated array else old data and upsert means if not existing
// create new record. 
exports.addAddress = (req, res) => {
    const {payload } = req.body
    if(payload.address){
        if(payload.address._id){
            UserAddress.findOneAndUpdate(
                {user: req.user._id, "address._id": payload.address._id},
                {
                    $set: {
                        "address.$": payload.address
                    }
                }
            ).exec((error, address) => {
                if(error) return res,status(400).json({error})
                if(address) res.status(201).json({address})
            })
        } else{
            UserAddress.findOneAndUpdate({user: req.user._id}, {
                $push: {
                    address: payload.address
                }           
            }, {new:true, upsert: true})
            .exec((error, address)=>{
                if(error) return res.status(400).json({error})
                if(address){
                    res.status(201).json({address})
                }
            })
        }
    }else {
        res.status(400).json({error: 'Params address required'})
    }
}

exports.getAddress = (req, res) => {
    UserAddress.findOne({user: req.user._id})
    .exec((error, userAddress) => {
        if(error) return res.status(400).json({error})
        if(userAddress){
            res.status(200).json({userAddress})
        }
    })
}