const { client } = require('../db');

// module.exports = class User {   
//     fetchAll(){
//          client.execute('SELECT * FROM persons')
//          .then(([rows,fieldData]) => {
//              console.log(rows); //giving the required data
//           })
//     }
//     }

module.exports = class User {
    fetchAll() {
        return (new Promise((resolve, reject) => {
            client.execute('SELECT * FROM persons')
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
        }))

    }
}