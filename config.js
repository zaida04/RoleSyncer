require('dotenv').config();
let env_variables = ['token', 'role_name', 'main_server', 'children_server'];
let env_variables_object = {};
env_variables.forEach(x => {
	if(!process.env[x.toUpperCase()]) throw new Error(`Sorry, but ${x} is not present in the .env file.`);
	env_variables_object[x] = process.env[x.toUpperCase()]; 
});

env_variables_object['children_server'] = env_variables_object['children_server'].split(', ');
module.exports = env_variables_object;