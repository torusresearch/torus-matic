import Cinema from "../abi/Cinema";

let cinemaAddress = "0xA595122bBBFc3e15b32901971C81FCfC018cDDc7";

export const bookTicket = async (movie, count) => {
  let contract = await new window.web3.eth.Contract(Cinema.abi, cinemaAddress);
  let amountToBePaid = movie.price * count;
  await contract.methods.bookTicket(movie.movieId).send({
    from: window.account,
    value: window.web3.utils.toWei(amountToBePaid.toString(), "ether")
  });
};

export const loadMovies = async () => {
  let contract = await new window.web3.eth.Contract(Cinema.abi, cinemaAddress);

  let movies = [];
  let movieId = await contract.methods.movieIndex().call();

  for (let i = 0; i < movieId; i++) {
    let movie = await contract.methods.movies(i).call();
    movies.push({
      movieId: i,
      title: movie.name,
      synopsis: movie.meta,
      isEnded: movie.isEnded,
      price: window.web3.utils.fromWei(movie.price.toString(), "ether"),
      coverUrl: movie.coverUrl,
      duration: movie.duration
    });
  }
  return movies;
};

export const addMovies = async (
  movieTitle,
  movieSynopsis,
  moviePrice,
  movieCoverUrl,
  movieDuration
) => {
  let contract = await new window.web3.eth.Contract(Cinema.abi, cinemaAddress);
  return await contract.methods
    .addMovie(
      movieTitle,
      movieSynopsis,
      window.web3.utils.toWei(moviePrice.toString(), "ether"),
      movieCoverUrl,
      movieDuration
    )
    .send({
      from: window.account
    })
    .on("transactionHash", hash => hash);
};

export const getCinemaAddress = async () => {
  let contract = await new window.web3.eth.Contract(Cinema.abi, cinemaAddress);
  return contract.methods.cinemaHouse().call();
};
