// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Routes, Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {

//     const { isAuthenticated, loading} = useSelector(state => state.user);
     

//     return (
//         <Routes>
//             {!loading && (
//                 <Route
//                     {...rest}
//                     render={props => {
//                         if (!isAuthenticated) {
//                             return <Navigate to='/login' />
//                         }
//                         return <Component {...props} />
//                     }}
//                 />
//             )
//             }
//         </Routes>
//     )
// }

// export default ProtectedRoute
