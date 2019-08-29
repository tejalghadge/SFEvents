var  ManagementController= {};
const moment = require('moment');
const Promise = require('promise');
const ControllerUtility = require('./ControllerUtility');
const nodemailer = require("nodemailer");


function insertEventAttending(invitations, eventId) {
	let invitationsArray = invitations.split(',');
	for (let i in invitationsArray) {
		let pool = ControllerUtility.connectionPool;
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			connection.query("insert into event_invited (event_id, email) values(?, ?)", [eventId, invitationsArray[i]], function (err, result) {
				if (err) throw err;
				connection.destroy();
			});
		});
	}
}

/**
 * Inserts newly created event
 */
ManagementController.insert = function(req, res){
	var event = req.body;
	setEventParameters(event);
	var con = ControllerUtility.createConnection();
	con.connect(function (err) {
			if (err) throw err;
			const sql = "INSERT INTO events (title, description, location, start_time,end_time, is_public, is_over, price, max_attending, poster, invitations, isBlocked, isReported) VALUES " +
			"(?,?,?,?,?,?,?,?,?,?,?,?,?)";

				const valuesToInsert = [ControllerUtility.escapeChar(event.title), ControllerUtility.escapeChar(event.description), ControllerUtility.escapeChar(event.location),
				event.start_time, event.end_time, event.is_public,event.is_over, event.price, event.max_attending, event.poster, event.invitations,false,false];
				con.query(sql,valuesToInsert, function (err, result) {
				if (err) throw err;
				con.end();
				console.log("Record Inserted!!");
				res.send({insert: true});
				var hostName = 'user1'; //TODO logged in user integration is pending
				insertEventHost(hostName, event.invitations);
			});

		});
	},

	/**
	 * Update event based on eid
	 */
	ManagementController.updateEvent = function(req, res){
		var event = req.body;
		setEventParameters(event);
		var con = ControllerUtility.createConnection();
		let promise = new Promise((resolve, reject) => {
			con.connect(function (err) {
				if (err) throw err;

				var sql = "UPDATE events SET title = ?, description = ?, location = ?, start_time = ?,end_time = ?," +
					" is_public =?, is_over = ?, price = ?, max_attending = ?, poster = ?, invitations = ? WHERE eid = ?";
				con.query(sql, [event.title, event.description, event.location, event.start_time, event.end_time, event.is_public,
					event.is_over, event.price, event.max_attending, event.poster, event.invitations, event.eid], function (err, result) {
					if (err) throw err;
					con.end();
					console.log("UPDATED");
					resolve();
				});

			})
		}).then(function () {
			let promise1 = new Promise((resolve, reject) => {
				var con1 = ControllerUtility.createConnection();
				con1.connect(function (err) {
					if (err) throw err;
					con1.query("delete from event_invited where event_id = ?", [event.eid], function (err, result) {
						if (err) throw err;
						con1.end();
						console.log("DELETED");
						resolve();
					});
				});
			}).then(function () {
				let promise2 = new Promise((resolve, reject) => {
					insertEventAttending( event.invitations, event.eid);
					resolve();
				}).then(function () {
					console.log("INSERTED");
					res.send({insert: true});
				});
			});
		})
	},


	/**
	 * Insert entry in Event-Host table
	 */
	insertEventHost = function(hostName, invitations){
		var con = ControllerUtility.createConnection();
		var eventId = 1;
		con.connect(function (err) {
			if (err) throw err;

			var sql = "SELECT max(eid) FROM events";
			con.query(sql, function (err, result) {
				if (err) throw err;
				eventId = result[0]['max(eid)'];
				con.end();
			});
		});

		var userId;
		var promise = new Promise((resolve, reject) => {
			var con1 = ControllerUtility.createConnection();
			con1.connect(function (err) {
				if (err) throw err;
				var sql = " select user_id from registered where username = ?";
				con1.query(sql,[hostName], function (err, result) {
					if (err) throw err;
					userId = result[0]['user_id'];
					con1.end();
					resolve();
				});
			});
		}).then(function () {
			var con2 = ControllerUtility.createConnection();
			con2.connect(function (err) {
				if (err) throw err;
				var sql = "insert into event_host values(?, ?, ?, ?);";
				con2.query(sql,[eventId , userId,false,false], function (err, result) {
					if (err) throw err;
					con2.end();
				});
			});

		}).then(function () {
			insertEventAttending(invitations, eventId);

		});

	}

	ManagementController.book=((eid,name,email,host)=> {
		return new Promise(function (resolve, reject) {
			const connection = ControllerUtility.createConnection();
			connection.query("insert into event_invited (event_id, email,name) values(?, ?,?)", [eid, email, name], function (err, result) {

				if (err) {
					connection.destroy();
					reject(err)
				} else {
					connection.query("SELECT max(invited_id) as id from event_invited",(err,data)=>{
						if(!err){
							connection.query("SELECT * from events WHERE eid = ?",[eid],(err,memo)=>{
								if(err){
									connection.destroy();
									reject(err)
								}else {
									let result = JSON.parse(JSON.stringify(data));
									memo = memo[0]
									let path = 'http://'+host+'/api/updateInvitation?event_id='+eid + '&invited_id=' + result[0].id;
									let HelperOptions = {
										from: '"SFEVENTS" <sfevents848@gmail.com',
										to: email,
										subject: 'Invitation',
										html:

											"<div style='height: 800px;color: navy; text-align: center;'>" +
											" <img src='cid:banner1' style='height: 100px; width: 50%'>" +
											" <div style='margin-top: 100px'> " +
											"<h2>Event Name : " + memo.title + "</h2>" +
											"<h2>Description :" + memo.description + "</h2>" +
											"<h2>Start On : " +moment(memo.start_time).format('MM/DD/YYYY hh:mm a') + "</h2>" +
											"<h2>End On : " +moment(memo.end_time).format('MM/DD/YYYY hh:mm a') + "</h2>" +
											"<h2>Maximum Attending: " + memo.max_attending + "</h2>" +
											"<h2>Price :" + memo.price + "</h2>" +
											"<h2>Location :" + memo.location + "</h2>" +
											"<a href=" + path + "  target='abc'><h1 style='color: orangered; font-weight: bold'>RSVP</h1></a><br/>" +
											" <img src='cid:banner2' style='height: 100px; margin-top: 30px;width: 50%;'>" +
											"</div>"+
											"</div>",
										attachments: [{
											filename: 'banner1.png',
											path: './public/images/banner1.png',
											cid: 'banner1' //my mistake was putting "cid:logo@cid" here!
										},{
											filename: 'banner2.png',
											path: './public/images/banner2.png',
											cid: 'banner2' //my mistake was putting "cid:logo@cid" here!
										}]
									};
									ControllerUtility.sendInvitations(HelperOptions,()=>{
										resolve()
									})


								}
							})
						}
					})


				}


			})
		})
	})

	ManagementController.selectEventsByUser = function(req, res){
		const con = ControllerUtility.createConnection();
		const hostId = req.query.user_id;
		con.connect(function (err) {
			if (err) throw err;
			var sql = "select events.eid,events.title from events, event_host  where event_host.event_id = events.eid AND event_host.host_id = ?";
			con.query(sql,[hostId], function (err, result) {
				if (err) throw err;
				con.end();
				res.send(result);
			});
			}
		)}


	/**
	 * Fetch event based on event id
	 * @param req
	 * @param res
	 */
	ManagementController.fetchEvent = function(req, res){
		var con = ControllerUtility.createConnection();
		con.connect(function (err) {
				if (err) throw err;
				var sql = "select * from events where eid =  ?";
				con.query(sql,[req.query.eventID], function (err, result) {
					if (err) throw err;
					con.end();
					res.send(result);
				});
			}
	)}
