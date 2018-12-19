import db from './../db'
export default {
  add: async(req,res)=> {
    const {adminer} = req.body
    try{
      await db(req.body.category).insert({...adminer})
      res.json({success: true})
    }catch(error){
      res.json(error)
    }
  }
}
