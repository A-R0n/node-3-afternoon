// module.exports = {
//     someFunction: (req, res, next) => {
//         if(!req.session.user){
//             req.session.user = {
//                 username: '',
//                 cart: [],
//                 total: 0.00
//             }
//         } 
//         next();
//     }
// }

module.exports = function( req, res, next ) {
    const { session } = req;
  
    if ( !session.user ) {
      session.user = { username: '', cart: [], total: 0.00 };
    } 
    
    next();
  };