/**
 * Fetch event based on event id
 * @param req
 * @param res
 */
ManagementController.randomEvent = function(req, res){
	var con = ControllerUtility.createConnection();
	con.connect(function (err) {
			if (err) throw err;
			var sql = "SELECT poster,eid,title,start_time ,end_time,location FROM events WHERE poster IS NOT NULL ORDER BY RAND() LIMIT 4";
			con.query(sql, function (err, result) {
				if (err) throw err;
				con.end();
				res.send(result);
			});
		}
	)}


	/**
	 *  This method uploads the event poster on server under images folder with timestamp
	 *  to avoid overwrite of image with same name.
	 * @param req
	 * @param res
	 */
	ManagementController.upload = function(req, res){
			let uploadedFile = req.files.file;
			let filePath = '/images/'+Date.now()+"_"+uploadedFile.name;
			uploadedFile.mv('public'+filePath, function(err) {
				if (err)
					return res.status(500).send(err);

				res.send(filePath);
			});
	}

	/**
	 * This method creates HelperOptions require for sending invitation and send invitation to all mailList addresses
	 * @param req
	 * @param res
	 */
	ManagementController.sendMail = function(req, res){

		const memo = req.body;

		let event_invited;
		var promise = new Promise((resolve, reject) => {
				var con = ControllerUtility.createConnection();
				con.connect(function (err) {
					if (err) throw err;
					var sql = "select * from event_invited where event_id =  ?";
					con.query(sql, [memo.eid], function (err, result) {
						if (err) throw err;
						con.end();
						event_invited = JSON.parse(JSON.stringify(result));
						console.log("INVITATIONSSS", event_invited);
						resolve();
					});
				})
			}
		).then(function () {

			for (let i in event_invited) {
					let startDate = moment(memo.start_time).format('MM/DD/YYYY HH:mm');
					let endDate = moment(memo.end_time).format('MM/DD/YYYY HH:mm');
					let path = 'http://'+req.headers.host+'/api/updateInvitation?event_id=' + event_invited[i].event_id + '&invited_id=' + event_invited[i].invited_id;
					let HelperOptions = {
						from: '"SFEVENTS" <sfevents848@gmail.com',
						to: event_invited[i].email,
						subject: 'Invitation',
						html:

							"<div style='height: 800px;color: navy; text-align: center;'>" +
							" <img src='cid:banner1' style='height: 100px; width: 50%'>" +
							" <div style='margin-top: 100px'> " +
							"<h2>Event Name : " + memo.title + "</h2>" +
							"<h2>Description :" + memo.description + "</h2>" +
							"<h2>Start On : " +startDate + "</h2>" +
							"<h2>End On : " +endDate + "</h2>" +
							"<h2>Maximum Attending: " + memo.max_attending + "</h2>" +
							"<h2>Price :" + memo.price + "</h2>" +
							"<h2>Location :" + memo.location + "</h2>" +
							"<a href=" + path + "  target='abc'><h1 style='color: orangered; font-weight: bold'>RSVP</h1></a><br/>" +
							" <img src='cid:banner2' style='height: 100px; margin-top: 30px;width: 50%;'>" +
							"</div>"+
							"</div>",
						attachments: [{
							filename: 'banner1.png',
							path: './public/images/banner1.png',
							cid: 'banner1' //my mistake was putting "cid:logo@cid" here!
						},{
							filename: 'banner2.png',
							path: './public/images/banner2.png',
							cid: 'banner2' //my mistake was putting "cid:logo@cid" here!
						}]
					};
					ControllerUtility.sendInvitations(HelperOptions);
				}
				res.send("Invitations sent successfully");
			}

		)}

	/**
	 * Fetch event based on event id
	 * @param req
	 * @param res
	 */
	ManagementController.updateInvitation = function(req, res){
		let con = ControllerUtility.createConnection();
		;
		req.query.invited_id;
		con.connect(function (err) {
				if (err) throw err;
				var sql = "update  event_invited set isAttending = ? where event_id = ? and invited_id = ?";
				con.query(sql,[true, parseInt(req.query.event_id), parseInt(req.query.invited_id)], function (err, result) {
					if (err) throw err;
					con.end();
					res.send("Thank you for accepting the invitation!!");
				});
			}
		)}



	ManagementController.fetchEventAttending = function(req, res){
		var con = ControllerUtility.createConnection();
		con.connect(function (err) {
			if (err) throw err;
			var sql = "select * from event_invited where event_id =  ?";
			con.query(sql, [req.query.eid], function (err, result) {
				if (err) throw err;
				con.end();
				res.send(result);
			});
		})
	}

	/**
	 * Set events parameter
	 * @param event
	 */
	function setEventParameters(event) {
		if (event.is_public) {
			event.is_public = true
		} else {
			event.is_public = false
		}
		event.start_time = moment(event.date_time[0]).format('YYYY-MM-DD HH:mm:ss');
		event.end_time = moment(event.date_time[1]).format('YYYY-MM-DD HH:mm:ss');
		event.is_over = true;

		if ((new Date(event.date_time[0]).getTime()) > (new Date().getTime())) {
			event.is_over = false;
		}

		console.log("*******EVENT POSTER", event.poster);
		if (!event.poster) {
			event.poster = null;
		}
}
ManagementController.deleteEvent=(req,res)=>{
		const {id} = req.params
	var event = req.body;
	var con = ControllerUtility.createConnection();
	con.query('SET FOREIGN_KEY_CHECKS=0')
	con.connect(function (err) {

		var sql ="DELETE FROM events where eid = ? ";
		con.query(sql,[id], function (err, result) {
			con.query('SET FOREIGN_KEY_CHECKS=1')
			if (err) {
				console.log(err)
				res.status(500).end();
			}else {
				con.end();
				console.log("Record deleted!!");
				res.send({deleted: true});
			}

		});

	});
}


module.exports = ManagementController;