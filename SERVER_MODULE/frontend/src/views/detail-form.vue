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

          <div class="row justify-content-center" v-for="question in questions">
            <div class="col-lg-5 col-md-6">
              <div class="question-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group my-3">
                    <input
                      type="text"
                      placeholder="Question"
                      class="form-control"
                      name="name"
                      value="Name"
                      disabled
                    />
                  </div>

                  <div class="form-group my-3">
                    <select name="choice_type" class="form-select" disabled>
                      <option>Choice Type</option>
                      <option selected value="short answer">
                        Short Answer
                      </option>
                      <option value="paragraph">Paragraph</option>
                      <option value="multiple choice">Multiple Choice</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="checkboxes">Checkboxes</option>
                    </select>
                  </div>
                  <div class="form-check form-switch" aria-colspan="my-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="required"
                      disabled
                      checked
                    />
                    <label class="form-check-label" for="required"
                      >Required</label
                    >
                  </div>
                  <div class="mt-3">
                    <button type="submit" class="btn btn-outline-danger">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div class="question-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group my-3">
                    <input
                      type="text"
                      placeholder="Question"
                      class="form-control"
                      name="name"
                      value="Address"
                      disabled
                    />
                  </div>

                  <div class="form-group my-3">
                    <select name="choice_type" class="form-select" disabled>
                      <option>Choice Type</option>
                      <option value="short answer">Short Answer</option>
                      <option selected value="paragraph">Paragraph</option>
                      <option value="multiple choice">Multiple Choice</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="checkboxes">Checkboxes</option>
                    </select>
                  </div>
                  <div class="form-check form-switch" aria-colspan="my-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="required"
                    />
                    <label class="form-check-label" for="required"
                      >Required</label
                    >
                  </div>
                  <div class="mt-3">
                    <button type="submit" class="btn btn-outline-danger">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div class="question-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group my-3">
                    <input
                      type="text"
                      placeholder="Question"
                      class="form-control"
                      name="name"
                      value="Sex"
                      disabled
                    />
                  </div>

                  <div class="form-group my-3">
                    <select name="choice_type" class="form-select" disabled>
                      <option>Choice Type</option>
                      <option value="short answer">Short Answer</option>
                      <option value="paragraph">Paragraph</option>
                      <option selected value="multiple choice">
                        Multiple Choice
                      </option>
                      <option value="dropdown">Dropdown</option>
                      <option value="checkboxes">Checkboxes</option>
                    </select>
                  </div>
                  <div class="form-group my-3">
                    <textarea
                      placeholder="Choices"
                      class="form-control"
                      name="choices"
                      rows="4"
                      disabled
                    >
Male,Female,Others</textarea
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
                    <button type="submit" class="btn btn-outline-danger">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="question-item card card-default my-4"
                v-for="(question, i) in questions"
                :key="i"
              >
                <div class="card-body">
                  <div class="form-group my-3">
                    <input
                      type="text"
                      placeholder="Question"
                      class="form-control"
                      name="name"
                      value="Born Date"
                      disabled
                    />
                  </div>

                  <div class="form-group my-3">
                    <select name="chocie_type" class="form-select" disabled>
                      <option>Choice Type</option>
                      <option value="short answer">Short Answer</option>
                      <option value="paragraph">Paragraph</option>
                      <option selected value="date">Date</option>
                      <option value="multiple choice">Multiple Choice</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="checkboxes">Checkboxes</option>
                    </select>
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
                      type="submit"
                      class="btn btn-outline-danger"
                      @click="remove(question.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div class="question-item card card-default my-4">
                <div class="card-body">
                  <div class="form-group my-3">
                    <input
                      type="text"
                      placeholder="Question"
                      class="form-control"
                      name="name"
                      value="Hobbies"
                      disabled
                    />
                  </div>

                  <div class="form-group my-3">
                    <select name="choice_type" class="form-select" disabled>
                      <option>Choice Type</option>
                      <option value="short answer">Short Answer</option>
                      <option value="paragraph">Paragraph</option>
                      <option value="multiple choice">Multiple Choice</option>
                      <option value="dropdown">Dropdown</option>
                      <option selected value="checkboxes">Checkboxes</option>
                    </select>
                  </div>
                  <div class="form-group my-3">
                    <textarea
                      placeholder="Choices"
                      class="form-control"
                      name="choices"
                      rows="4"
                      disabled
                    >
Football,Guitar,Coding,Watching,Traveling</textarea
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
                      disabled
                    />
                    <label class="form-check-label" for="required"
                      >Required</label
                    >
                  </div>
                  <div class="mt-3">
                    <button type="submit" class="btn btn-outline-danger">
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
                        value=""
                      />
                    </div>

                    <div class="form-group my-3">
                      <select name="choice_type" class="form-select">
                        <option selected>Choice Type</option>
                        <option value="short answer">Short Answer</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="date">Date</option>
                        <option value="multiple choice">Multiple Choice</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="checkboxes">Checkboxes</option>
                      </select>
                    </div>
                    <div class="form-check form-switch" aria-colspan="my-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="required"
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
    };
  },
  methods: {
    remove(e) {
      axios
        .delete(API_URL + `/${this.slug}/questions/${e}`)
        .then((res) => {
          axios
            .get(API_URL + "/forms/" + slug)
            .then((res) => {
              console.log(res.data.form);
              this.form = res.data.form;
              this.questions = res.data.form.questions;
            })
            .catch((err) => {});
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    submitForm(e) {
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());

      axios
        .post(API_URL + `/${this.slug}/questions`, data)
        .then((res) => {
          alert(res.data.message);
          axios
            .get(API_URL + "/forms/" + slug)
            .then((res) => {
              console.log(res.data.form);
              this.form = res.data.form;
              this.questions = res.data.form.questions;
            })
            .catch((err) => {});
        })
        .catch((err) => {});
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
