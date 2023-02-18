const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "please enter the title of the book"]
    },
    author: {
      type: String,
      required: [true, "please enter the book's author"]
    },
    language: {
      type: String,
      enum: ['Spanish ', 'English', 'German', 'French', 'Other'],
      required: [true, "please enter the book's language"]
    },
    specialEdition: {
      type: Boolean,
      required: [true, "please enter if the book is special edition"],
    },
    genre: {
      type: String,
      enum: ['Poetry', 'Fiction', 'Drama', 'Nonfiction', 'Prose', 'Other'],
      required: [true, "please enter the book's genre"]
    },
    image: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXm5uazs7OwsLDa2trJycnX19fp6enh4eHPz8/l5eXd3d2urq7R0dG9vb24uLi1tbXBwcHTzhj9AAACdklEQVR4nO3d626jMBBAYcfAQBJu7/+0uxjShEy7q+BpI0/P96NSIoHkIxrCzQkBAAAAAAAAAAAAAAAAAAAA+C855nn5N47AloSq6fu+O2BZ/LysYn3ZX3xUkWaIhy09UpPt9XV2EEUuYzwd99Hk9kaqVDbprhlFPmtSvXtIuaTO2UhcNpE+M4nDJm1uEn9NZMhN4q/JJXszcdck+wPWY5NpP744DS9H8tbkvC8QO5F2UqP+XU2ePk4GWb7nv7il+G4S6+VI5dW9M01oQhOaLGii0USjiUYTjSYaTTSaaDTRaKLRRKOJRhONJhpNNKsmbaDJUxOZAk32TaS/dkKTfZPxNLGd7JosVz9iLzR5bDL+/TvR5EGolgViQ5O77XaNkSZ3VdxK3C4002S63dUz0ORrNKEJTWhCk4QmGk00mmg00Wii0USjiUYTjSYaTTSaaDTRaKLRRKOJRhONJhpNNJpoNNFootFEe3q+OM36U9FkPxqR/JkufDU5xbl+9dF8901M0IQmNKEJTRKaaDTRvqfJ5d3DyvI9TcqeA3PX5Ph0qTvXuuy5Uu9N4mmuTXRV2Uk+msSxOTjz8j/mYi7U1iR6mBrYytaEJA/WJoXvKIylJtFwRyFt8fOWr00auxU2TvbFsTVbX3o0sPB/ResmIa2v7OOds/UYHDRJzzVafsZ6aDIvUSa7FTpoEhrjnbGHJiFdzomdVRQPTbafQYhza3Pw5qHJ+o0iVekaAy6ahLPpKaWTiyahtTjf+MhBk3DO+kmiT5qUfY56Jf0YLbOUfQy4EanqIf8mi9XgYTNJ7E6kuthKAAAAAAAAAAAAAAAAAAAAgB/zB8nrM+X3qvXOAAAAAElFTkSuQmCC"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;