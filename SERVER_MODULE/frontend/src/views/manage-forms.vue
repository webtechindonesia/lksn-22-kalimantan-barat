<template>
  <body>
    <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'manageForm' }"
          >Formify</router-link
        >
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
          <router-link :to="{ name: 'createForm' }" class="btn btn-primary"
            >Create Form</router-link
          >
          <!-- <a href="create-form.html" class="btn btn-primary"> Create Form </a> -->
        </div>
      </div>

      <div class="list-form py-5">
        <div class="container">
          <h6 class="mb-3">List Form</h6>

          <router-link
            :to="{ name: 'detailForm', params: { id: form.id } }"
            class="card card-default mb-3"
            v-for="(form, i) in forms"
            :key="i"
          >
            <div class="card-body">
              <h5 class="mb-1">{{ form.name }}</h5>
              <small class="text-muted"
                >@{{ form.slug }}
                {{
                  form.limit_one_response ? "(limit for 1 response)" : ""
                }}</small
              >
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </body>
</template>
<script>
import { API_URL } from "@/constant";
import axios from "axios";

export default {
  name: "ManageForm",
  data() {
    return {
      forms: null,
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.token;
    axios
      .get(API_URL + "/forms")
      .then((res) => {
        this.forms = res.data.forms;
      })
      .catch((err) => {});
  },
};
</script>
