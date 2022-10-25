<template>
  <body v-if="form && owner">
    <main>
      <div class="hero py-5 bg-light">
        <div class="container text-center">
          <h2 class="mb-3">{{ form.name }}</h2>
          <div class="text-muted">
            {{ form.description }}
          </div>
        </div>
      </div>

      <div class="py-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <div class="text-muted">
                <span class="text-primary">{{ owner.email }}</span>
                <small><i>(shared)</i></small>
              </div>

              <form>
                <div
                  class="form-item card card-default my-4"
                  v-for="question in questions"
                  :key="question.id"
                >
                  <div class="card-body">
                    <div class="form-group">
                      <label for="name" class="mb-1 text-muted"
                        >{{ question.name }}
                        <span class="text-danger" v-if="question.is_required">*</span></label
                      >
                      <input
                        v-if="question.choice_type == 'short answer'"
                        id="name"
                        type="text"
                        placeholder="Your answer"
                        :required="question.is_required"
                        class="form-control"
                        name="name"
                      />

                      <textarea
                        v-if="question.choice_type == 'paragraph'"
                        id="address"
                        rows="4"
                        :required="question.is_required"
                        placeholder="Your answer"
                        class="form-control"
                        name="address"
                      ></textarea>

                      <div class="form-check" v-if="question.choice_type == 'multiple choice'" v-for="choice in question.choices.split(',')" :key="choice.id">
                        <input
                          class="form-check-input"
                          type="radio"
                          value="Male"
                          id="sex-male"
                          name="sex"
                        />
                        <label class="form-check-label" for="sex-male">
                        {{choice}}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <button class="btn btn-primary">Submit</button>
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
  name: "SubmitForm",
  data() {
    return {
      slug: this.$route.params.slug,
      owner: null,
      form: null,
    };
  },
  mounted() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.token;
    axios.get(API_URL + "/forms/" + this.slug).then((res) => {
      this.form = res.data.form;
      this.questions = res.data.form.questions;
      axios
        .get(API_URL + "/auth/user?id=" + res.data.form.creator_id)
        .then((res) => {
          this.owner = res.data;
        });
    });
  },
};
</script>
