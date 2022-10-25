<template>
  <body>
    <main>
      <section class="login">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <h1 class="text-center mb-4">Formify</h1>
              <div class="card card-default">
                <div class="card-body">
                  <h3 class="mb-3">Login</h3>

                  <form
                    action="manage-forms.html"
                    @submit.prevent="submitForm($event)"
                  >
                    <!-- s: input -->
                    <div class="form-group my-3">
                      <label for="email" class="mb-1 text-muted"
                        >Email Address</label
                      >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value=""
                        class="form-control"
                        autofocus
                      />
                    </div>

                    <!-- s: input -->
                    <div class="form-group my-3">
                      <label for="password" class="mb-1 text-muted"
                        >Password</label
                      >
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value=""
                        class="form-control"
                      />
                    </div>

                    <div class="mt-4">
                      <button type="submit" class="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</template>
<script>
import axios from "axios";
import { API_URL } from "@/constant";
export default {
  name: "Login",
  methods: {
    submitForm(e) {
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());
      axios
        .post(API_URL + "/auth/login", data)
        .then((res) => {
          localStorage.user = JSON.stringify(res.data.user);
          alert(res.data.message);
          this.$router.push({ name: "manageForm" });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
