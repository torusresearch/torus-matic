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

    uint256 public movieIndex;
    uint256 public bookingIndex;

    mapping(uint256 => Movie) public movies;
    mapping(uint256 => Booking) public bookings;

    constructor(address _cinemaHouse) public {
        cinemaHouse = _cinemaHouse;
    }

    function addMovie(
        string memory name,
        string memory meta,
        uint256 price,
        string memory coverUrl,
        string memory duration
    ) public {
        if (msg.sender == cinemaHouse) {
            Movie memory movie = Movie(
                name,
                meta,
                false,
                price,
                coverUrl,
                duration
            );
            movies[movieIndex] = movie;
            movieIndex++;
        }
    }

    function bookTicket(uint256 _movieId) public payable {
        Movie storage movie = movies[_movieId];
        if (movie.isEnded == true) return;
        // todo check if movie seats are still remaining
        if (msg.value == movie.price) {
            _transferFundToVault(cinemaHouse, msg.value);
            _transferTicket(_movieId);
        }
    }

    function setMovieNotShowing(uint256 _movieId) public {
        if (msg.sender == cinemaHouse) {
            Movie storage movie = movies[_movieId];
            movie.isEnded = true;
        }
    }

    function _transferTicket(uint256 _movieId) internal {
        bookings[bookingIndex] = Booking(_movieId, msg.sender);
        bookingIndex++;
    }

    function _transferFundToVault(address manager, uint256 value) internal {
        address(uint256(manager)).transfer(value);
    }
}
