<template>
  <body>
    <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="manage-forms.html">Formify</a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" href="#">Administrator</a>
          </li>
          <li class="nav-item">
            <a @click="logout" class="btn bg-white text-primary ms-4">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <main>
      <div class="hero py-5 bg-light">
        <div class="container">
          <h2>Create Form</h2>
        </div>
      </div>

      <div class="py-5">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-4">
              <form @submit.prevent="submitForm($event)">
                <!-- s: input -->
                <div class="form-group mb-3">
                  <label for="name" class="mb-1 text-muted"
                    >Form Name <span class="required_field">*</span></label
                  >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="form-control"
                    autofocus
                    required
                  />
                </div>

                <!-- s: input -->
                <div class="form-group my-3">
                  <label for="slug" class="mb-1 text-muted"
                    >Form Slug <span class="required_field">*</span></label
                  >
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    class="form-control"
                    required
                  />
                </div>

                <!-- s: input -->
                <div class="form-group my-3">
                  <label for="description" class="mb-1 text-muted"
                    >Description</label
                  >
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    class="form-control"
                  ></textarea>
                </div>

                <!-- s: input -->
                <div class="form-group my-3">
                  <label for="allowed-domains" class="mb-1 text-muted"
                    >Allowed Domains</label
                  >
                  <input
                    type="text"
                    id="allowed-domains"
                    name="allowed_domains"
                    class="form-control"
                  />
                  <div class="form-text">
                    Separate domains using comma ",". Ignore for public access.
                  </div>
                </div>

                <!-- s: input -->
                <div class="form-check form-switch" aria-colspan="my-3">
                  <input
                    type="checkbox"
                    id="limit_one_response"
                    name="limit_one_response"
                    class="form-check-input"
                    role="switch"
                  />
                  <label class="form-check-label" for="limit_one_response"
                    >Limit to 1 response</label
                  >
                </div>

                <div class="mt-4">
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>
<script>
import { API_URL } from "@/constant";
import axios from "axios";

export default {
  name: "CreateForm",
  methods: {
    submitForm(e) {
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.token;
        data.allowed_domains.split(",")
      let temp = data.allowed_domains ?? []
      data.allowed_domains = temp.split(',')

      data.limit_one_response = data.limit_one_response == "on" ?? false 

      axios
        .post(API_URL + "/forms", data)
        .then((res) => {
          alert(res.data.message);
          this.$router.push({ name: "manageForm" });
        })
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err.response);
        });
    },
  },
};
</script>
<style>
.required_field {
  color: red;
}
</style>
