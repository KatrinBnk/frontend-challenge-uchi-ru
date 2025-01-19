import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Загружаем избранных котиков из LocalStorage
const loadFavoritesFromStorage = () => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

// Сохраняем избранных котиков в LocalStorage
const saveFavoritesToStorage = (favorites: string[], isRemoved?: boolean) => {
    if (isRemoved) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
        const existingFavorites = loadFavoritesFromStorage();
        const mergedFavorites = Array.from(new Set([...existingFavorites, ...favorites]));
        localStorage.setItem('favorites', JSON.stringify(mergedFavorites));
    }
};

export const fetchCats = createAsyncThunk('cats/fetchCats', async (limit: number = 20) => {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}`);
    return response.data;
});

// Асинхронный thunk для загрузки котиков из LocalStorage по их ID
export const fetchFavoriteCatsFromStorage = createAsyncThunk(
    'cats/fetchFavoriteCatsFromStorage',
    async (favoriteIds: string[]) => {
        const requests = favoriteIds.map((id) =>
            axios.get(`https://api.thecatapi.com/v1/images/${id}`)
    );
        const responses = await Promise.all(requests);
        return responses.map((res) => res.data);
    }
);

export const initializeCats = createAsyncThunk('cats/initializeCats', async () => {
    const favoriteIds = loadFavoritesFromStorage();

    // Загружаем только избранных котиков по их ID
    const favoriteCatsResponses = await Promise.all(
        favoriteIds.map((id:string) => axios.get(`https://api.thecatapi.com/v1/images/${id}`))
    );

    const favoriteCats = favoriteCatsResponses.map((res) => ({
        id: res.data.id,
        url: res.data.url,
        isFavorite: true,
    }));

    return { favoriteCats };
});

const catsSlice = createSlice({
    name: 'cats',
    initialState: {
        cats: [] as { id: string; url: string; isFavorite: boolean }[], // Котики, которые видны на экране
        allCats: [] as { id: string; url: string; isFavorite: boolean }[], // Все котики, включая избранных
        loading: false, // Флаг загрузки
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const id = action.payload;

            // Найти котика в allCats и переключить флаг isFavorite
            const allCat = state.allCats.find((cat) => cat.id === id);
            let isRemoved = false; // Флаг для удаления из избранного

            if (allCat) {
                allCat.isFavorite = !allCat.isFavorite; // Переключаем флаг
                if (!allCat.isFavorite) {
                    isRemoved = true; // Устанавливаем флаг, если котик удалён из избранного
                }
            }

            // Найти котика в cats и переключить флаг isFavorite
            const visibleCat = state.cats.find((cat) => cat.id === id);
            if (visibleCat) {
                visibleCat.isFavorite = allCat?.isFavorite || false;
            }

            // Сохраняем изменения в LocalStorage
            const favoriteIds = state.allCats
                .filter((cat) => cat.isFavorite) // Сохраняем только избранных
                .map((cat) => cat.id);

            saveFavoritesToStorage(favoriteIds, isRemoved); // Передаём isRemoved
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCats.fulfilled, (state, action) => {
                // Добавляем только уникальных котиков
                const existingIds = state.allCats.map((cat) => cat.id);
                const favoriteIds = loadFavoritesFromStorage();
                const newCats = action.payload
                    .filter((cat: { id: string }) => !existingIds.includes(cat.id)) // Убираем дубли
                    .map((cat: { id: string; url: string }) => ({
                        ...cat,
                        isFavorite: favoriteIds.includes(cat.id),
                    }));
                state.cats = [...state.cats, ...newCats];
                state.allCats = [...state.allCats, ...newCats];
                state.loading = false;
            })
            .addCase(fetchCats.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchFavoriteCatsFromStorage.fulfilled, (state, action) => {
                // Добавляем избранных котиков из LocalStorage в общий список
                const existingIds = state.allCats.map((cat) => cat.id);
                const newCats = action.payload
                    .filter((cat: { id: string }) => !existingIds.includes(cat.id)) // Убираем дубли
                    .map((cat: { id: string; url: string }) => ({
                        ...cat,
                        isFavorite: true,
                    }));
                state.allCats = [...state.allCats, ...newCats];
            })
            .addCase(initializeCats.pending, (state) => {
                state.loading = true;
            })
            .addCase(initializeCats.fulfilled, (state, action) => {
                const { favoriteCats } = action.payload;

                // Добавляем только избранных котиков
                const existingIds = state.allCats.map((cat) => cat.id);
                const newCats = favoriteCats.filter(
                    (cat: { id: string }) => !existingIds.includes(cat.id)
                );

                state.allCats = [...state.allCats, ...newCats];
                state.loading = false;
            })
            .addCase(initializeCats.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { toggleFavorite } = catsSlice.actions;
export default catsSlice.reducer;
