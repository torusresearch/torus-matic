<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span class="subtitle-1">
          Torus x Matic Cinemas
        </span>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        router-link
        :to="{
          name: 'movies',
          query: {}
        }"
        v-if="isLoggedIn"
        >Movies</v-btn
      >
      <v-btn v-if="!isLoggedIn" @click="login" text>
        Login
      </v-btn>
      <v-btn v-else @click="logout" text>
        Logout
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import Torus from "@toruslabs/torus-embed";
import Matic from "maticjs";
import Web3 from "web3";
import maticJSONData from "./testnet";
// import { getCinemaAddress } from "./helpers/web3";
export default {
  name: "App",
  data: () => ({
    isLoggedIn: false
    // isAdmin: false
  }),
  methods: {
    login: async function() {
      try {
        // const torus = new Torus({
        //   buttonPosition: "bottom-left"
        // });
        // await torus.init({
        //   buildEnv: "production",
        //   enableLogging: true,
        //   network: {
        //     host: "https://testnet2.matic.network/",
        //     networkName: "Matic Testnet v2"
        //   },
        //   showTorusButton: true
        // });
        // await torus.login();
        // const web3 = new Web3(torus.provider);
        let web3;
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          try {
            // Request account access if needed
            await window.ethereum.enable();
          } catch (error) {
            // User denied account access...
          }
        }
        const testnetData = maticJSONData["TestnetV2"];
        const maticObj = new Matic({
          maticProvider: web3.eth.currentProvider,
          parentProvider: web3.eth.currentProvider,
          rootChainAddress: testnetData.Main.Contracts.RootChain
        });
        let accounts = await web3.eth.getAccounts();
        window.maticObj = maticObj;
        // window.torus = torus;
        window.web3 = web3;
        if (accounts[0]) {
          this.isLoggedIn = true;
        }
        window.account = accounts[0];
      } catch (error) {
        console.log("Error ", error);
      }
    },
    logout: async function() {
      await window.torus.cleanUp();
      this.$router.replace("/");
      this.isLoggedIn = false;
    }
  }
};
</script>
