app/controller/indexedDB.server.controller.js
exports.render = function(req,res) { 
    if (req.session.lastVisite){
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();

    res.render('index',{
        title: 'HELLO WORLD'
    });

};
