const express=require("express");
const bodyparser=require("body-parser");
const cors=require('cors');
const mysql=require('mysql2');

const app=express();


app.use(cors());
app.use(bodyparser.json());


app.listen(3000,()=>{
})

const db =mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database:'store',
    port:3306
})

db.connect(err=>{
    if(err) {console.log(err,'dberr');}
    console.log("connected..");
})
app.get('/product/:category/:limit/:sort',(req,res)=>{
    let limit=req.params.limit;
    let sort=req.params.sort;
    let category=req.params.category;
    let qry='select * from product where description = '+mysql.escape(category)+' '+ 'order by price '+sort+' limit '+parseInt(limit);

    db.query(qry,(err,result)=>{
        if(err){
            console.log(err,'db error');
        }
        if(result.length>0){
            res.send(
                result
            )
        }
    });
});
//get all proeucts
app.get("/product",(req,res)=>{
    let qry="select * from product";
    db.query(qry,(err,result)=>{
        if(err){console.log(err)}
        if(result.length>0){
            res.send(
                result
            )
        }
    })
})

//get products
app.get('/product/:limit/:sort',(req,res)=>{
    let limit=req.params.limit;
    let sort=req.params.sort;
    let qry='select * from product order by price '+sort+' limit '+parseInt(limit);

    db.query(qry,(err,result)=>{
        if(err){
            console.log(err,'db error');
        }
        if(result.length>0){
            res.send(
                result
            )
        }
    });
});
// get product by id
app.get('/product/:id',(req,res)=>{
    id=req.params.id;
    let qry='select * from product where id= '+id;
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0){
            res.send(
                result
            )
        }
    })
})
app.get('/products/categories',(req,res)=>{
    let qry='select description from product';
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err,'db error');
        }
        if(result.length>0){
            const arr=result.map((item)=>{
                return item["description"];
            })
            const arr1=[... new Set(arr)];
            res.send(
                arr1
            )
        }
    });
})
//add product
app.post('/product',(req,res)=>{
    console.log(req.body,'createdata');
    let title=req.body.title;
    let price=req.body.price;
    let category=req.body.category;
    let description=req.body.description;
    let image=req.body.image;
    let values=[title,price,category,description,image];
    let qr='insert into product(title,price,category,description,image) values (?,?,?,?,?)';
    db.query(qr,values,(err,result)=>{
        if(err){console.log(err);}
        if(result.length>0){
            res.send({
                message:"data inserted"
            });
        }else{
            res.send({
                message:'wrong..'
            })
        }
});
})
//updateproduct

app.put('/product/:id',(req,res)=>{
    console.log(req.body,'update');
    let id=parseInt(req.params.id);
    let title=req.body.title;
    let price=req.body.price;
    let category=req.body.category;
    let description=req.body.description;
    let image=req.body.image;
    let values=[title,price,category,description,image];
    let qr=`update product set title= '${title}' ,price= ${price} ,category= '${category}',description= '${description}' , image= '${image}' where id = ${id}`
    db.query(qr,(err,result)=>{
        if(err){console.log(err)}
        res.send({
            message:"data updated"
        })
    })
})

//delete product

app.delete('/product/:id',(req,res)=>{
    let id=req.params.id;
    let qr=`delete from product where id= ${id}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err)}
        res.send({
            message:'data deleted'
        })
    })
})
    




