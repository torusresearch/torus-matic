<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span class="subtitle-1">
          Torus x Matic Cinemas
        </span>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="isLoggedIn" @click="toggleMoviesModal" text>
        Add Movies
      </v-btn>
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
    <add-movie
      :openNewMoviesModal="showNewMovieModal"
      @toggleMoviesModal="toggleMoviesModal"
    />
  </v-app>
</template>

<script>
import Torus from "@toruslabs/torus-embed";
import Matic from "maticjs";
import Web3 from "web3";
import Cinema from "./abi/Cinema";
import maticJSONData from "./testnet";
import AddMovie from "./components/AddMovie";
export default {
  name: "App",
  components: {
    AddMovie
  },
  data: () => ({
    isLoggedIn: false,
    showNewMovieModal: false
  }),
  created() {},
  methods: {
    toggleMoviesModal() {
      this.showNewMovieModal = !this.showNewMovieModal;
    },
    login: async function() {
      try {
        const torus = new Torus({
          buttonPosition: "bottom-left"
        });
        await torus.init({
          buildEnv: "production",
          enableLogging: true,
          network: {
            host: "matic",
            // chainId: 8995,
            networkName: "Matic Alpha-Mainnet"
          },
          showTorusButton: false
        });
        await torus.login();
        const web3 = new Web3(torus.provider);
        window.web3 = web3;
        window.torus = torus;
        const accounts = await web3.eth.getAccounts();
        const testnetData = maticJSONData["TestnetV2"];
        const maticObj = new Matic({
          maticProvider: torus.provider,
          parentProvider: torus.provider,
          rootChainAddress: testnetData.Main.Contracts.RootChain,
          withdrawManagerAddress: testnetData.Main.Contracts.WithdrawManager,
          depositManagerAddress: testnetData.Main.Contracts.DepositManager,
          syncerUrl: testnetData.Matic.SyncerAPI,
          watcherUrl: testnetData.Main.WatcherAPI,
          maticWethAddress: testnetData.Matic.Contracts.ChildWETH
        });
        window.maticObj = maticObj;
        let result = await new web3.eth.Contract(
          Cinema.abi,
          "0xdb0b020ab16129983045c80692fa1d1916133471"
        );
        window.cinema = result;
        window.accounts = accounts[0];
        if (accounts[0]) {
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.log("Error ", error);
      }
    },
    logout: async function() {
      await window.torus.cleanUp();
      this.isLoggedIn = false;
    }
  }
};
</script>
