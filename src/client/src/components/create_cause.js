import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { serverurl } from "../App";
import SideBar from "./sidebar";


export default function CreateCause() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        community_name: "", 
        donation_needed: 0
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
        const newCause = { ...form };
        const response = await fetch(serverurl("/create_cause"), {
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
        setForm({
            name: "",
            description: "",
            community_name: "", 
            donation_needed: 0
          });
        navigate("/my-causes");
      }

    // This following section will display the table with the records of individuals.
    return (
        <div class="container row">
            <div class="col-4">
                <SideBar />
            </div>
            <div class="col-8">
                <br/>
                <h3>Create Cause</h3>
                <br/>
                <form class="needs-validation" novalidate onSubmit={onSubmit}>

                    <div class="col-12">
                        <label for="name" class="form-label">Cause Name</label>
                        <input type="text" class="form-control" id="name" placeholder="My Cause" 
                                    value={form.name}
                                    onChange={(e) => updateForm({ name: e.target.value })}/>
                    </div>

                    <br/>

                    <div class="col-12">
                        <label for="description" class="form-label">Cause Description</label>
                        <textarea type="text" class="form-control" id="description" placeholder="Details about the Cause" 
                                    value={form.description}
                                    onChange={(e) => updateForm({ description: e.target.value })}/>
                    </div>


                    <br/>

                    <div class="col-12">
                        <label for="community" class="form-label">Community Name</label>
                        <input type="text" class="form-control" id="community" placeholder="My Community" 
                                    value={form.community_name}
                                    onChange={(e) => updateForm({ community_name: e.target.value })}/>
                    </div>


                    <br/>

                    <div class="col-12">
                        <label for="donation" class="form-label">Donation Needed</label>
                        <input type="text" class="form-control" id="donation" placeholder="$" 
                                    value={form.donation_needed}
                                    onChange={(e) => updateForm({ donation_needed: e.target.value })}/>
                    </div>


                    <hr class="my-4" />

                    <button class="w-100 btn btn-primary btn-lg" type="submit">Create Cause</button>
                </form>
            </div>
        </div>
    );
}
