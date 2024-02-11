import React from "react";
// We import bootstrap to make our application look better.

import "bootstrap/dist/css/bootstrap.css";
import "../index.css";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
// Here, we display our Navbar

export default function SideBar() {

    return (
        <div class="d-flex flex-nowrap">
            <div class="flex-shrink-0 p-3" style={{ width: 200 }}>
                <NavLink className="navbar-brand" to="/">

                    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">

                        <div><img id="logo-sidebar" src="https://res.cloudinary.com/dqjwemqiw/image/upload/f_auto,q_auto/sr3dbnmwllvof3vfwkqf" alt="NeighborFund"></img></div>
                    </a>
                </NavLink>
                <ul class="list-unstyled ps-0">
                    <li class="mb-1">
                        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                            Causes
                        </button>
                        <div class="collapse show" id="home-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <NavLink className="nav-link" to="/my-causes">
                                        My Causes
                                    </NavLink>
                                </li>                                
                                <li>
                                    <NavLink className="nav-link" to="/browse-causes">
                                        Browse Causes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link" to="/create-cause">
                                        Create Cause
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true">
                            Communities
                        </button>
                        <div class="collapse show" id="dashboard-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Create Community</a></li>
                                <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Manage Communities</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true">
                            Account
                        </button>
                        <div class="collapse show" id="dashboard-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
                                <li>
                                    <NavLink className="nav-link" to="/">
                                        Logout
                                    </NavLink>
                                </li>                              
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
