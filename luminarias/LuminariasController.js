const express = require("express");
const router = express.Router();
const Luminaria = require("./Luminaria");

router.get("/luminaria", (req, res) => {
    Luminaria.findAll({
        order: [
            ['id', 'DESC']
        ],
    }).then(luminarias => {
        res.render("luminaria/index", { luminarias: luminarias });
    });
});

router.get("/luminaria/new", (req, res) => {
    res.render("luminaria/new");
});

//Rota de insert
router.post("/luminaria/save", (req, res) => {
    var estado = req.body.estado;
    var modelo = req.body.modelo;
    var qntd = req.body.qntd;
    var date = req.body.date;

    Luminaria.create({
        estado: estado,
        modelo: modelo,
        qntd: qntd,
        date: date
    }).then(() => {
        res.redirect("/luminaria");
    })
});

//rota de edicao
router.get("/luminaria/edit/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/luminaria");
    }

    Luminaria.findByPk(id).then(luminaria => {
        if (luminaria != undefined) {
            res.render("luminaria/edit", { luminaria: luminaria });
        } else {
            res.redirect("/luminaria");
        }
    }).catch(erro => {
        res.redirect("/luminaria");
    })
});


//Rota de update 
router.post("/luminaria/update", (req, res) => {
    var id = req.body.id;
    var estado = req.body.estado;
    var modelo = req.body.modelo;
    var qntd = req.body.qntd;
    var date = req.body.date;

    Luminaria.update({ estado: estado, modelo: modelo, qntd: qntd, date: date }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/luminaria")
    })

});

//Rota do delete
router.post("/luminaria/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Luminaria.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/luminaria");
            })
        } else { // se nao for um numero
            res.redirect("/luminaria")
        }
    } else { //se for null
        res.redirect("/luminaria")
    }
});

module.exports = router;