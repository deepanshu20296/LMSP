	var DB = require('./db').DB;

	var User = DB.Model.extend({
	   tableName: 'tblUsers',

	   idAttribute: 'userId'
	});



	var UserData = DB.Model.extend({
		tableName: 'leave_data',
	
		//idAttribute: 'username'
	});



	module.exports = {
	   User: User,
	   UserData: UserData
	};
