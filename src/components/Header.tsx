import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModule from "../modules/auth";
function Header(props: any): JSX.Element {
     const [user, setUser] = useState<{ username: string, _id: string, password: string }>({ username: '', _id: '', password: '' }
     );
     const [isLogin, setIsLogin] = useState<boolean>(false);
     useEffect(() => {
          AuthModule.PROFILE()
               .then((res) => {
                    if (!res.username || !res._id)
                         return;
                    setIsLogin(true);
                    setUser({ ...user, username: res.username, _id: res._id });
               })
               .catch((err) => {
                    alert(err);
               });
     }, []);
     return (
          <div className="bg-black text-light fixed-top p-2 mb-5">
               <nav className="d-flex flex-row  justify-content-between px-3">
                    <h1 className="display-3 "> Intelligentsia </h1>
                    <ul className="nav w-50 d-flex flex-row justify-content-between align-items-center">
                         <li className="nav-item">
                              <Link className="h2 text-decoration-none " to="/"> Home </Link>
                         </li>
                         <li className="nav-item">
                              <Link className="h2 text-decoration-none" to="/explore"> Explore </Link>
                         </li>
                         <li className="nav-item">
                              {(isLogin) ? (
                                   <Link className="h2 text-decoration-none" to={`/user/${user._id}`}> Profile </Link>
                              ) : (
                                   <Link className="h2 text-decoration-none" to="/user"> SignUp </Link>
                              )}
                         </li>
                         <li className="nav-item">
                              {(isLogin) ? (
                                   <button className="h2 text-light bg-black pt-2" type="button" onClick={async (e) => { e.preventDefault(); await AuthModule.LOGOUT(); setIsLogin(false); }}> Logout </button>
                              ) : (

                                   <div className="dropdown">
                                        <button className="h2 text-light bg-black pt-2 px-4 dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false"> Login </button>
                                        <form className="dropdown-menu p-3 bg-dark text-bg-dark min-vw-25">
                                             <div className="mb-3 input-group">
                                                  <input type="text" className="form-control" onChange={(e) => { setUser({ ...user, username: e.target.value }) }} value={user.username} name="username" placeholder="username" />
                                             </div>
                                             <div className="mb-3 input-group">
                                                  <input type="password" className="form-control" name="password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} value={user.password} placeholder="password" />
                                             </div>
                                             <button type="button" onClick={async (e) => { e.preventDefault(); await AuthModule.LOGIN(user.username, user.password); setIsLogin(true); }} className="btn btn-primary">Log in</button>
                                        </form>
                                   </div>
                              )}
                         </li>
                         <li className="nav-item">
                              <a className="h2 text-decoration-none" href="https://github.com/sohamviradiya/"> Source Code </a>
                         </li>
                    </ul>
               </nav>
          </div>
     );
}


export default Header;
