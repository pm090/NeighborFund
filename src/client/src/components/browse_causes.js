import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serverurl } from "../App";
import SideBar from "./sidebar";



export default function BrowseCauses() {
    const Cause = (props) => (
        <div class="row row-cols-1">
            <div class="col">
                <form class="needs-validation" novalidate onSubmit={onSubmit}>

                    <div class="card mb-8 rounded-3 shadow-sm">
                        <div class="card-header py-3">
                            <h4 class="my-0 fw-normal text-center">{props.cause.name}</h4>
                        </div>
                        <div class="card-body">
                            <br />
                            <div class="col-8">
                                <label for="description" class="form-label">Cause Description</label>
                                <textarea type="text" class="form-control" id="description" value={props.cause.description} disabled />
                            </div>
                            <br />
                            <div class="col-8">
                                <label for="community" class="form-label">Community Name</label>
                                <input type="text" class="form-control" id="community" value={props.cause.community_name} disabled />
                            </div>
                            <br />

                            <label for="donationbar" class="form-label">Donation Received: ${props.cause.donation_received} of ${props.cause.donation_needed}</label>
                            <div id="donationbar" class="progress" style={{ height: "30px" }} role="progressbar" aria-label="Example with label" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar bg-success" style={{ width: Math.round(props.cause.donation_received / props.cause.donation_needed * 100) + '%' }}></div>
                            </div>
                            <br />

                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="$" id={props.cause._id} />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary" type="submit">Donate!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );

    const [causes, setCauses] = useState([]);
    // This method fetches the records from the database.
    async function getCauses() {
        const response = await fetch(serverurl("/browse_causes"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        const causesList = await response.json();

        setCauses(causesList);
    }
    useEffect(() => {

        getCauses();
        return;
    }, [causes.length]);
    // This method will map out the records on the table
    function causeList() {
        return causes.map((cause) => {
            return (
                <Cause
                    cause={cause}
                />
            );
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        console.log(e);
        // When a post request is sent to the create url, we'll add a new record to the database.
        const causeId = e.target[2].id;
        const newCause = { ...causes.filter(cause => cause._id == causeId)[0] };
        newCause['new_donation'] = parseInt(e.target[2].value);
        newCause['account_id'] = localStorage.getItem("account_id");
        const response = await fetch(serverurl("/donate"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCause),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        getCauses();
    }
    // This following section will display the table with the records of individuals.
    return (
        <div class="container row">
            <div class="col-4">
                <SideBar />
            </div>
            <div class="col-8">
                <br></br>
                <h3>All Causes</h3>
                <br></br>
                {causeList()}
                <br></br>
            </div>
        </div>
    );
}
