<template>
  <body v-if="form">
    <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="manage-forms.html">Formify</a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" href="#">Administrator</a>
          </li>
          <li class="nav-item">
            <button
              type="button"
              @click="logout()"
              class="btn bg-white text-primary ms-4"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <main>
      <div class="hero py-5 bg-light">
        <div class="container text-center">
          <h2 class="mb-2">{{ form.name }}</h2>
          <div class="text-muted mb-4">{{ form.description }}</div>
          <div>
            <div>
              <small>For user domains</small>
            </div>
            <small
              ><span class="text-primary"
                ><span v-for="(a_domain, i) in form.allowed_domains" :key="i">{{
                  a_domain.domain + ", "
                }}</span></span
              ></small
            >
          </div>
        </div>
      </div>

      <div class="py-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <div class="input-group mb-5">
                <input
                  type="text"
                  class="form-control form-link"
                  readonly
                  :value="url"
                />
                <a href="submit-form.html" class="btn btn-primary">Copy</a>
              </div>

              <ul class="nav nav-tabs mb-2 justify-content-center">
                <li class="nav-item">
                  <router-link
                    class="nav-link"
                    :to="{
                      name: 'detailForm',
                      query: { slug: this.$route.query.slug },
                    }"
                    >Questions</router-link
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="#">Responses</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-lg-10">
              <table class="table mt-3">
                <caption>
                  Total Responses:
                  {{responses}}
                </caption>
                <thead>
                  <tr class="text-muted">
                    <th v-for="question in questions" :key="question.id">
                      {{ question.name }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="response in responses" :key="response.id">
                    <td class="text-primary">{{ response.user.email }}</td>
                    <td v-for="answer in response.answers" :key="answer.id">
                      {{ answer.value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>
<script>
import axios from "axios";
import { API_URL } from "@/constant";
export default {
  name: "Responses",
  data() {
    return {
      url: location.origin + `/forms/${this.$route.query.slug}`,
      slug: this.$route.query.slug,
      form: null,
      questions: null,
      responses: null,
    };
  },
  created() {
    const slug = this.$route.query.slug;
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.token;

    axios.get(API_URL + "/forms/" + slug).then((res) => {
      this.form = res.data.form;
      this.questions = res.data.form.questions;
    });
  },
};
</script>
