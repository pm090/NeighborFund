// We import bootstrap to make our application look better.
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { serverurl } from "../App";

import "bootstrap/dist/css/bootstrap.css";
import "../index.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
// Here, we display our Navbar

export default function Landing() {
    const [form, setForm] = useState({
        account_id: "",
        password: ""
    });
    const navigate = useNavigate();
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        setForm({ account_id: "", password: "" });
        localStorage.setItem("account_id", form.account_id);
        navigate(`/my-causes`);
    }
    return (
        <main>
            <div class="container col-xl-10 col-xxl-8 px-4 py-5">
                <div class="row align-items-center g-lg-5 py-5">
                    <div class="col-lg-7 text-center text-lg-start">

                        <div><img id="logo-landing" src="https://res.cloudinary.com/dqjwemqiw/image/upload/f_auto,q_auto/sr3dbnmwllvof3vfwkqf" alt="NeighborFund"></img></div>

                        <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">Fund Your Neighboorhood</h1>
                        <p class="col-lg-10 fs-4">Collaborate with your neighbors. Donate to local causes.</p>
                    </div>
                    <div class="col-md-10 mx-auto col-lg-5">
                        <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={onSubmit}>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={form.account_id} onChange={(e) => updateForm({ account_id: e.target.value })} />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div class="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                </label>
                            </div>
                            <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                            <small class="text-body-secondary">By clicking Login, you agree to the terms of use.</small>
                            <hr class="my-4" />
                            <button class="w-100 btn btn-lg btn-secondary" type="submit">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="b-example-divider"></div>

            <div class="text-secondary px-4 py-5 text-center">
                <div class="py-5">
                    <div class="col-lg-6 mx-auto">
                        <p class="fs-5 mb-4">Powered By: Capital One</p>
                    </div>
                </div>
            </div>

            <div class="b-example-divider mb-0"></div>

        </main>

    );
}
