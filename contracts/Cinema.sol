pragma solidity ^0.5.7;

contract Cinema {
    struct Movie {
        string name;
        string meta;
        bool isEnded;
        uint256 price;
        string coverUrl;
        string duration;
    }

    struct Booking {
        uint256 movieId;
        address customer;
    }

    address public cinemaHouse;

    uint256 public movieIndex = 0;
    uint256 public bookingIndex = 0;

    mapping(uint256 => Movie) public movies;
    mapping(uint256 => Booking) public bookings;

    constructor(address _cinemaHouse) public {
        cinemaHouse = _cinemaHouse;
    }

    function addMovie(
        string memory _name,
        string memory _meta,
        uint256 _price,
        string memory _coverUrl,
        string memory _duration
    ) public {
        require(msg.sender == cinemaHouse, "Only administrator can add movies");
        Movie memory movie = Movie(
            _name,
            _meta,
            false,
            _price,
            _coverUrl,
            _duration
        );
        movies[movieIndex] = movie;
        movieIndex++;
    }

    function bookTicket(uint256 _movieId) public payable {
        Movie storage movie = movies[_movieId];
        require(movie.isEnded == false, "Movie is no longer showing");
        // todo check if movie seats are still remaining
        require(msg.value == movie.price, "Movie price must be same");

        _transferFundToVault(cinemaHouse, msg.value);
        _transferTicket(_movieId);
    }

    function setMovieNotShowing(uint256 _movieId) public {
        require(
            msg.sender == cinemaHouse,
            "Only administrator can change this"
        );
        Movie storage movie = movies[_movieId];
        movie.isEnded = true;
    }

    function _transferTicket(uint256 _movieId) internal {
        bookings[bookingIndex] = Booking(_movieId, msg.sender);
        bookingIndex++;
    }

    function _transferFundToVault(address manager, uint256 value) internal {
        address(uint256(manager)).transfer(value);
    }
}
