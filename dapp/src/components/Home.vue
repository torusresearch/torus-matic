<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to TorusxMatic Cinemas
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  data: () => ({})
};
</script>
