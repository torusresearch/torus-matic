<template
  ><v-container grid-list-xl>
    <v-btn color="primary" @click="loadMovies" icon>
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-layout wrap>
      <v-flex xs12 lg4 mb-2 v-for="(movie, index) in movies" :key="index">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="movie.coverUrl"
          >
            <v-card-title>{{ movie.title }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0 text-primary font-weight-bold">
            {{ movie.price }} ETH</v-card-subtitle
          >

          <v-card-text class="text--primary">
            <div>{{ movie.synopsis.toString().substring(0, 220) }}</div>
          </v-card-text>

          <v-card-actions>
            <v-card-text text>
              <v-icon small>mdi-clock</v-icon> {{ movie.duration }} hours
            </v-card-text>

            <v-btn color="primary" @click="showTicket(movie)" text>
              Book a ticket
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <add-movie
      :openNewMoviesModal="showNewMovieModal"
      @toggleMoviesModal="toggleMoviesModal"
    />
    <ticket-modal
      :openModal="showTicketModal"
      @toggleTicketModal="showTicket"
      @closeTicket="closeTicket"
      :movie="selectedMovie"
    />
    <v-fab-transition v-if="isAdmin">
      <v-btn
        @click="toggleMoviesModal"
        fab
        large
        dark
        bottom
        right
        fixed
        color="red"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import AddMovie from "./AddMovie";
import TicketModal from "./TicketModal";
import { loadMovies, getCinemaAddress } from "../helpers/web3";
export default {
  components: {
    AddMovie,
    TicketModal
  },
  data() {
    return {
      movies: [],
      showTicketModal: false,
      showNewMovieModal: false,
      selectedMovie: null,
      isAdmin: false
    };
  },
  created() {
    this.loadMovies();
    this.getAdminAddress();
  },
  methods: {
    async loadMovies() {
      this.movies = await loadMovies();
    },
    showTicket(movie) {
      this.selectedMovie = movie;
      this.showTicketModal = true;
    },
    closeTicket() {
      this.showTicketModal = false;
    },
    toggleMoviesModal() {
      this.showNewMovieModal = !this.showNewMovieModal;
    },
    async getAdminAddress() {
      let admin = await getCinemaAddress();
      this.isAdmin = admin === window.account ? true : false;
    },
    formatCurrency(value) {
      return window.web3.utils.fromWei(value) * 10 ** 18;
    }
  }
};
</script>

<style scoped></style>
