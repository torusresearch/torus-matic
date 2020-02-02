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
                hint="price in ETH"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="cover"
                label="Cover URL"
                hint="Link to movie banner"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="duration"
                label="Duration"
                hint="in hours"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea v-model="synopsis" label="Synopsis"></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary darken-1" text @click="closeModal">
          Cancel
        </v-btn>

        <v-btn color="primary darken-1" text @click="addMovie">
          Add movie
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { addMovies, loadMovies } from "../helpers/web3";
export default {
  data() {
    return {
      title: "",
      price: "",
      cover: "",
      duration: "",
      synopsis: ""
    };
  },
  props: ["openNewMoviesModal"],
  methods: {
    closeModal() {
      this.$emit("toggleMoviesModal");
      (this.title = ""),
        (this.price = ""),
        (this.cover = ""),
        (this.duration = ""),
        (this.synopsis = "");
    },
    async addMovie() {
      await addMovies(
        this.title,
        this.synopsis,
        this.price,
        this.cover,
        this.duration
      );
      await loadMovies();
      this.closeModal();
    }
  }
};
</script>

<style lang="scss" scoped></style>
