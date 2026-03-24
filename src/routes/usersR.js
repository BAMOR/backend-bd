const express = require('express')
const router = express.Router()
const db = require('../config/db')



router.get('/api/usuarios',(req,res)=>{

    const sql = 'SELECT * FROM usuarios'

    db.query(sql,(err, result)=>{
        if(err){
            return res.status(500).json({error: 'Error en la consulta a la BD'})
        }

        res.json({
            usuarios: result,
            total: result.length
        })
    })

})


router.get('/api/usuarios/:id',(req,res)=>{
    const id = req.params.id 
    const sql = 'SELECT * FROM usuarios WHERE id = ?'

    db.query(sql, [id], (err, result)=>{
        if(err){
            return res.status(500).json({error: 'Error en la consulta a la DB'})
        }
        if(result === 0){
            return res.status(404).json({error: 'usuario no encontrado'})
        }
        res.json(result[0])
    })
    
})



router.post('/api/usuarios',(req,res)=>{
    const {nombre,email,password,rol,estado} = req.body
    const sql = 'INSERT INTO usuarios (nombre,email,password,rol,estado) VALUES (?,?,?,?,?)'

    db.query(sql,[nombre,email,password,rol,estado],(err, result)=>{
        if(err){
            return res.status(500).json({error: 'Error en la consulta a la DB'})
        }
        res.status(201).json({
            success: true,
            message: 'usuario agregado correctamente',
            productId: result.productId
        })
    })

})


router.delete('/api/usuarios/:id',(req,res)=>{
    const id = req.params.id
    const sql = 'DELETE FROM usuarios WHERE id = ?'

    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(500).json({error: 'Error en la consulta DB'})
        }
        if(result === 0){
            return res.status(404).json('usuario no encontrado')
        }

        res.json({message: 'usuario eliminado correctamente'})
    })

})

module.exports = router