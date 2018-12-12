import db from './../db'
import { createTextChangeRange } from 'typescript';

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
  }
}
