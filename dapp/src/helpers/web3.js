import Web3 from "web3";
import Cinema from "../abi/Cinema";

let cinemaAddress = "0x9a8a9958ac1b70c49cce9693ccb0230f13f63505";

export default class Blockchain {
  async loadContract(address, contract) {
    try {
      let web3 = new Web3(window.torus.provider);
      return await new web3.eth.Contract(contract.abi, address, {
        gas: 1000000
      });
    } catch (error) {
      return error;
    }
  }
}

export class CinemaContract extends Blockchain {
  constructor() {
    super();
    this.contract = this.loadContract(cinemaAddress, Cinema);
  }

  async addMovies(moviePrice, movieTitle) {
    let contract = await this.contract;
    try {
      return await contract.methods
        .addMovie(moviePrice, movieTitle)
        .send({
          from: window.account
        })
        .on("transactionHash", hash => console.log(hash))
        .on("confirmation", (confirmation, receipt) =>
          console.log(confirmation, receipt)
        )
        .on("receipt", receipt => console.log(receipt));
    } catch (error) {
      return error;
    }
  }
}
