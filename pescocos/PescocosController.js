const express = require("express");
const router = express.Router();
const Pescoco = require("./Pescoco");

router.get("/pescoco", (req, res) => {

    Pescoco.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(pescocos => {
        res.render("pescoco/index", { pescocos: pescocos });
    })
});

router.get("/pescoco/new", (req, res) => {
    res.render("pescoco/new");
});

//Rota de insert 
router.post("/pescoco/save", (req, res) => {
    var estado = req.body.estado;
    var qntd = req.body.qntd;
    var date = req.body.date;

    Pescoco.create({
        estado: estado,
        qntd: qntd,
        date: date
    }).then(() => {
        res.redirect("/pescoco");
    });
});

//Rota do delete
router.post("/pescoco/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Pescoco.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/pescoco");
            })
        } else { // se nao for um numero
            res.redirect("/pescoco")
        }
    } else { //se for null
        res.redirect("/pescoco")
    }
});

//Rota de edicao
router.get("/pescoco/edit/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/pescoco");
    }

    Pescoco.findByPk(id).then(pescoco => {
        if (pescoco != undefined) {
            res.render("pescoco/edit", { pescoco: pescoco });
        } else {
            res.redirect("/pescoco");
        }
    }).catch(erro => {
        res.redirect("/pescoco");
    })
});

//Rota de update
router.post("/pescoco/update", (req, res) => {
    var id = req.body.id;
    var estado = req.body.estado;
    var qntd = req.body.qntd;
    var date = req.body.date;

    Pescoco.update({ estado: estado, qntd: qntd, date: date }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/pescoco")
    });
});

module.exports = router;