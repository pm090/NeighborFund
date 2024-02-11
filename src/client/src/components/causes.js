import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serverurl } from "../App";
import SideBar from "./sidebar";


const Cause = (props) => (
    <div class="row row-cols-1">
        <div class="col">
            <div class="card mb-8 rounded-3 shadow-sm">
                <div class="card-header py-3">
                    <h4 class="my-0 fw-normal text-center">{props.cause.name}</h4>
                </div>
                <div class="card-body">
                    <div class="col-8">
                        <label for="status" class="form-label">Status</label>
                        <input type="text" class="form-control" id="status" value={props.cause.status} disabled/>
                    </div>
                    <br />
                    <div class="col-8">
                        <label for="description" class="form-label">Cause Description</label>
                        <textarea type="text" class="form-control" id="description" value={props.cause.description} disabled/>
                    </div>
                    <br />
                    <div class="col-8">
                        <label for="community" class="form-label">Community Name</label>
                        <input type="text" class="form-control" id="community" value={props.cause.community_name} disabled />
                    </div>
                    <br />

                    <label for="donationbar" class="form-label">Donation Received: ${props.cause.donation_received} of ${props.cause.donation_needed}</label>
                    <div id="donationbar" class="progress" style={{height: "30px"}} role="progressbar" aria-label="Example with label" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar bg-success" style={{ width: Math.round(props.cause.donation_received / props.cause.donation_needed * 100) + '%' }}></div>
                        <span></span>
                    </div>
                    <br />

                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Withdraw Amount</button>
                </div>
            </div>
        </div>

    </div>
);

export default function CauseList() {
    const [causes, setCauses] = useState([]);
    // This method fetches the records from the database.
    useEffect(() => {
        async function getCauses() {
            const account_id = localStorage.getItem("account_id");
            const req = {
                "account_id": account_id
            };
            const response = await fetch(serverurl("/my_causes"), {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(req),
              })
                .catch(error => {
                  window.alert(error);
                  return;
                });
            const causesList = await response.json();

            setCauses(causesList);
        }
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
    // This following section will display the table with the records of individuals.
    return (
        <div class="container row">
            <div class="col-4">
                <SideBar />
            </div>
            <div class="col-8">
                <br></br>
                <h3>My Causes</h3>
                <br></br>
                {causeList()}
                <br></br>
            </div>
        </div>
    );
}
