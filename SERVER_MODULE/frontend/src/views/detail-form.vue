<template>
  <body v-if="form">
    <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'manageForm' }"
          >Formify</router-link
        >
        <!-- <a class="navbar-brand" href="manage-forms.html">Formify</a> -->
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
                  <a class="nav-link active" href="#">Questions</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Responses</a>
                </li>
              </ul>
            </div>
          </div>

          <!--  -->

          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <div
                class="question-item card card-default my-4"
                v-for="question in questions"
                :key="question.id"
              >
                <div class="card-body">
                  <div class="form-group my-3">
                    <input
                      type="text"
                      placeholder="Question"
                      class="form-control"
                      name="name"
                      :value="question.name"
                      disabled
                    />
                  </div>

                  <div class="form-group my-3">
                    <select
                      name="choice_type"
                      style="text-transform: capitalize"
                      class="form-select"
                      disabled
                    >
                      <option>{{ question.choice_type }}</option>
                    </select>
                  </div>
                  <div class="form-group my-3" v-if="question.choices">
                    <textarea
                      placeholder="Choices"
                      class="form-control"
                      name="choices"
                      rows="4"
                      disabled
                      >{{ question.choices }}</textarea
                    >
                    <div class="form-text">
                      Separate choices using comma ",".
                    </div>
                  </div>
                  <div class="form-check form-switch" aria-colspan="my-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="required"
                      checked
                      disabled
                    />
                    <label class="form-check-label" for="required"
                      >Required</label
                    >
                  </div>
                  <div class="mt-3">
                    <button
                      @click="remove(question.id)"
                      type="submit"
                      class="btn btn-outline-danger"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div class="question-item card card-default my-4">
                <div class="card-body">
                  <form @submit.prevent="submitForm($event)">
                    <div class="form-group my-3">
                      <input
                        type="text"
                        placeholder="Question"
                        class="form-control"
                        name="name"
                        v-model="data.name"
                      />
                    </div>

                    <div class="form-group my-3">
                      <select
                        name="choice_type"
                        class="form-select"
                        v-model="data.choice_type"
                      >
                        <option selected disabled>Choice Type</option>
                        <option value="short answer">Short Answer</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="date">Date</option>
                        <option value="multiple choice">Multiple Choice</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="checkboxes">Checkboxes</option>
                      </select>
                    </div>
                    <div
                      class="form-group my-3"
                      v-if="
                        data.choice_type == 'multiple choice' ||
                        data.choice_type == 'checkboxes' ||
                        data.choice_type == 'dropdown'
                      "
                    >
                      <textarea
                        placeholder="Choices"
                        class="form-control"
                        name="choices"
                        rows="4"
                        v-model="data.choices"
                      ></textarea>
                      <div class="form-text">
                        Separate choices using comma ",".
                      </div>
                    </div>
                    <div class="form-check form-switch" aria-colspan="my-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="required"
                        @click="toggle($event)"
                      />
                      <label class="form-check-label" for="required"
                        >Required</label
                      >
                    </div>
                    <div class="mt-3">
                      <button type="submit" class="btn btn-outline-primary">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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
  name: "detailForm",
  data() {
    return {
      url: location.origin + `/forms/${this.$route.query.slug}`,
      slug: this.$route.query.slug,
      form: null,
      questions: null,
      selectedChoice: null,
      data: {
        name: "",
        choices: "",
        choice_type: "Choice Type",
        is_required: 0,
      },
    };
  },
  methods: {
    remove(id) {
      axios
        .delete(API_URL + `/forms/${this.slug}/questions/${id}`)
        .then((res) => {
          axios
            .get(API_URL + "/forms/" + this.slug)
            .then((res) => {
              console.log(res.data.form);
              this.form = res.data.form;
              this.questions = res.data.form.questions;
            })
            .catch((err) => {});
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggle(e) {
      this.data.is_required = e.target.checked;
    },
    submitForm(e) {
      if (this.data.choice_type == "Choice Type") {
        alert("Please Choose the type");
        return;
      }
      axios
        .post(API_URL + `/forms/${this.slug}/questions`, this.data)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          axios
            .get(API_URL + "/forms/" + this.slug)
            .then((res) => {
              this.form = res.data.form;
              this.questions = res.data.form.questions;
            })
            .catch((err) => {});
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    const slug = this.$route.query.slug;
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.token;

    axios
      .get(API_URL + "/forms/" + slug)
      .then((res) => {
        console.log(res.data.form);
        this.form = res.data.form;
        this.questions = res.data.form.questions;
      })
      .catch((err) => {});
  },
};
</script>
