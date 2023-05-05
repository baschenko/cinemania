const API_KEY = '992758a4802a699e8df27d4d6efc34fb';
const BASE_API_URL = 'https://api.themoviedb.org/3';

const watchTrailerBtn = document.querySelector('.watch-trailer');
const modal = document.querySelector('.watch-modal');
const modalError = document.querySelector('.modal-error');
const modalContent = document.querySelector('.watch-modal-content');
const closeModalBtn = document.querySelector('.close');
const trailerVideo = document.querySelector('#trailer-video');

watchTrailerBtn.addEventListener('click', async () => {
  try {
    const movieId = watchTrailerBtn.dataset.movieId;

    // Получение списка видео для фильма из API
    const response = await fetch(
      `${BASE_API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    // Проверка на наличие видео
    if (!data || data.results.length === 0 || !data.results[0].key) {
      modalError.style.display = 'block';
      return;
    }

    // Получение первого видео из списка
    const video = data.results[0];

    // Установка источника видео для трейлера на URL видео на YouTube
    trailerVideo.src = `https://www.youtube.com/embed/${video.key}`;

    modal.style.display = 'block';

    // Ожидание, пока модальное окно полностью раскроется
    await new Promise(resolve => {
      modalContent.addEventListener('transitionend', resolve, { once: true });
    });
  } catch (error) {
    console.error(error);
    modalError.style.display = 'block';
  }
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', event => {
  // Если клик был на фоне, а не на содержимом модального окна, закрыть модальное окно
  if (event.target === modal) {
    closeModalBtn.click();
  }
});

modalError.addEventListener('click', () => {
  modalError.style.display = 'none';
});