
var ManagementController = require('../controllers/ManagementController.js');

module.exports = function(app) {


    /**
     * route for insert event
     */
    app.post('/api/insertEvent', function (req, res) {

       ManagementController.insert(req, res);
    });

    /**
     * route for insert event
     */
    app.post('/api/book/:eid', function (req, res) {

        ManagementController.book(req.params.eid,req.body.name,req.body.email,req.headers.host).then((data)=>{
            res.send({booked:true})
        }).catch((err)=>{
            console.log(err)
            res.status(500).end()
        });
    });
    /**
     * route for fetch event
     */
    app.get('/api/fetchEvent',  function (req, res) {
        ManagementController.fetchEvent(req, res);
    });

    /**
     * route for random event
     */
    app.get('/api/random/events',  function (req, res) {
        ManagementController.randomEvent(req, res);
    });


    /**
     * route for update event
     */
    app.post('/api/updateEvent',  function (req, res) {
        ManagementController.updateEvent(req, res);
    });

    /**
     * route for upload event poster
     */
    app.post('/api/poster',  function (req, res) {
        ManagementController.upload(req, res);

    });

    /**
     * route for select event by user
     */
    app.get('/api/selectEventsByUser',  function (req, res) {
        ManagementController.selectEventsByUser(req, res);
    });


    /**
     * route for send mail of invitations
     */
    app.post('/api/sendMail',  function (req, res) {
        ManagementController.sendMail(req, res);
    });

    /**
     * route for send mail of invitations
     */
    app.get('/api/updateInvitation',  function (req, res) {
        ManagementController.updateInvitation(req, res);
    });


    /**
     * route for send mail of invitations
     */
    app.get('/api/fetchEventAttending',  function (req, res) {
        ManagementController.fetchEventAttending(req, res);
    });

    /**
     * route for send mail of invitations
     */
    app.delete('/api/event/:id',  function (req, res) {
        ManagementController.deleteEvent(req, res);
    });

}