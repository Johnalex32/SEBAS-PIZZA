const mysql = require('mysql2'); 

const connection = mysql.createConnection({ 
    host: '127.0.0.1', // Reemplaza con tu host 
    user: 'root', // Reemplaza con tu usuario de MySQL 
    password: 'holaquehay32', // Reemplaza con tu contraseña de MySQL 
    database: 'SEBASPIZZA' // Reemplaza con tu base de datos 
    }); 
    
connection.connect((err) => { 
    if (err) { 
        console.error('Error conectando a la base de datos:', err.stack); 
        return; 
    } 
    console.log('Conexión exitosa a la base de datos.');
}); 

module.exports = connection;