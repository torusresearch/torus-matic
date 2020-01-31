<template>
  <v-dialog v-model="openNewMoviesModal" width="500">
    <v-card>
      <v-card-title class="headline">Add new movie</v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="title"
                label="Movie title*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="price"
                label="Price"
                hint="price in USD"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="closeModal">
          Cancel
        </v-btn>

        <v-btn color="green darken-1" text @click="addMovie">
          Add movie
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      price: ""
    };
  },
  props: ["openNewMoviesModal"],
  methods: {
    closeModal() {
      this.$emit("toggleMoviesModal");
    },
    async addMovie() {
      console.log(window.accounts);
      let result = await window.cinema.methods
        .addMovie(window.web3.utils.toWei(this.price), this.title)
        .send({
          from: window.accounts,
          gas: "21000"
        });
      console.log(result);
    }
  }
};
</script>

<style lang="scss" scoped></style>
