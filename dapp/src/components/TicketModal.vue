<template>
  <v-dialog v-model="openModal" width="500">
    <v-card>
      <v-card-title v-if="movie" class="headline">{{
        movie.title
      }}</v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="count"
                label="Number of tickets"
                type="number"
                required
                hint="Specify number of tickets you want to purchase"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary darken-1" text @click="closeModal">
          Cancel
        </v-btn>

        <v-btn color="primary darken-1" text @click="bookTicket">
          Book Ticket
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { bookTicket } from "../helpers/web3";
export default {
  data() {
    return {
      count: 0
    };
  },
  props: ["openModal", "movie"],
  methods: {
    closeModal() {
      this.$emit("closeTicket");
    },
    async bookTicket() {
      await bookTicket(this.movie, this.count);
      this.closeModal();
    }
  }
};
</script>

<style lang="scss" scoped></style>
