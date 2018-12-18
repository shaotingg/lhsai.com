import db from './../db'

export default {
  all: async(req,res)=> {
    const pageSize = 12
    const css = await db.select('*').from('css').limit(pageSize).offset(pageSize*(req.params.pagenum-1)).orderBy('date', 'desc')
    const count = await db('css').count('* as pageCount')
    const {pageCount} = count[0]
    res.json({css, pageCount: Math.ceil(pageCount/pageSize)})
  },
  add: async(req,res)=> {
    const {css} = req.body
    try{
      await db('css').insert({...css})
      res.json({success: true})
    }catch(error){
      res.json(error)
    }
  },
  get: async(req,res)=> {
    const css = await db('css').where('id', req.params.id)
    res.json(css)
  },
  update: async(req,res)=> {
    const {css} = req.body
    try{
      await db('css').where('id', css.id).update({...css})
      res.json({success: true})
    }catch(error){
      res.json(error)
    }
  },
  delete: async(req,res)=> {
    const ids = req.params.id
    const arr = ids.split(',')
    try{
      await db('css').whereIn('id', arr).del()
      res.json({success: true})
    }catch(error){
      res.json(error)
    }
  }
}
